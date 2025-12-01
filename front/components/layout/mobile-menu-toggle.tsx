import React from 'react'
import { Menu } from "lucide-react";
export default function MobileMenuToggle({ onToggle }: {
  onToggle: () => void;
  
 }) {
  return (
    <button onClick={onToggle} className="md:hidden cursor-pointer">
    <Menu className="h-8 w-8"/>
    </button>
  );
}
