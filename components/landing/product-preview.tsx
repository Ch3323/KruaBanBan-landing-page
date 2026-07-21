import { AlertTriangle, CircleDollarSign, PackageCheck, ReceiptText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type ProductPreviewProps = {
  compact?: boolean;
};

const ingredients = [
  { name: "อกไก่", value: 18, status: "ใกล้หมด", tone: "danger" },
  { name: "ข้าวหอมมะลิ", value: 62, status: "เพียงพอ", tone: "success" },
  { name: "น้ำมันพืช", value: 45, status: "เพียงพอ", tone: "default" },
];

export function ProductPreview({ compact = false }: ProductPreviewProps) {
  return (
    <Card className="rounded-lg border-border/80 bg-card/95 shadow-sm">
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-lg">ตัวอย่างภาพรวมวันนี้</CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">Demo UI ไม่ผูกกับ Backend</p>
          </div>
          <Badge className="rounded-lg" variant="secondary">
            หน้าร้าน
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
          <MetricCard
            icon={ReceiptText}
            label="ยอดขายวันนี้"
            tone="default"
            value="฿2,450"
          />
          <MetricCard
            icon={CircleDollarSign}
            label="กำไรประมาณการ"
            tone="success"
            value="฿980"
          />
        </div>
        <Separator />
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <PackageCheck aria-hidden className="size-4 text-primary" />
              วัตถุดิบ
            </div>
            <Badge className="rounded-lg" variant="destructive">
              <AlertTriangle aria-hidden />
              ใกล้หมด 1 รายการ
            </Badge>
          </div>
          <div className="space-y-3">
            {ingredients.map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span>{item.name}</span>
                  <span
                    className={cn(
                      "font-medium",
                      item.tone === "danger" && "text-destructive",
                      item.tone === "success" && "text-chart-2"
                    )}
                  >
                    {item.value}% · {item.status}
                  </span>
                </div>
                <Progress
                  aria-label={`${item.name} เหลือ ${item.value}%`}
                  className="h-2"
                  value={item.value}
                />
              </div>
            ))}
          </div>
        </div>
        {!compact ? (
          <>
            <Separator />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <SmallStat label="ต้นทุน" value="฿1,120" />
              <SmallStat label="ต้นทุนต่อจาน" value="฿30.50" />
              <SmallStat label="ช่องทาง" value="เดลิเวอรี" />
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}

type MetricCardProps = {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  tone: "default" | "success";
  value: string;
};

function MetricCard({ icon: Icon, label, tone, value }: MetricCardProps) {
  return (
    <div className="rounded-lg border bg-background/70 p-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon aria-hidden className={cn("size-4", tone === "success" && "text-chart-2")} />
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function SmallStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/60 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}
