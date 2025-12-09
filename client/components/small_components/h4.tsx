/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsigtCrew
 */

import { BaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function H4({ className, children }: BaseProps) {
  return (
    <h4
      className={cn(
        "md:text-lg font-semibold font-poppins text-dark capitalize",
        className
      )}
    >
      {children}
    </h4>
  );
}