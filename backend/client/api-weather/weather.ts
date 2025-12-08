// backend/client/api-weather/weather.ts
import { Router, Request, Response } from "express";
import axios, { AxiosError } from "axios";

const router = Router();

const API_KEY =
  process.env.WEATHER_API_KEY || "9c0240db8934452ee2515e17e673876d";

// GET /api/weather
router.get("/weather", async (req: Request, res: Response) => {
  const city = (req.query.city as string) || "Can Tho";

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
        timeout: 8000, // tránh treo request
      }
    );

    const d = response.data;

    return res.json({
      city: d.name,
      temp: Math.round(d.main.temp),
      humidity: d.main.humidity,
      description: d.weather[0].description,
      icon: d.weather[0].icon,
    });
  } catch (error) {
    const err = error as AxiosError;

    // Trường hợp lỗi timeout
    if (err.code === "ETIMEDOUT") {
      console.error("⛔ Weather API timeout");
      return res.status(504).json({
        error: "Weather API timeout. Please try again later.",
      });
    }

    // Trường hợp lỗi mạng khác
    console.error("⛔ Weather API error:", err.message);

    return res.status(500).json({
      error: "Weather service error",
      detail: err.message,
    });
  }
});

export default router;
