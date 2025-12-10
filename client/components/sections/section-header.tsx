/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

import H2 from "../small_components/h2";
import H4 from "../small_components/h4";

type SectionHeaderProps = {
  subtitle: string;
  title: string;
  className?: string;
};

export default function SectionHeader({
  subtitle,
  title,
  className,
}: SectionHeaderProps) {
  return (
    <header className="text-center py-10">
      <H4 className="uppercase">{subtitle}</H4>
      <H2 className="mt-3">{title}</H2>
    </header>
  );
}