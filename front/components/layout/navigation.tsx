"use client";

import React from "react";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="hidden md:block">
      <ul className="flex gap-8 items-center">
        <li>
          <Link href="/#hero" className="cursor-pointer hover:text-primary">
            Home
          </Link>
        </li>
        <li>
          <Link href="/#locations" className="cursor-pointer hover:text-primary">
            Locations
          </Link>
        </li>
        <li>
          <Link href="/#guides-section" className="cursor-pointer hover:text-primary">
            Guide
          </Link>
        </li>
        <li>
          <Link href="/#map" className="cursor-pointer hover:text-primary">
            Map
          </Link>
        </li>
        <li>
          <Link href="/#chat-container" className="cursor-pointer hover:text-primary">
            Chat
          </Link>
        </li>

        <li>
          <Link
            className="cursor-pointer hover:text-white hover:bg-blue-950 font-semibold px-4 py-2 rounded-md border hover:border-transparent transition duration-150"
            href="/login"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            className="cursor-pointer hover:text-white hover:bg-yellow font-semibold px-4 py-2 rounded-md border hover:border-transparent transition duration-150"
            href="/sign-up"
          >
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
}
