"use client";

import { useEffect, useRef, useState } from "react";
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
import Image from "next/image";

type LandingHeaderProps = {
  appUrl: string;
};

export function LandingHeader({ appUrl }: LandingHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const suppressScrollSpyRef = useRef(false);

  useEffect(() => {
    const updateHeader = () => {
      const isAtTop = window.scrollY < 120;

      setIsScrolled(window.scrollY > 12);

      if (isAtTop) {
        suppressScrollSpyRef.current = false;
        setActiveHref("");
      }
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => ({
        href: item.href,
        element: document.getElementById(item.href.replace("#", "")),
      }))
      .filter(
        (item): item is { href: string; element: HTMLElement } =>
          item.element != null
      );

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressScrollSpyRef.current) {
          return;
        }

        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((firstEntry, secondEntry) => {
            return (
              firstEntry.boundingClientRect.top -
              secondEntry.boundingClientRect.top
            );
          })[0];

        if (!visibleEntry) {
          return;
        }

        const nextSection = sections.find(
          (section) => section.element === visibleEntry.target
        );

        if (nextSection) {
          setActiveHref(nextSection.href);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section.element));

    return () => observer.disconnect();
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
            ? "max-w-5xl rounded-full bg-background/70 px-2 shadow-lg backdrop-blur-xl"
            : "max-w-7xl px-4 sm:px-6 lg:px-8"
        )}
      >
        <Link
          className="flex min-w-0 items-center gap-2 rounded-lg text-base font-semibold outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          href="#hero"
          onClick={() => {
            suppressScrollSpyRef.current = true;
            setActiveHref("");
          }}
        >
          <Image className="w-10 h-10" alt="langkrua-logo" width={512} height={512} src={"/imgs/langkrua-logo.png"}/>
          <span className="truncate">Langkrua</span>
        </Link>
        <nav
          aria-label="เมนูหลัก"
          className="hidden items-center gap-1 md:flex"
        >
          {navItems.map((item) => (
            <Button
              asChild
              key={item.href}
              className={cn(
                "transition-colors hover:bg-transparent hover:text-primary",
                activeHref === item.href && "bg-transparent text-primary"
              )}
              size="sm"
              variant="ghost"
            >
              <Link
                aria-current={activeHref === item.href ? "page" : undefined}
                href={item.href}
                onClick={() => {
                  suppressScrollSpyRef.current = false;
                }}
              >
                {item.label}
              </Link>
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
                      aria-current={activeHref === item.href ? "page" : undefined}
                      className={cn(
                        "rounded-lg px-3 py-3 text-base font-medium outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50",
                        activeHref === item.href &&
                          "bg-transparent text-primary hover:bg-muted hover:text-primary"
                      )}
                      href={item.href}
                      onClick={() => {
                        suppressScrollSpyRef.current = false;
                      }}
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
