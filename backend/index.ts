import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

interface PoiEntity {
  id: string;
  type: string;
  name: string;
  location: {
    type: "GeoProperty";
    value: {
      type: "Point";
      coordinates: [number, number]; // [lng, lat]
    };
  };
  category: string;
}

// GET /api/poi
app.get("/api/poi", async (req: Request, res: Response) => {
  try {
    const lat = parseFloat((req.query.lat as string) || "10.0302");
    const lon = parseFloat((req.query.lon as string) || "105.7721");
    const radius = 2000;

    const overpassQuery = `
      [out:json];
      (
        node["amenity"="cafe"](around:${radius},${lat},${lon});
        node["amenity"="restaurant"](around:${radius},${lat},${lon});
        node["amenity"="university"](around:${radius},${lat},${lon});
      );
      out body;
    `;

    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      overpassQuery,
      { headers: { "Content-Type": "text/plain" } }
    );

    const data = response.data.elements;

    const poiData: PoiEntity[] = data.map((el: any) => ({
      id: `urn:ngsi-ld:POI:${el.id}`,
      type: "POI",
      name: el.tags?.name || "Địa điểm không tên",
      location: {
        type: "GeoProperty",
        value: {
          type: "Point",
          coordinates: [el.lon, el.lat],
        },
      },
      category: el.tags?.amenity || "unknown",
    }));

    res.json(poiData);
  } catch (err) {
    console.error("❌ Lỗi API /api/poi:", err);
    res.status(500).json({ error: "Lỗi lấy dữ liệu" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend chạy tại http://localhost:${PORT}`);
});
