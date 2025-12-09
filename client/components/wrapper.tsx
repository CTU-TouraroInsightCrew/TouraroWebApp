/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsigtCrew
 */

import React from 'react'
import { cn } from "@/lib/utils";
import { BaseProps } from "@/lib/types";

export default function Wrapper({
    children,
    className,
}: BaseProps) {
  return <div className={cn("wrapper", className)}>{children}</div>;
}
