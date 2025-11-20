import H2 from "./h2";
import H4 from "./h4";

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