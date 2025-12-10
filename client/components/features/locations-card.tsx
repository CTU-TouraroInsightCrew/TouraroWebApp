/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsigtCrew
 */

"use client";

import { Locations } from "@/lib/types";
import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Props {
  location: Locations;
}

export default function LocationsCard({ location }: Props) {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer shadow-xl hover:shadow-2xl rounded-md overflow-hidden relative h-[457px]"
      onClick={() => router.push(`/locations/${location.id}`)}
    >
      <Image
        className="object-cover z-3"
        fill
        src={location.image}
        alt={location.location}
      />

      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pt-4 pb-10 text-dark bg-white">
        <h5 className="flex justify-between font-poppins text-lg items-center">
          {location.location}
        </h5>

        <p className="mt-5 flex gap-2 items-center capitalize text-lg">
          <FaLocationArrow className="text-black" />
          {location.duration}
        </p>
      </div>
    </div>
  );
}