
import React from 'react'
import HeroSection from "@/components/hero-section";
import LocationsSection from "@/components/locations-section";
import GuideSection from "@/components/guides-section";
import ChatSection from "@/components/chat-section";
import MapSection from "@/components/map-section";


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

