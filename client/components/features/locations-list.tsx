/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsigtCrew
 */
import LocationCard from "./locations-card";
import { Locations } from "@/lib/types";

interface Props {
  locations: Locations[];
}

export default function LocationsList({ locations }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {locations.map((loc) => (
        <LocationCard key={loc.id} location={loc} />
      ))}
    </div>
  );
}