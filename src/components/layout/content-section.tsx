import type React from "react";
interface ContentSectionProps {
  title: string;
  description?: string | React.JSX.Element;
}

export default function ContentSection({
  title,
  description,
}: Readonly<ContentSectionProps>) {
  return (
    <div className="flex-none">
      <h1 className="text-xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
