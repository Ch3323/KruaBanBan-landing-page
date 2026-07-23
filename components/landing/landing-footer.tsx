import Link from "next/link";

import { navItems } from "@/components/landing/content";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  ...navItems,
  { href: "/privacy", label: "นโยบายความเป็นส่วนตัว" },
  { href: "/terms", label: "เงื่อนไขการใช้งาน" },
  { href: "/contact", label: "ติดต่อเรา" },
];

export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="text-lg font-semibold">Langkrua</div>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              เครื่องมือจัดการหลังร้านสำหรับธุรกิจอาหารขนาดเล็ก
            </p>
          </div>
          <nav aria-label="ลิงก์ท้ายเว็บไซต์" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {footerLinks.map((link) => (
              <Link
                className="rounded-lg py-1 text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                href={link.href}
                key={`${link.href}-${link.label}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <Separator className="my-8" />
        <p className="text-sm text-muted-foreground">
          © {currentYear} Langkrua. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
