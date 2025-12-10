/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

export type BaseProps = {
    children: React.ReactNode,
    className?: string,
};

export type NavLink = {
    label: string;
    href: string;
};

export type Locations = {
    id: number;
    location: string;
    duration: string;
    image: string;
    
}