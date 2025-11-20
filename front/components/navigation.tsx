import React from 'react'
import { NavLink } from "@/lib/types";
import Link from "next/link";
const navLinks: NavLink[] = [
    { label: "Home", href: "/home" },
    { label: "Locations", href: "/locations" },
    { label: "Guide", href: "/guide" },
    { label: "Map", href: "/map" },
    { label: "Chat", href: "/chat" },
    { label: "Dashboard", href: "/dashboard" },
    
];
export default function Navigation() {
    return (
        <nav className = "hidden md:block" >
            <ul className="flex gap-8 items-center">
                <li><a href="#home" className="cursor-pointer hover:text-primary">Home</a></li>
                <li><a href="#locations" className="cursor-pointer hover:text-primary">Locations</a></li>
                <li><a href="#guides" className="cursor-pointer hover:text-primary">Guide</a></li>
                <li><a href="#map" className="cursor-pointer hover:text-primary">Map</a></li>
                <li><a href="#chat" className="cursor-pointer hover:text-primary">Chat</a></li>
                <li><a href="#dashboard" className="cursor-pointer hover:text-primary">Dashboard</a></li>
                
                <Link className="cursor-pointer hover:text-white hover:bg-blue-950 font-semibold px-4 py-2 rounded-md border hover:border-transparent tránition duảtion-150" href="/login">
                    Login
                </Link>
                <Link className="cursor-pointer hover:text-white hover:bg-yellow font-semibold px-4 py-2 rounded-md border hover:border-transparent tránition duảtion-150" href="/signup">
                    Sign Up
                </Link>
            </ul>
        </nav>
    );
}
