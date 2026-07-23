import { useId, type ReactNode } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type AppCtaProps = {
  appUrl: string;
  children?: ReactNode;
  className?: string;
  icon?: "arrow" | "external" | "none";
  showDisabledNote?: boolean;
  size?: "default" | "lg" | "sm";
  variant?: "default" | "outline" | "secondary";
};

const disabledMessage = "กำลังเปิดให้ทดลองใช้งานเร็ว ๆ นี้";

function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

export function AppCta({
  appUrl,
  children = "เริ่มใช้งานผ่าน LINE",
  className,
  icon = "arrow",
  showDisabledNote = true,
  size = "lg",
  variant = "default",
}: AppCtaProps) {
  const href = appUrl.trim();
  const Icon = icon === "external" ? ExternalLink : ArrowRight;
  const disabledNoteId = useId();

  if (!href) {
    return (
      <div className={cn("flex flex-col gap-2", showDisabledNote ? "w-full sm:w-auto" : "w-auto")}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className={cn("inline-flex", showDisabledNote ? "w-full sm:w-auto" : "w-auto")} tabIndex={0}>
              <Button
                aria-describedby={showDisabledNote ? disabledNoteId : undefined}
                className={cn("h-11 w-full px-5 text-base sm:w-auto rounded-full", className)}
                disabled
                size={size}
                variant={variant}
              >
                {children}
                {icon !== "none" && <Icon aria-hidden />}
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>{disabledMessage}</TooltipContent>
        </Tooltip>
        {showDisabledNote ? (
          <span id={disabledNoteId} className="text-xs text-muted-foreground">
            {disabledMessage}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <Button
      asChild
      className={cn("h-11 w-full px-5 text-base sm:w-auto", className)}
      size={size}
      variant={variant}
    >
      <a
        href={href}
        rel={isExternalUrl(href) ? "noopener noreferrer" : undefined}
        target={isExternalUrl(href) ? "_blank" : undefined}
      >
        {children}
        {icon !== "none" && <Icon aria-hidden />}
      </a>
    </Button>
  );
}
