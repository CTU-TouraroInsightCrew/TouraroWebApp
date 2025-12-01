"use client";
import React from 'react'
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavLink } from "@/lib/types";
import Link from "next/link";
const navLinks: NavLink[] = [
    { label: "Home", href: "/home" },
    { label: "Locations", href: "/locations" },
    { label: "Guide", href: "/guide" },
    { label: "Map", href: "/map" },
    { label: "Chat", href: "/chat" },
    
];
export default function Navigation() {
    const pathname = usePathname();
    return (
        <nav className = "hidden md:block" >
            <ul className="flex gap-8 items-center">
                <li><Link href="/home" className="cursor-pointer hover:text-primary">Home</Link></li>
                <li><Link href="/locations" className="cursor-pointer hover:text-primary">Locations</Link></li>
                <li><Link href="/guides" className="cursor-pointer hover:text-primary">Guide</Link></li>
                <li><Link href="/map" className="cursor-pointer hover:text-primary">Map</Link></li>
                <li><Link href="/chat" className="cursor-pointer hover:text-primary">Chat</Link></li>
                
                
                <li><Link className="cursor-pointer hover:text-white hover:bg-blue-950 font-semibold px-4 py-2 rounded-md border hover:border-transparent transition duảtion-150" href="/login">
                    Login
                </Link></li>
                <li><Link className="cursor-pointer hover:text-white hover:bg-yellow font-semibold px-4 py-2 rounded-md border hover:border-transparent tránition duảtion-150" href="/sign-up">
                    Sign Up
                </Link></li>
            </ul>
        </nav>
    );
}
