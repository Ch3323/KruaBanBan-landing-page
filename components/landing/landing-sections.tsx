import { CheckCircle2, MessageCircle, Users } from "lucide-react";

import {
  audiences,
  benefits,
  faqItems,
  features,
  flowSteps,
  lineMessages,
  problemItems,
  type Feature,
} from "@/components/landing/content";
import { ProductPreview } from "@/components/landing/product-preview";
import { SectionHeading } from "@/components/landing/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function ProblemSection() {
  return (
    <section className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8" id="problems">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="ทำอาหารขายเก่ง แต่การจัดการหลังร้านยังวุ่นวายอยู่หรือเปล่า?" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {problemItems.map((item) => (
            <Card className="rounded-lg" key={item.title}>
              <CardHeader>
                <item.icon aria-hidden className="size-6 text-primary" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                {item.description}
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-8 text-muted-foreground">
          Krua Ban Ban รวบรวมข้อมูลสำคัญของร้านไว้ในที่เดียว เพื่อให้คุณตัดสินใจจากตัวเลขจริงได้ง่ายขึ้น
        </p>
      </div>
    </section>
  );
}

export function ProductFlowSection() {
  return (
    <section className="bg-card px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="ตั้งแต่วัตถุดิบหนึ่งชิ้น ไปจนถึงกำไรของทั้งวัน" />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {flowSteps.map((step, index) => (
            <div
              className="relative rounded-lg border bg-background p-4"
              key={step.label}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <step.icon aria-hidden className="size-5 text-muted-foreground" />
              </div>
              <h3 className="font-semibold">{step.label}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeatureSection() {
  return (
    <section className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8" id="features">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          description="ดูแลข้อมูลหลังร้านตั้งแต่วัตถุดิบ สูตรอาหาร และราคาขาย ไปจนถึงยอดขายและกำไร"
          title="เครื่องมือสำคัญสำหรับจัดการร้านในทุกวัน"
        />
        <div className="mt-12 space-y-14">
          {features.map((feature, index) => (
            <FeatureBlock feature={feature} key={feature.title} reverse={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureBlock({ feature, reverse }: { feature: Feature; reverse: boolean }) {
  return (
    <article
      className={cn(
        "grid gap-8 lg:grid-cols-2 lg:items-center",
        reverse && "lg:[&>*:first-child]:order-2"
      )}
    >
      <div className="space-y-5">
        <Badge className="h-auto rounded-lg px-3 py-1" variant="secondary">
          <feature.icon aria-hidden />
          {feature.eyebrow}
        </Badge>
        <div className="space-y-3">
          <h3 className="text-balance text-2xl font-semibold leading-tight sm:text-3xl">
            {feature.title}
          </h3>
          <p className="text-pretty leading-7 text-muted-foreground">{feature.description}</p>
        </div>
        <ul className="grid gap-3 text-sm leading-6 sm:grid-cols-2">
          {feature.items.map((item) => (
            <li className="flex gap-2" key={item}>
              <CheckCircle2 aria-hidden className="mt-1 size-4 shrink-0 text-chart-2" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <FeaturePreview type={feature.preview} />
    </article>
  );
}

function FeaturePreview({ type }: { type: Feature["preview"] }) {
  if (type === "inventory") {
    return <ProductPreview compact />;
  }

  if (type === "recipe") {
    return (
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>ข้าวไก่ทอด</CardTitle>
          <p className="text-sm text-muted-foreground">ตัวอย่างการคำนวณต้นทุนต่อจาน</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <PreviewRow label="ต้นทุนวัตถุดิบ" value="฿28.40" />
          <PreviewRow label="ต้นทุนพลังงาน" value="฿2.10" />
          <Separator />
          <PreviewRow emphasis label="ต้นทุนต่อจาน" value="฿30.50" />
        </CardContent>
      </Card>
    );
  }

  if (type === "pricing") {
    return (
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>ขายแล้วต้องเหลือกำไร</CardTitle>
          <p className="text-sm text-muted-foreground">ไม่ใช่แค่เหลือยอดขาย</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <PreviewRow label="ต้นทุนต่อจาน" value="฿30.50" />
          <PreviewRow label="Margin" value="40%" />
          <PreviewRow label="GP" value="30%" />
          <Separator />
          <PreviewRow emphasis label="ราคาหน้าร้าน" value="฿43" />
          <PreviewRow emphasis label="ราคาเดลิเวอรี" value="฿62" />
        </CardContent>
      </Card>
    );
  }

  if (type === "orders") {
    return (
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>บันทึกยอดขายวันนี้</CardTitle>
          <p className="text-sm text-muted-foreground">Demo UI สำหรับแสดงลำดับการลดสต็อก</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <PreviewRow label="ข้าวไก่ทอด" value="3 จาน" />
          <PreviewRow label="ช่องทาง" value="หน้าร้าน" />
          <PreviewRow label="อกไก่ที่ใช้" value="-360 กรัม" />
          <Separator />
          <PreviewRow emphasis label="สต็อกถูกปรับตามสูตร" value="อัตโนมัติ" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle>ภาพรวมช่วงเวลา</CardTitle>
        <p className="text-sm text-muted-foreground">ตัวอย่างรายได้ ต้นทุน ค่า GP และกำไร</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <SmallBox label="รายได้" tone="success" value="฿12,800" />
          <SmallBox label="ต้นทุน" value="฿6,240" />
          <SmallBox label="ค่า GP" value="฿1,420" />
          <SmallBox label="กำไรประมาณการ" tone="success" value="฿4,760" />
        </div>
        <Progress aria-label="กำไรประมาณการเทียบกับรายได้" className="h-2" value={37} />
      </CardContent>
    </Card>
  );
}

function PreviewRow({
  emphasis,
  label,
  value,
}: {
  emphasis?: boolean;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-medium", emphasis && "text-foreground")}>{value}</span>
    </div>
  );
}

function SmallBox({
  label,
  tone,
  value,
}: {
  label: string;
  tone?: "success";
  value: string;
}) {
  return (
    <div className="rounded-lg border bg-background/70 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={cn("mt-1 text-lg font-semibold", tone === "success" && "text-chart-2")}>
        {value}
      </div>
    </div>
  );
}

export function SharedKitchenSection() {
  return (
    <section className="bg-secondary/60 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-center">
        <SectionHeading
          align="left"
          badge="Workspace"
          description="สร้างพื้นที่ครัวและเชิญสมาชิกด้วยรหัส 6 ตัว เพื่อให้ทุกคนทำงานบนข้อมูลชุดเดียวกัน"
          title="ข้อมูลครัวเดียวกันสำหรับทีมเล็ก ๆ"
        />
        <Card className="rounded-lg bg-card">
          <CardContent className="space-y-4 pt-0">
            <div className="flex items-center gap-3 rounded-lg border bg-background p-4">
              <Users aria-hidden className="size-8 text-primary" />
              <div>
                <div className="font-semibold">ครัวบ้านบ้าน</div>
                <div className="text-sm text-muted-foreground">Join code: 6 ตัวอักษร</div>
              </div>
            </div>
            {["เจ้าของร้าน", "ผู้ช่วยครัว", "คนดูยอดขาย"].map((member) => (
              <div className="flex items-center justify-between rounded-lg bg-muted/60 px-4 py-3" key={member}>
                <span>{member}</span>
                <Badge className="rounded-lg" variant="outline">สมาชิก</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function LineIntegrationSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4">
          <Badge className="h-auto rounded-lg px-3 py-1" variant="secondary">
            <MessageCircle aria-hidden />
            LINE
          </Badge>
          <h2 className="text-balance text-2xl font-semibold leading-tight sm:text-3xl">
            รับแจ้งเตือนวัตถุดิบใกล้หมดและสรุปยอดขายผ่าน LINE
          </h2>
          <p className="text-pretty leading-7 text-muted-foreground">
            ระบบใช้ LINE สำหรับการเข้าใช้งานและส่งข้อความแจ้งเตือนจากข้อมูลหลังร้าน เช่น วัตถุดิบต่ำกว่าเกณฑ์และสรุปยอดขายรายวัน
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            ไม่ใช่ระบบสั่งอาหาร รับชำระเงิน หรือแชตบอตรับออเดอร์จากลูกค้า
          </p>
        </div>
        <div className="space-y-3">
          {lineMessages.map((message) => (
            <Card className="rounded-lg" key={message.label}>
              <CardContent className="flex gap-3 pt-0">
                <message.icon aria-hidden className="mt-1 size-5 shrink-0 text-chart-2" />
                <div>
                  <div className="font-medium">{message.label}</div>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{message.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  const steps = [
    ["เพิ่มวัตถุดิบ", "บันทึกจำนวนคงเหลือ หน่วย และราคาที่ซื้อมา"],
    ["สร้างสูตรอาหาร", "เลือกวัตถุดิบ ปริมาณ เวลา และต้นทุนพลังงาน"],
    ["ตั้งราคาขาย", "ตรวจสอบต้นทุน กำหนด Margin และค่า GP"],
    ["บันทึกยอดขาย", "ระบบปรับสต็อกและสรุปผลของวันให้โดยอัตโนมัติ"],
  ];

  return (
    <section className="scroll-mt-24 bg-card px-4 py-16 sm:px-6 lg:px-8" id="how-it-works">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="เริ่มจัดการร้านได้ใน 4 ขั้นตอน" />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(([title, description], index) => (
            <Card className="rounded-lg" key={title}>
              <CardHeader>
                <div className="text-4xl font-semibold text-primary">{index + 1}</div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TargetAudienceSection() {
  return (
    <section className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8" id="audience">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Krua Ban Ban เหมาะกับใคร?" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((item) => (
            <Card className="rounded-lg" key={item.title}>
              <CardHeader>
                <item.icon aria-hidden className="size-6 text-primary" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                {item.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BenefitsSection() {
  return (
    <section className="bg-secondary/60 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="มีเวลาทำอาหารมากขึ้น และใช้เวลากับการคำนวณน้อยลง" />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div className="flex items-start gap-3 rounded-lg border bg-card p-4" key={benefit}>
              <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-chart-2" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8" id="faq">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="คำถามที่พบบ่อย" />
        <Accordion className="mt-8 rounded-lg border bg-card px-4" collapsible type="single">
          {faqItems.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger className="text-base">{item.question}</AccordionTrigger>
              <AccordionContent className="leading-7 text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
