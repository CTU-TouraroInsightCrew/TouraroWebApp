/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsigtCrew
 */

"use client";

import React, { useEffect, useState } from "react";

interface WeatherData {
  city: string;
  temp: number;
  humidity: number;
  description: string;
  icon: string;
}

export default function WeatherDisplay() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:4000/api/weather");
        setWeather(await res.json());
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  if (!weather) return <div className="text-white">Loading...</div>;

  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 text-white w-48 shadow-lg">
      <div className="flex gap-2 items-center">
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt=""
          className="w-12 h-12"
        />
        <div>
          <h3 className="font-bold text-lg">{weather.city}</h3>
          <p className="text-sm">{weather.description}</p>
        </div>
      </div>

      <p className="text-2xl font-bold">{weather.temp}°C</p>
      <p className="text-sm opacity-80">Độ ẩm: {weather.humidity}%</p>
    </div>
  );
}
