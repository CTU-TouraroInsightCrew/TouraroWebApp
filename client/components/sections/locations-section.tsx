import React from 'react'
import SectionHeader from "./section-header";
import Wrapper from "../wrapper";
import LocationsGrid from "../features/locations-grid";
import Image from "next/image";
//import { FaRegCirclePlay } from "react-icons/fa6";
export default function LocationSection() {
  return (
    <section id="locations" className="relative w-full min-h-screen flex items-center justify-center p-4">
       {/* 2. Hình ảnh nền Full màn hình */}
           
      
            {/* 3. Lớp phủ Overlay (Đen mờ 40%) */}
            <div className="absolute inset-0 bg-black opacity-0 -z-5"></div>
      <Wrapper>
        <SectionHeader
          className="capitalize"
          title="Top Locations For You"
          subtitle="Can Tho"
        />
        <LocationsGrid/>
      </Wrapper>
    </section>
  );
}
