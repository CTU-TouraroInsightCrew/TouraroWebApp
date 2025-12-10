/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Wrapper from "../wrapper";
import WeatherDisplay from "../features/weather-display";
import SearchForm from "../features/search-form";

export default function HeroSection() {
  return (
    // Khung cha: full màn hình + overlay
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center p-4"
    >
      {/* Hình nền */}
      <Image
        src="/backgroud.png"
        alt="Travel Background"
        fill
        className="object-cover -z-10"
        priority
      />

      {/* Overlay đen mờ */}
      <div className="absolute inset-0 bg-black opacity-40 -z-5" />

      {/* Weather card góc trên phải */}
      <div className="absolute top-20 right-4 md:right-10 z-20">
        <WeatherDisplay />
      </div>

      {/* Nội dung chính */}
      <Wrapper>
        <div className="relative z-10 text-white flex flex-col items-start lg:w-3/5 xl:w-1/2 pt-20">
          <h3 className="font-bold uppercase text-primary font-poppins text-xl">
            Touraro • Smart City Travel
          </h3>

          <h1 className="font-bold font-volkhov text-4xl md:text-5xl lg:text-7xl leading-[1.1] mt-5">
            Discover Can Tho with real-time smart city data
          </h1>

          <p className="leading-[1.6] mt-8 text-lg">
           Touraro là giải pháp du lịch thông minh thuộc hệ sinh thái Thành phố Thông minh Cần Thơ. 
          Với dữ liệu thời gian thực và trải nghiệm thân thiện, Touraro giúp du khách và người dân 
          dễ dàng tiếp cận thông tin, khám phá địa điểm và lập kế hoạch di chuyển tối ưu.
                  </p>

          {/* Thanh tìm kiếm: nền trắng, bo tròn */}
          <div className="mt-8 w-full max-w-xl bg-white rounded-2xl p-3 md:p-4 shadow-lg text-gray-900">
            <SearchForm />
          </div>

          {/* ❌ Đã bỏ các nút hành động Explore / Watch Trailer */}
        </div>
      </Wrapper>
    </section>
  );
}
