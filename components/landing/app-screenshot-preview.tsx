import Image from "next/image";

import { cn } from "@/lib/utils";

export type AppScreenshotType =
  | "inventory"
  | "recipe"
  | "pricing"
  | "orders"
  | "reporting";

const screenshots: Record<
  AppScreenshotType,
  {
    alt: string;
    src: string;
  }
> = {
  inventory: {
    alt: "หน้าจอมือถือคลังวัตถุดิบของ Langkrua แสดงรายการวัตถุดิบและสถานะคงเหลือ",
    src: "/app-screenshots/inventory-mobile.png",
  },
  recipe: {
    alt: "หน้าจอมือถือสูตรอาหารของ Langkrua แสดงต้นทุนและปุ่มตั้งราคา",
    src: "/app-screenshots/recipe-mobile.png",
  },
  pricing: {
    alt: "หน้าจอมือถือตั้งราคาของ Langkrua แสดง GP แพลตฟอร์มเดลิเวอรี",
    src: "/app-screenshots/pricing-mobile.png",
  },
  orders: {
    alt: "หน้าจอมือถือออเดอร์ของ Langkrua แสดงยอดขายวันนี้และรายการที่บันทึก",
    src: "/app-screenshots/orders-mobile.png",
  },
  reporting: {
    alt: "หน้าจอมือถือรายงานของ Langkrua แสดงรายได้ ต้นทุน และกำไร",
    src: "/app-screenshots/reporting-mobile.png",
  },
};

type AppScreenshotPreviewProps = {
  className?: string;
  priority?: boolean;
  type: AppScreenshotType;
};

export function AppScreenshotPreview({
  className,
  priority = false,
  type,
}: AppScreenshotPreviewProps) {
  const screenshot = screenshots[type];

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[21.5rem] overflow-hidden rounded-[2rem] border bg-background shadow-2xl shadow-foreground/10",
        className
      )}
    >
      <Image
        alt={screenshot.alt}
        className="h-auto w-full"
        height={844}
        priority={priority}
        src={screenshot.src}
        width={390}
      />
    </div>
  );
}

export function AppScreenshotStack() {
  return (
    <div className="relative mx-auto min-h-[38rem] w-full max-w-[34rem] sm:min-h-[42rem] lg:min-h-[43rem]">
      <AppScreenshotPreview
        className="absolute left-1/2 top-0 z-20 w-[58%] -translate-x-1/2 sm:w-[54%]"
        priority
        type="inventory"
      />
      <AppScreenshotPreview
        className="absolute bottom-4 left-0 z-10 w-[46%] rotate-[-4deg] opacity-95 sm:w-[42%]"
        type="orders"
      />
      <AppScreenshotPreview
        className="absolute bottom-0 right-0 z-10 w-[46%] rotate-[4deg] opacity-95 sm:w-[42%]"
        type="pricing"
      />
    </div>
  );
}
