import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { AppCta } from "@/components/landing/app-cta";
import { Button } from "@/components/ui/button";

type FinalCtaSectionProps = {
  appUrl: string;
};

export function FinalCtaSection({ appUrl }: FinalCtaSectionProps) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-lg border bg-card p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl">
              เริ่มจัดการครัวอย่างเป็นระบบ ตั้งแต่วันนี้
            </h2>
            <p className="text-pretty text-lg leading-8 text-muted-foreground">
              ไม่ว่าคุณจะทำอาหารขายคนเดียว หรือดูแลร้านร่วมกับทีม Krua Ban Ban
              ช่วยให้คุณรู้วัตถุดิบ ต้นทุน ยอดขาย และกำไรได้จากที่เดียว
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              เริ่มจากวัตถุดิบรายการแรก แล้วค่อย ๆ สร้างระบบหลังร้านที่เหมาะกับธุรกิจของคุณ
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col">
            <AppCta appUrl={appUrl} icon="external" />
            <Button asChild className="h-11 w-full px-5 text-base sm:w-auto" size="lg" variant="outline">
              <Link href="#features">
                ดูฟีเจอร์ทั้งหมด
                <ArrowUpRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
