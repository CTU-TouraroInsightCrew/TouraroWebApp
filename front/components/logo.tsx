import React from 'react'
import Image from "next/image";
import Link from "next/link";
export default function Logo() {
  return <Link href="/" className="relative aspect-square block w-20 h-6">
    <Image fill src={"/logo.png"} alt={""}/>
  </Link>;
}
