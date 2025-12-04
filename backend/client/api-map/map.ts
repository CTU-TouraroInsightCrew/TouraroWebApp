import axios from "axios";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/map", async (req: Request, res: Response) => {
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

    const poiData = data.map((el: any) => ({
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
      category: el.tags?.amenity,
    }));

    res.json(poiData);
  } catch (error) {
    console.error("Lỗi API:", error);
    res.status(500).json({ error: "Lỗi lấy dữ liệu" });
  }
});

export default router;
