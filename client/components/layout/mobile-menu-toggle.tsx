/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

import React from 'react'
import { Menu } from "lucide-react";
export default function MobileMenuToggle({ onToggle }: {
  onToggle: () => void;
  
 }) {
  return (
    <button onClick={onToggle} className="md:hidden cursor-pointer" title="Toggle menu">
    <Menu className="h-8 w-8"/>
    </button>
  );
}
