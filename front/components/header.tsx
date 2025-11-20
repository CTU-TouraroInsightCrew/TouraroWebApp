"use client";
import React from 'react'
import { useState } from "react";
import Logo from "./logo";
import MobileMenuToggle from "./mobile-menu-toggle";
import MobileNav from './mobile-nav';
import Navigation from "./navigation"
import Wrapper from "./wrapper";
import { AnimatePresence } from 'motion/react';
export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };
    const handleToggle = () => {
        setIsOpen( (prev) => !prev );
    };
    return (
        <header className="py-6 fixed top-0 left-0 right-0 z-50 bg-[#0059B3] p-4 shadow-md text-white">
            <Wrapper>
                <div className="flex justify-between items-center">
                    <Logo/>
                    <Navigation />
                    <MobileMenuToggle onToggle={handleToggle}/>
                </div>
            </Wrapper>
            <AnimatePresence>
                {isOpen && <MobileNav onClose={handleClose} />}
            </AnimatePresence>
        </header>
    );
}
