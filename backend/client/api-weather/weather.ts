// backend/client/api-weather/weather.ts
import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

const API_KEY = process.env.WEATHER_API_KEY || "9c0240db8934452ee2515e17e673876d"; // hoặc để cứng nếu bạn muốn

router.get("/weather", async (req: Request, res: Response) => {
  const city = "Can Tho";

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
          lang: "vi",
        },
      }
    );

    const data = response.data;

    const formatted = {
      city: data.name,
      temp: Math.round(data.main.temp),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };

    return res.json(formatted);
  } catch (err) {
    console.error("Weather error:", err);
    return res.status(500).json({ error: "Cannot fetch weather" });
  }
});

export default router;
