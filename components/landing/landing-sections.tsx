import { CheckCircle2, MessageCircle, Users } from "lucide-react";

import { AppCta } from "@/components/landing/app-cta";
import {
  audiences,
  benefits,
  faqItems,
  features,
  flowSteps,
  lineMessages,
  problemItems,
  subscriptionPlans,
  type Feature,
  type SubscriptionPlan,
} from "@/components/landing/content";
import { AppScreenshotPreview } from "@/components/landing/app-screenshot-preview";
import { SectionHeading } from "@/components/landing/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
          Langkrua รวบรวมข้อมูลสำคัญของร้านไว้ในที่เดียว เพื่อให้คุณตัดสินใจจากตัวเลขจริงได้ง่ายขึ้น
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
                <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
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
  return (
    <div className="relative flex min-h-[32rem] items-center justify-center overflow-hidden rounded-[2rem] bg-muted/45 px-4 py-8">
      <AppScreenshotPreview className="max-w-[18.75rem]" type={type} />
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
        <SectionHeading title="Langkrua เหมาะกับใคร?" />
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

export function SubscriptionSection({ appUrl }: { appUrl: string }) {
  return (
    <section className="scroll-mt-24 bg-secondary/60 px-4 py-16 sm:px-6 lg:px-8" id="subscription">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          badge="Subscription"
          description="เลือกแพ็กเกจตามจังหวะของร้าน เริ่มจาก Free เพื่อจัดระบบพื้นฐาน แล้วอัปเกรดเมื่อทีมและข้อมูลเติบโตขึ้น"
          title="3 แพ็กเกจตั้งแต่ Free ถึง Pro"
        />
        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 items-stretch gap-5 md:grid-cols-3">
          {subscriptionPlans.map((plan) => (
            <SubscriptionCard appUrl={appUrl} key={plan.name} plan={plan} />
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-muted-foreground">
          ทุกแพ็กเกจออกแบบให้เหมาะกับร้านอาหารขนาดเล็ก และยังคงโฟกัสที่การจัดการหลังร้าน ไม่ใช่ระบบรับออเดอร์หรือรับชำระเงิน
        </p>
      </div>
    </section>
  );
}

function SubscriptionCard({
  appUrl,
  plan,
}: {
  appUrl: string;
  plan: SubscriptionPlan;
}) {
  return (
    <Card
      className={cn(
        "h-full min-w-0 gap-0 rounded-lg bg-card py-0 shadow-none",
        plan.highlighted && "ring-2 ring-primary shadow-lg"
      )}
    >
      <CardHeader className="gap-0 px-6 pb-6 pt-6">
        <div className="flex min-h-7 items-center justify-between gap-3">
          <span className="text-sm font-medium text-muted-foreground">{plan.label}</span>
          {plan.highlighted ? (
            <Badge className="h-auto shrink-0 rounded-lg px-3 py-1">
              แนะนำ
            </Badge>
          ) : null}
        </div>
        <CardTitle className="mt-5 text-2xl font-semibold">{plan.name}</CardTitle>
        <div className="mt-6 flex min-h-16 items-end">
          <span className={cn("font-semibold", plan.period ? "text-4xl leading-none" : "text-2xl leading-8")}>
            {plan.price}
          </span>
          {plan.period ? (
            <span className="ml-2 pb-1 text-sm text-muted-foreground">{plan.period}</span>
          ) : null}
        </div>
        <p className="mt-5 min-h-18 text-sm leading-6 text-muted-foreground">{plan.description}</p>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-1 flex-col justify-between px-6 pb-6 pt-6">
        <div>
          <p className="mb-4 text-sm font-semibold">สิ่งที่ได้รับ</p>
          <ul className="grid gap-3 text-sm leading-6">
            {plan.features.map((feature) => (
              <li className="flex gap-2" key={feature}>
                <CheckCircle2 aria-hidden className="mt-1 size-4 shrink-0 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 w-full [&>div]:w-full [&>div>span]:w-full">
          <AppCta
            appUrl={appUrl}
            className="h-11 w-full px-4 text-sm sm:w-full"
            icon="arrow"
            showDisabledNote={false}
            size="lg"
            variant={plan.highlighted ? "default" : "outline"}
          >
            {plan.name === "Free" ? "เริ่ม Free" : `ดูแผน ${plan.name}`}
          </AppCta>
        </div>
      </CardContent>
    </Card>
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
