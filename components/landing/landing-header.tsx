"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { AppCta } from "@/components/landing/app-cta";
import { navItems } from "@/components/landing/content";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type LandingHeaderProps = {
  appUrl: string;
};

export function LandingHeader({ appUrl }: LandingHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 12);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-16 transition-[padding,background-color] duration-300",
        isScrolled
          ? "px-2 py-2 sm:px-4"
          : "bg-background/92 px-0 py-0 backdrop-blur"
      )}
      data-scrolled={isScrolled}
    >
      <div
        className={cn(
          "mx-auto flex h-full w-full min-w-0 items-center justify-between gap-3 transition-[max-width,border-radius,background-color,box-shadow,padding] duration-300",
          isScrolled
            ? "max-w-5xl rounded-full bg-background/80 px-2 shadow-lg backdrop-blur-xl"
            : "max-w-7xl px-4 sm:px-6 lg:px-8"
        )}
      >
        <Link
          className="flex min-w-0 items-center gap-2 rounded-lg text-base font-semibold outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          href="/"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            LK
          </span>
          <span className="truncate">Langkrua</span>
        </Link>
        <nav
          aria-label="เมนูหลัก"
          className="hidden items-center gap-1 md:flex"
        >
          {navItems.map((item) => (
            <Button asChild key={item.href} className="hover:bg-transparent hover:text-muted-foreground" size="sm" variant="ghost">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>
        <div className="hidden items-center md:flex">
          <AppCta
            appUrl={appUrl}
            className="h-9 text-sm"
            icon="external"
            showDisabledNote={false}
            size="default"
          />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <AppCta
            appUrl={appUrl}
            className="h-9 w-auto px-3 text-sm"
            icon="none"
            showDisabledNote={false}
            size="default"
          >
            เริ่มใช้
          </AppCta>
          <Sheet>
            <SheetTrigger asChild>
              <Button aria-label="เปิดเมนูนำทาง" size="icon-lg" variant="ghost">
                <Menu aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[min(22rem,90vw)]" side="right">
              <SheetHeader>
                <SheetTitle>Langkrua</SheetTitle>
                <SheetDescription>
                  เครื่องมือจัดการหลังร้านสำหรับธุรกิจอาหารขนาดเล็ก
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="เมนูมือถือ" className="grid gap-1 px-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      className="rounded-lg px-3 py-3 text-base font-medium outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
