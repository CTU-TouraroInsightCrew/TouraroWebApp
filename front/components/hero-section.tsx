"use client";

import React from "react";
import Image from "next/image";
import { FaRegCirclePlay } from "react-icons/fa6";
import { Button } from "./ui/button";
import Wrapper from "./wrapper";
import WeatherDisplay from "./weather-display"; 
import SearchForm from "./search-form";

export default function HeroSection() {
  return (
    // 1. Khung cha: relative, chiếm toàn bộ màn hình, căn giữa nội dung
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center p-4">
      
      {/* 2. Hình ảnh nền Full màn hình */}
      <Image
        src="/backgroud.png" 
        alt="Travel Background"
        fill
        className="object-cover -z-10"
        priority
      />

      {/* 3. Lớp phủ Overlay (Đen mờ 40%) */}
      <div className="absolute inset-0 bg-black opacity-40 -z-5"></div>

      {/* 4. Thẻ WeatherDisplay (định vị tuyệt đối ở góc trên bên phải) */}
      <div className="absolute top-20 right-4 md:right-10 z-20">
        <WeatherDisplay />
      </div>

      {/* 5. Wrapper cho nội dung (để căn lề nội dung theo website) */}
      <Wrapper>
        {/* Nội dung chính: Chữ, tìm kiếm, nút... */}
        <div className="relative z-10 text-white flex flex-col items-start lg:w-3/5 xl:w-1/2 pt-20">
          
          <h3 className="font-bold uppercase text-primary font-poppins text-xl">
            Best Destinations around the world
          </h3>

          <h1 className="font-bold font-volkhov text-4xl md:text-5xl lg:text-7xl leading-[1.1] mt-5">
            Travel, enjoy and live a new and full life
          </h1>

          <p className="leading-[1.6] mt-8 text-lg">
            Built Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed listening. Park gate sell they west hard for the.
          </p>

          {/* ✅ 6. Thanh tìm kiếm */}
          <div className="mt-8 w-full max-w-lg">
            <SearchForm />
          </div>

          {/* 7. Các nút hành động */}
          <div className="flex items-center gap-4 mt-9">
            <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white">
              Explore Festivals
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer border-white text-white hover:bg-white/20"
            >
              <FaRegCirclePlay className="mr-2" /> Watch Trailer
            </Button>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
