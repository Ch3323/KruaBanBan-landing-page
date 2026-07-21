import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-3xl flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      {badge ? (
        <Badge className="h-auto whitespace-normal rounded-lg px-3 py-1" variant="secondary">
          {badge}
        </Badge>
      ) : null}
      <h2 className="text-balance text-2xl font-semibold leading-tight text-foreground sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
