
import React from 'react'
import HeroSection from "@/components/sections/hero-section";
import LocationsSection from "@/components/sections/locations-section";
import GuideSection from "@/components/sections/guides-section";
import ChatSection from "@/components/sections/chat-section";
import MapSection from "@/components/sections/map-section";


export default function Home() {
  return (
  <main>
    <HeroSection/>
    <LocationsSection/>
    <GuideSection />
    <MapSection/>
    <ChatSection/>
  </main>
  );
}

