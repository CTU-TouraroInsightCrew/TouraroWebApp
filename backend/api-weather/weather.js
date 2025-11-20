import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"], // Cho phép chính xác origin của Next.js
    methods: ["GET"],
    credentials: false,
  })
);

const API_KEY = "9c0240db8934452ee2515e17e673876d";

app.get("/api/weather", async (req, res) => {
  const city = "Can Tho"; 

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=vi`
    );

    const data = await response.json();

    const formatted = {
      city: data.name,
      temp: Math.round(data.main.temp),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Cannot fetch weather" });
  }
});

app.listen(3001, "0.0.0.0", () => {
  console.log("Backend chạy tại http://localhost:3001/api/weather");
});
