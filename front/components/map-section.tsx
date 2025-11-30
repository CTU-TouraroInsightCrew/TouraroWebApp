"use client";

import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import L from "leaflet";

type LatLngTuple = [number, number];

interface RouteInfo {
  distance: number; // mét
  duration: number; // giây
}

// Icon vị trí hiện tại
const currentIcon = L.icon({
  iconUrl: "/icons/marker-icon-red.png",
  shadowUrl: "/icons/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Icon điểm đến (tạm dùng cùng icon; nếu bạn có file khác thì đổi iconUrl)
const destinationIcon = L.icon({
  iconUrl: "/icons/marker-icon-red.png",
  shadowUrl: "/icons/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Component tự zoom đến position
function RecenterOnPosition({ position }: { position: LatLngTuple | null }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 16, { animate: true });
    }
  }, [position, map]);

  return null;
}

// Component cho phép click chọn điểm đến
function DestinationPicker({
  onPick,
}: {
  onPick: (pos: LatLngTuple) => void;
}) {
  useMapEvents({
    click(e) {
      onPick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

// Tính khoảng cách 2 điểm (mét)
function distanceMeters(a: LatLngTuple, b: LatLngTuple): number {
  const [lat1, lon1] = a;
  const [lat2, lon2] = b;
  const R = 6371000; // bán kính Trái Đất (m)
  const toRad = (x: number) => (x * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);

  const s =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(phi1) * Math.cos(phi2) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));

  return R * c;
}

export default function MapSection() {
  const [position, setPosition] = useState<LatLngTuple | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [tracking, setTracking] = useState(false);
  const [status, setStatus] = useState<string>("");

  const [destination, setDestination] = useState<LatLngTuple | null>(null);
  const [routePath, setRoutePath] = useState<LatLngTuple[]>([]);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);

  const watchIdRef = useRef<number | null>(null);
  const lastPosRef = useRef<LatLngTuple | null>(null);

  // Bật/tắt theo dõi (watchPosition)
  useEffect(() => {
    if (!tracking) {
      // Tắt theo dõi nếu đang bật
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
        setStatus("Đã tắt theo dõi.");
      }
      return;
    }

    if (!navigator.geolocation) {
      setStatus("Trình duyệt không hỗ trợ định vị.");
      return;
    }

    setStatus("Đang theo dõi vị trí…");

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const newPos: LatLngTuple = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];

        const acc = pos.coords.accuracy; // mét
        setAccuracy(acc);

        // 1. Lọc điểm có sai số quá lớn
        const MAX_ACCEPTABLE_ACCURACY = 50; // m
        if (acc > MAX_ACCEPTABLE_ACCURACY) {
          return;
        }

        // 2. Lọc những nhảy nhỏ < 5m để tránh map giật
        if (lastPosRef.current) {
          const d = distanceMeters(lastPosRef.current, newPos);
          const MIN_MOVE_DISTANCE = 5; // m
          if (d < MIN_MOVE_DISTANCE) {
            return;
          }
        }

        lastPosRef.current = newPos;
        setPosition(newPos);
        setStatus("Đang theo dõi vị trí…");
      },
      (err) => {
        setStatus("Lỗi định vị: " + err.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: 10000,
      }
    );

    watchIdRef.current = id;

    // Cleanup khi unmount hoặc khi tracking đổi
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [tracking]);

  // One-shot: Tìm vị trí hiện tại
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setStatus("Trình duyệt không hỗ trợ định vị.");
      return;
    }

    setStatus("Đang lấy vị trí hiện tại…");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newPos: LatLngTuple = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        setPosition(newPos);
        setAccuracy(pos.coords.accuracy);
        lastPosRef.current = newPos;
        setStatus("Đã định vị vị trí hiện tại.");
      },
      (err) => {
        setStatus("Lỗi định vị: " + err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  // Xoá điểm đến + route
  const handleClearDestination = () => {
    setDestination(null);
    setRoutePath([]);
    setRouteInfo(null);
  };

  // Gọi API /api/route để tính đường đi
  const handleRoute = async () => {
    if (!position) {
      setStatus("Chưa có vị trí hiện tại.");
      return;
    }
    if (!destination) {
      setStatus("Chưa chọn điểm đến (click vào map để chọn).");
      return;
    }

    try {
      setRouteLoading(true);
      setStatus("Đang tính đường đi…");

      const [fromLat, fromLon] = position;
      const [toLat, toLon] = destination;

      const params = new URLSearchParams({
        fromLat: String(fromLat),
        fromLon: String(fromLon),
        toLat: String(toLat),
        toLon: String(toLon),
      });

      const res = await fetch(`/api/route?${params.toString()}`);

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        console.error("Route error:", err || res.statusText);
        setStatus("Không tính được đường đi.");
        setRoutePath([]);
        setRouteInfo(null);
        return;
      }

      const data = await res.json();

      setRoutePath((data.path || []) as LatLngTuple[]);
      if (data.distance && data.duration) {
        setRouteInfo({
          distance: data.distance,
          duration: data.duration,
        });
      } else {
        setRouteInfo(null);
      }

      setStatus("Đã tính xong đường đi.");
    } catch (e) {
      console.error(e);
      setStatus("Lỗi khi gọi API route.");
      setRoutePath([]);
      setRouteInfo(null);
    } finally {
      setRouteLoading(false);
    }
  };

  return (
    <section id="map" className="relative w-full h-[500px]">
      {/* Nút điều khiển overlay trên map */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <button
          onClick={handleLocateMe}
          className="rounded-lg px-3 py-2 text-sm bg-white shadow-md hover:bg-gray-100"
        >
          📍 Tìm vị trí của tôi
        </button>

        <button
          onClick={() => setTracking((prev) => !prev)}
          className={`rounded-lg px-3 py-2 text-sm shadow-md ${
            tracking ? "bg-red-500 text-white" : "bg-white hover:bg-gray-100"
          }`}
        >
          {tracking ? "⏹ Tắt theo dõi" : "▶ Bật theo dõi"}
        </button>

        <button
          onClick={handleRoute}
          disabled={routeLoading}
          className="rounded-lg px-3 py-2 text-sm bg-white shadow-md hover:bg-gray-100 disabled:opacity-50"
        >
          🧭 {routeLoading ? "Đang tính..." : "Tính đường đi"}
        </button>

        <button
          onClick={handleClearDestination}
          className="rounded-lg px-3 py-2 text-sm bg-white shadow-md hover:bg-gray-100"
        >
          ❌ Xoá điểm đến
        </button>

        {status && (
          <div className="mt-1 rounded-md bg-white/90 px-2 py-1 text-xs shadow">
            {status}
            {accuracy !== null && (
              <div>Độ chính xác ~ {Math.round(accuracy)} m</div>
            )}
          </div>
        )}

        {routeInfo && (
          <div className="mt-1 rounded-md bg-white/90 px-2 py-1 text-xs shadow">
            Quãng đường: {(routeInfo.distance / 1000).toFixed(2)} km<br />
            Thời gian ước tính: {Math.round(routeInfo.duration / 60)} phút
          </div>
        )}
      </div>

      <MapContainer
        center={position ?? [10.0452, 105.7469]} // fallback: Cần Thơ
        zoom={position ? 16 : 13}
        className="w-full h-full z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {/* Click map để chọn điểm đến */}
        <DestinationPicker onPick={setDestination} />

        {/* Auto zoom khi position đổi */}
        <RecenterOnPosition position={position} />

        {/* Vẽ đường đi từ OSRM */}
        {routePath.length > 0 && (
          <Polyline
            positions={routePath}
            pathOptions={{ color: "blue", weight: 4 }}
          />
        )}

        {/* Marker vị trí hiện tại */}
        {position && (
          <Marker position={position} icon={currentIcon}>
            <Popup>
              Vị trí hiện tại của bạn
              {accuracy !== null && (
                <div> (±{Math.round(accuracy)} m)</div>
              )}
            </Popup>
          </Marker>
        )}

        {/* Marker điểm đến */}
        {destination && (
          <Marker position={destination} icon={destinationIcon}>
            <Popup>Điểm đến bạn đã chọn (click map để đổi)</Popup>
          </Marker>
        )}
      </MapContainer>
    </section>
  );
}
