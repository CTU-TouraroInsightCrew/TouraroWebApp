
import axios from 'axios';

export async function GET() {
  try {
    // 1. Cấu hình: Lấy dữ liệu quanh Đại học Cần Thơ (hoặc trung tâm TP)
    const lat = 10.0302; 
    const lon = 105.7721;
    const radius = 2000; // Bán kính 2km

    // 2. Câu lệnh Overpass QL để lấy: Cafe, Nhà hàng, Trường học
    const overpassQuery = `
      [out:json];
      (
        node["amenity"="cafe"](around:${radius},${lat},${lon});
        node["amenity"="restaurant"](around:${radius},${lat},${lon});
        node["amenity"="university"](around:${radius},${lat},${lon});
      );
      out body;
    `;

    // 3. Gọi API OpenStreetMap (Overpass)
    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      overpassQuery,
      { headers: { "Content-Type": "text/plain" } }
    );

    const data = response.data.elements;

    // 4. QUAN TRỌNG: Chuyển đổi sang chuẩn NGSI-LD
    const poiData = data.map((el: any) => ({
      id: `urn:ngsi-ld:POI:${el.id}`,
      type: "POI",
      name: el.tags?.name || "Địa điểm không tên",
      location: {
        type: "GeoProperty",
        value: { 
            type: "Point", 
            coordinates: [el.lon, el.lat] // GeoJSON lưu [Kinh độ, Vĩ độ]
        },
      },
      category: el.tags?.amenity, // Ví dụ: cafe, restaurant
    }));

    // 5. Trả dữ liệu sạch về cho Frontend
    // 5. Trả dữ liệu sạch về cho Frontend
    return new Response(JSON.stringify(poiData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Lỗi API:", error);
    return new Response(JSON.stringify({ error: 'Lỗi lấy dữ liệu' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}