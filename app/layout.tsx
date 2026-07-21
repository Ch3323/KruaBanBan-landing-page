import type { Metadata } from "next";
import { Geist_Mono, Kanit } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteDescription =
  "เครื่องมือจัดการหลังร้านสำหรับธุรกิจอาหารขนาดเล็ก ช่วยจัดการวัตถุดิบ คำนวณต้นทุนสูตรอาหาร ตั้งราคาขาย บันทึกยอดขาย และดูผลกำไรผ่าน LINE";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: "Krua Ban Ban | จัดการสต็อก ต้นทุน และกำไรร้านอาหาร",
  description: siteDescription,
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    title: "Krua Ban Ban | จัดการสต็อก ต้นทุน และกำไรร้านอาหาร",
    description: siteDescription,
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krua Ban Ban | จัดการสต็อก ต้นทุน และกำไรร้านอาหาร",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${kanit.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
