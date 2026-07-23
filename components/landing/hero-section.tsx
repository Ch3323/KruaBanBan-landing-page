import Image from "next/image";
import Link from "next/link";
import { ArrowDown, MessageCircle } from "lucide-react";

import { AppScreenshotStack } from "@/components/landing/app-screenshot-preview";
import { AppCta } from "@/components/landing/app-cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  appUrl: string;
};

export function HeroSection({ appUrl }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-36 bg-secondary/55" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:px-8 lg:py-16">
        <div className="relative z-10 flex flex-col gap-6">
          <Badge className="h-auto w-fit whitespace-normal rounded-lg px-3 py-1" variant="secondary">
            เครื่องมือจัดการหลังร้านสำหรับร้านอาหารขนาดเล็ก
          </Badge>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              จัดการครัวง่าย
              <br />
              รู้ต้นทุนจริง
              <br className="sm:hidden" />
              <span className="sm:ml-3">ในทุกจาน</span>
            </h1>
            <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
              Langkrua ช่วยให้ร้านอาหารขนาดเล็กจัดการวัตถุดิบ
              คำนวณต้นทุนสูตรอาหาร ตั้งราคาขาย บันทึกยอดขาย
              และดูรายได้กับกำไรได้ในที่เดียว
            </p>
            <p className="max-w-2xl text-pretty leading-7 text-muted-foreground">
              ใช้งานสะดวกผ่าน LINE จัดการได้ทั้งร้านคนเดียวและครัวที่ทำงานร่วมกันหลายคน
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-start">
            <AppCta appUrl={appUrl} icon="external" />
            <Button asChild className="h-11 w-full px-5 text-base sm:w-auto" size="lg" variant="outline">
              <Link href="#how-it-works">
                ดูวิธีการทำงาน
                <ArrowDown aria-hidden />
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            {["สต็อก", "ต้นทุนสูตร", "ราคาและ GP", "สรุปยอดขาย"].map((item) => (
              <span key={item} className="rounded-lg border bg-card px-3 py-1">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="relative z-10 space-y-5">
          <AppScreenshotStack />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageCircle aria-hidden className="size-4 text-chart-2" />
            ออกแบบให้ใช้งานผ่าน LINE LIFF และร้านที่ขายหลายช่องทาง
          </div>
          <div className="flex flex-wrap items-center gap-3 rounded-3xl border bg-card px-4 py-3 shadow-sm">
            {[
              { alt: "GrabFood", src: "/imgs/grab-food-logo.png" },
              { alt: "ShopeeFood", src: "/imgs/shopee-food-logo-sm.png" },
              { alt: "LINE MAN", src: "/imgs/lineman-logo.png" },
            ].map((logo) => (
              <Image
                alt={logo.alt}
                className="size-9 rounded-full object-cover"
                height={36}
                key={logo.alt}
                src={logo.src}
                width={36}
              />
            ))}
            <span className="text-sm font-medium">คำนวณราคาและ GP สำหรับเดลิเวอรี</span>
          </div>
        </div>
      </div>
    </section>
  );
}
