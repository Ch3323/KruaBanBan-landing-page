import type { LucideIcon } from "lucide-react";
import {
  Bike,
  Calculator,
  ChefHat,
  CircleDollarSign,
  ClipboardList,
  Files,
  LineChart,
  MessageCircle,
  PackageSearch,
  ReceiptText,
  Store,
  TrendingDown,
  Users,
  WalletCards,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
};

export type IconCardContent = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type FlowStep = {
  label: string;
  description: string;
  icon: LucideIcon;
};

export type Feature = {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
  preview: "inventory" | "recipe" | "pricing" | "orders" | "reporting";
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type SubscriptionPlan = {
  name: string;
  label: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const navItems: NavItem[] = [
  { href: "#features", label: "ฟีเจอร์" },
  { href: "#how-it-works", label: "วิธีใช้งาน" },
  { href: "#audience", label: "เหมาะกับใคร" },
  { href: "#subscription", label: "แพ็กเกจ" },
  { href: "#faq", label: "คำถามที่พบบ่อย" },
];

export const problemItems: IconCardContent[] = [
  {
    title: "วัตถุดิบเหลือเท่าไรไม่แน่ใจ",
    description: "ของใกล้หมดมักรู้ตัวตอนต้องใช้จริง",
    icon: PackageSearch,
  },
  {
    title: "ตั้งราคาขายจากการประมาณ",
    description: "ต้นทุนต่อจานและค่า GP ไม่ได้อยู่ในสมการเดียวกัน",
    icon: Calculator,
  },
  {
    title: "ขายได้เยอะ แต่ไม่รู้กำไรจริง",
    description: "รายได้ ต้นทุน และกำไรแยกกันอยู่หลายที่",
    icon: TrendingDown,
  },
  {
    title: "ยอดขายและออเดอร์กระจาย",
    description: "ต้องไล่รวมข้อมูลเองเมื่ออยากดูย้อนหลัง",
    icon: Files,
  },
  {
    title: "หลายคนทำงาน ข้อมูลไม่ตรงกัน",
    description: "สมาชิกในร้านใช้คนละไฟล์หรือคนละชุดข้อมูล",
    icon: Users,
  },
];

export const flowSteps: FlowStep[] = [
  {
    label: "วัตถุดิบ",
    description: "บันทึกจำนวนและราคาต่อหน่วย",
    icon: PackageSearch,
  },
  {
    label: "สูตรอาหาร",
    description: "กำหนดปริมาณวัตถุดิบที่ใช้",
    icon: ChefHat,
  },
  {
    label: "ต้นทุน",
    description: "รวมวัตถุดิบ ค่าไฟ และค่าแก๊ส",
    icon: Calculator,
  },
  {
    label: "ราคาขาย",
    description: "คำนวณ Margin และ GP",
    icon: WalletCards,
  },
  {
    label: "ยอดขาย",
    description: "บันทึกรายการที่ขายในแต่ละวัน",
    icon: ReceiptText,
  },
  {
    label: "กำไร",
    description: "ดูรายได้ ต้นทุน และกำไรโดยประมาณ",
    icon: LineChart,
  },
];

export const features: Feature[] = [
  {
    eyebrow: "Inventory",
    title: "รู้ว่าวัตถุดิบเหลือเท่าไร ก่อนจะพบว่าของหมด",
    description:
      "ดูจำนวนคงเหลือ ราคา และสถานะวัตถุดิบสำคัญในร้านจากชุดข้อมูลเดียว",
    icon: PackageSearch,
    preview: "inventory",
    items: [
      "บันทึกจำนวนคงเหลือและจำนวนตั้งต้น",
      "รองรับหน่วยกรัม มิลลิลิตร และชิ้น",
      "แบ่งหมวดหมู่วัตถุดิบ พร้อมค้นหาและกรองรายการ",
      "บันทึกราคาต่อหน่วยและแสดงสัดส่วนวัตถุดิบที่เหลือ",
      "แจ้งเตือนผ่าน LINE เมื่อวัตถุดิบใกล้หมด",
    ],
  },
  {
    eyebrow: "Recipe Costing",
    title: "รู้ต้นทุนจริงของทุกสูตร ไม่ต้องตั้งราคาจากความรู้สึก",
    description:
      "ประกอบสูตรจากวัตถุดิบในสต็อก แล้วรวมต้นทุนวัตถุดิบและพลังงานให้เห็นชัด",
    icon: ChefHat,
    preview: "recipe",
    items: [
      "เลือกวัตถุดิบจากสต็อกและกำหนดปริมาณที่ใช้",
      "รวมค่าไฟหรือค่าแก๊สตามเวลาที่ใช้ทำ",
      "รองรับสูตรที่ผลิตได้หลายหน่วย",
      "ดูต้นทุนรวมต่อรอบและต้นทุนต่อหน่วย",
    ],
  },
  {
    eyebrow: "Pricing & GP",
    title: "ตั้งราคาขายให้ครอบคลุมทั้งต้นทุน กำไร และค่า GP",
    description:
      "ช่วยคิดราคาหน้าร้านและราคาช่องทางที่มีค่าคอมมิชชันจากตัวเลขเดียวกัน",
    icon: CircleDollarSign,
    preview: "pricing",
    items: [
      "กำหนด Margin ที่ต้องการ",
      "ระบุเปอร์เซ็นต์ GP",
      "แยกราคาหน้าร้านและราคาช่องทางเดลิเวอรี",
      "ใช้ราคาที่ระบบคำนวณให้ หรือกำหนดเองได้",
    ],
  },
  {
    eyebrow: "Daily Orders",
    title: "บันทึกยอดขายรายวัน แล้วให้สต็อกปรับตามสูตร",
    description:
      "เมื่อบันทึกเมนูที่ขาย ระบบจะคำนวณวัตถุดิบจากสูตรและลดสต็อกตามจำนวน",
    icon: ClipboardList,
    preview: "orders",
    items: [
      "เลือกสูตรอาหารและจำนวนที่ขาย",
      "แยกช่องทางหน้าร้านและช่องทางที่มี GP",
      "แก้ไขจำนวนหรือยกเลิกออเดอร์เพื่อปรับสต็อกกลับ",
      "ดูสรุปวันนี้จากรายการที่บันทึกไว้",
    ],
  },
  {
    eyebrow: "Reports",
    title: "ดูรายได้ ต้นทุน ค่า GP และกำไรในภาพเดียว",
    description:
      "ย้อนดูยอดขายตามช่วงเวลา เพื่อเห็นภาพรวมของร้านโดยไม่ต้องรวมเลขเอง",
    icon: LineChart,
    preview: "reporting",
    items: [
      "ดูยอดขายวันนี้ เมื่อวาน สัปดาห์นี้ หรือเดือนนี้",
      "เลือกช่วงวันที่เองได้",
      "เห็นรายได้ ต้นทุน ค่าคอมมิชชัน และกำไรโดยประมาณ",
      "ใช้เป็นข้อมูลประกอบการวางแผนซื้อวัตถุดิบ",
    ],
  },
];

export const audiences: IconCardContent[] = [
  {
    title: "คนเริ่มทำอาหารขาย",
    description: "เริ่มจัดเก็บข้อมูลร้านอย่างเป็นระบบ โดยไม่ต้องสร้าง Spreadsheet เอง",
    icon: ChefHat,
  },
  {
    title: "ร้านอาหารขนาดเล็ก",
    description: "รวมข้อมูลวัตถุดิบ สูตรอาหาร ราคาขาย และยอดขายไว้ในที่เดียว",
    icon: Store,
  },
  {
    title: "ร้านเดลิเวอรี",
    description: "คำนวณราคาที่คำนึงถึงค่า GP เพื่อประเมินกำไรได้ชัดเจนขึ้น",
    icon: Bike,
  },
  {
    title: "ร้านที่ทำงานร่วมกันหลายคน",
    description: "ใช้ข้อมูลครัวชุดเดียวกัน ลดปัญหาสต็อกและข้อมูลยอดขายไม่ตรงกัน",
    icon: Users,
  },
];

export const benefits = [
  "ลดการจดข้อมูลซ้ำหลายที่",
  "ลดความผิดพลาดในการคำนวณต้นทุน",
  "วางแผนซื้อวัตถุดิบได้ง่ายขึ้น",
  "ตั้งราคาขายจากต้นทุนจริง",
  "มองเห็นรายได้และกำไรได้เร็วขึ้น",
  "ทำงานร่วมกับสมาชิกในร้านได้ง่ายขึ้น",
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    name: "Free",
    label: "เริ่มต้นฟรี",
    price: "฿0",
    period: "/เดือน",
    description: "สำหรับทดลองจัดระบบครัวส่วนตัว หรือร้านที่เพิ่งเริ่มเก็บข้อมูลหลังร้าน",
    features: [
      "จัดการวัตถุดิบพื้นฐาน",
      "สร้างสูตรอาหารได้จำนวนจำกัด",
      "บันทึกยอดขายรายวัน",
      "ดูสรุปต้นทุนและกำไรเบื้องต้น",
    ],
  },
  {
    name: "Growth",
    label: "ร้านเริ่มจริงจัง",
    price: "ราคาเปิดตัวเร็ว ๆ นี้",
    description: "สำหรับร้านเล็กที่ต้องการคุมต้นทุนและราคาขายให้เป็นระบบมากขึ้น",
    highlighted: true,
    features: [
      "เพิ่มจำนวนวัตถุดิบและสูตรอาหาร",
      "คำนวณราคา Margin และ GP",
      "ดูประวัติยอดขายและกำไรย้อนหลัง",
      "แจ้งเตือนวัตถุดิบใกล้หมดผ่าน LINE",
      "แยกราคาหน้าร้านและเดลิเวอรี",
    ],
  },
  {
    name: "Pro",
    label: "ทีมและข้อมูลเต็มรูปแบบ",
    price: "ราคาเปิดตัวเร็ว ๆ นี้",
    description: "สำหรับทีมที่ต้องการความยืดหยุ่น รายงานละเอียด และพื้นที่รองรับการเติบโต",
    features: [
      "พื้นที่จัดการหลายครัวหรือหลายสาขา",
      "สิทธิ์สมาชิกและบทบาทการใช้งาน",
      "รายงานช่วงวันที่แบบละเอียด",
      "การดูแลและตั้งค่าระบบระดับทีม",
    ],
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Krua Ban Ban เป็นระบบรับออเดอร์จากลูกค้าหรือไม่?",
    answer:
      "ไม่ใช่ Krua Ban Ban เป็นระบบจัดการหลังร้าน สำหรับดูแลวัตถุดิบ สูตรอาหาร ต้นทุน ราคาขาย และบันทึกยอดขายภายในร้าน",
  },
  {
    question: "ลูกค้าสามารถสั่งอาหารหรือชำระเงินผ่านระบบได้หรือไม่?",
    answer: "ปัจจุบันระบบไม่มีหน้าร้านออนไลน์ Checkout หรือระบบรับชำระเงิน",
  },
  {
    question: "ใช้งานคนเดียวได้หรือไม่?",
    answer: "ได้ คุณสามารถใช้เป็นพื้นที่ครัวส่วนตัวสำหรับจัดการข้อมูลร้านของตัวเองได้",
  },
  {
    question: "สามารถใช้ร่วมกันหลายคนได้หรือไม่?",
    answer: "ได้ สามารถสร้างพื้นที่ครัวและเชิญสมาชิกด้วยรหัส 6 ตัว เพื่อใช้งานข้อมูลร่วมกัน",
  },
  {
    question: "ระบบช่วยคำนวณค่า GP หรือไม่?",
    answer: "ได้ คุณสามารถกำหนดเปอร์เซ็นต์ GP เพื่อช่วยคำนวณราคาขายสำหรับช่องทางที่มีค่าคอมมิชชัน",
  },
  {
    question: "เมื่อบันทึกยอดขาย สต็อกจะลดลงหรือไม่?",
    answer: "ระบบจะคำนวณวัตถุดิบจากสูตรอาหารและปรับจำนวนคงเหลือตามจำนวนสินค้าที่ขาย",
  },
  {
    question: "ระบบแจ้งเตือนวัตถุดิบใกล้หมดอย่างไร?",
    answer: "ระบบสามารถส่งข้อความแจ้งเตือนผ่าน LINE เมื่อวัตถุดิบลดต่ำกว่าเกณฑ์",
  },
  {
    question: "จำเป็นต้องติดตั้ง Application เพิ่มเติมหรือไม่?",
    answer: "ระบบออกแบบมาให้เข้าใช้งานผ่าน LINE LIFF โดยไม่ต้องติดตั้งโปรแกรมจัดการร้านที่ซับซ้อนเพิ่มเติม",
  },
];

export const lineMessages = [
  {
    label: "วัตถุดิบใกล้หมด",
    text: "อกไก่เหลือ 18% ตรวจสอบก่อนเปิดร้านรอบถัดไป",
    icon: MessageCircle,
  },
  {
    label: "สรุปยอดขายวันนี้",
    text: "รายได้ ฿2,450 ต้นทุน ฿1,120 กำไรประมาณการ ฿980",
    icon: ReceiptText,
  },
];
