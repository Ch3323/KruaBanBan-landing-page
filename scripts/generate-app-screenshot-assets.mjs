import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outDir = path.join(process.cwd(), "public", "app-screenshots");
const imgDir = path.join(process.cwd(), "public", "imgs");

const theme = {
  background: "#ffffff",
  foreground: "#26231a",
  muted: "#f4f3ef",
  mutedForeground: "#766f62",
  border: "#e9e6de",
  primary: "#ffd124",
  primaryText: "#6a4311",
  amber: "#f59e0b",
  green: "#16a34a",
  red: "#dc2626",
  blue: "#2563eb",
  card: "#ffffff",
};

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function text(lines, x, y, options = {}) {
  const {
    size = 18,
    weight = 400,
    fill = theme.foreground,
    lineHeight = size * 1.45,
    anchor = "start",
  } = options;
  const values = Array.isArray(lines) ? lines : [lines];

  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${fill}">${values
    .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${esc(line)}</tspan>`)
    .join("")}</text>`;
}

function pill(label, x, y, w, options = {}) {
  const {
    fill = theme.muted,
    stroke = "none",
    color = theme.mutedForeground,
    size = 14,
    weight = 500,
  } = options;
  return `
    <rect x="${x}" y="${y}" width="${w}" height="34" rx="17" fill="${fill}" stroke="${stroke}" />
    ${text(label, x + w / 2, y + 22, { size, weight, fill: color, anchor: "middle" })}
  `;
}

function button(label, x, y, w, options = {}) {
  const {
    fill = theme.primary,
    color = theme.primaryText,
    stroke = "none",
  } = options;
  return `
    <rect x="${x}" y="${y}" width="${w}" height="48" rx="16" fill="${fill}" stroke="${stroke}" />
    ${text(label, x + w / 2, y + 30, { size: 16, weight: 600, fill: color, anchor: "middle" })}
  `;
}

function progress(x, y, w, value, color = theme.primary) {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="8" rx="4" fill="#ece8dd" />
    <rect x="${x}" y="${y}" width="${Math.round(w * value)}" height="8" rx="4" fill="${color}" />
  `;
}

function statusBar() {
  return `
    <rect width="390" height="844" rx="0" fill="${theme.background}" />
    <rect x="0" y="0" width="390" height="40" fill="${theme.background}" />
    ${text("9:41", 26, 26, { size: 14, weight: 600 })}
    <rect x="316" y="18" width="28" height="10" rx="5" fill="${theme.foreground}" opacity=".82" />
    <rect x="350" y="17" width="20" height="12" rx="3" fill="none" stroke="${theme.foreground}" stroke-width="1.5" opacity=".82" />
  `;
}

function header(title, subtitle) {
  return `
    <g>
      ${text(title, 24, 76, { size: 26, weight: 700 })}
      ${text(subtitle, 24, 104, { size: 14, fill: theme.mutedForeground })}
    </g>
  `;
}

function card(x, y, w, h, radius = 18) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${theme.card}" stroke="${theme.border}" />`;
}

function imageCard(x, y, w, h, label, meta, fill, badge) {
  return `
    <clipPath id="clip-${x}-${y}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28" /></clipPath>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28" fill="${fill}" />
    <g clip-path="url(#clip-${x}-${y})">
      <path d="M${x} ${y + h * 0.15} C${x + w * 0.25} ${y + h * 0.02}, ${x + w * 0.55} ${y + h * 0.32}, ${x + w} ${y + h * 0.12} V${y + h} H${x} Z" fill="#ffffff" opacity=".2" />
      <rect x="${x}" y="${y + h * 0.45}" width="${w}" height="${h * 0.55}" fill="#000000" opacity=".48" />
    </g>
    ${text(label, x + 14, y + h - 42, { size: 17, weight: 700, fill: "#ffffff" })}
    ${text(meta, x + 14, y + h - 18, { size: 12, weight: 500, fill: "#ffffff" })}
    ${badge ? pill(badge, x + w - 74, y + 12, 62, { fill: "#ffffff", color: theme.foreground, size: 11 }) : ""}
  `;
}

function platformLogo(dataUri, x, y, size = 34) {
  return `<image href="${dataUri}" x="${x}" y="${y}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid slice" />`;
}

function shell(body) {
  return `
    <svg width="390" height="844" viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg">
      <style>
        text { font-family: Kanit, "Noto Sans Thai", Arial, sans-serif; letter-spacing: 0; }
      </style>
      ${statusBar()}
      ${body}
    </svg>
  `;
}

function inventoryScreen() {
  return shell(`
    ${header("คลังวัตถุดิบ", "ตรวจสอบคงเหลือและหมวดหมู่ในครัว")}
    ${pill("ทั้งหมด", 24, 130, 82, { fill: theme.primary, color: theme.primaryText })}
    ${pill("เนื้อสัตว์", 114, 130, 92)}
    ${pill("ผัก", 214, 130, 58)}
    ${pill("เครื่องปรุง", 280, 130, 104)}
    <rect x="24" y="182" width="342" height="46" rx="18" fill="${theme.muted}" />
    ${text("ค้นหาวัตถุดิบ", 54, 212, { size: 15, fill: theme.mutedForeground })}
    ${imageCard(24, 250, 164, 164, "อกไก่", "18 / 100 กรัม", "#ca8a04", "ต่ำ")}
    ${imageCard(202, 250, 164, 164, "ข้าวหอมมะลิ", "62 / 100 กรัม", "#84a98c", "")}
    ${imageCard(24, 428, 164, 164, "น้ำมันพืช", "45 / 100 มล.", "#d97706", "")}
    ${imageCard(202, 428, 164, 164, "ไข่ไก่", "12 / 30 ชิ้น", "#facc15", "ต่ำ")}
    ${card(24, 620, 342, 120, 24)}
    ${text("วัตถุดิบใกล้หมด", 44, 656, { size: 18, weight: 700 })}
    ${text("ระบบใช้สัดส่วนคงเหลือเพื่อแจ้งเตือนก่อนของหมด", 44, 682, { size: 13, fill: theme.mutedForeground })}
    ${progress(44, 708, 302, .18, theme.red)}
  `);
}

function recipeScreen() {
  return shell(`
    ${header("สูตรอาหาร", "คำนวณต้นทุนและราคาขายต่อเมนู")}
    ${pill("ทั้งหมด", 24, 130, 82, { fill: theme.primary, color: theme.primaryText })}
    ${pill("เมนูขายดี", 114, 130, 102)}
    ${pill("ของทอด", 224, 130, 84)}
    <rect x="24" y="182" width="342" height="46" rx="18" fill="${theme.muted}" />
    ${text("ค้นหาสูตรอาหาร", 54, 212, { size: 15, fill: theme.mutedForeground })}
    ${card(24, 250, 342, 244, 28)}
    <rect x="24" y="250" width="342" height="132" rx="28" fill="#b45309" />
    <path d="M24 322 C108 280, 184 350, 366 296 V382 H24 Z" fill="#fbbf24" opacity=".55" />
    <rect x="24" y="318" width="342" height="64" fill="#000000" opacity=".42" />
    ${text("ข้าวไก่ทอด", 44, 356, { size: 22, weight: 700, fill: "#ffffff" })}
    ${pill("25 นาที", 44, 404, 82)}
    ${pill("ต้นทุนรวม ฿122", 134, 404, 128)}
    ${pill("ราคาหน้าร้าน ฿59", 44, 448, 138, { fill: theme.primary, color: theme.primaryText })}
    ${button("วัตถุดิบ", 44, 520, 144, { fill: "#ffffff", color: theme.foreground, stroke: theme.border })}
    ${button("ตั้งราคา", 202, 520, 144)}
    ${card(24, 600, 342, 116, 24)}
    ${text("ต้นทุน / จาน", 44, 636, { size: 14, fill: theme.mutedForeground })}
    ${text("฿30.50", 44, 674, { size: 34, weight: 700 })}
    ${text("พร้อมแยกค่าไฟ ค่าแก๊ส และวัตถุดิบ", 44, 704, { size: 13, fill: theme.mutedForeground })}
  `);
}

function pricingScreen({ grab, shopee, lineman }) {
  return shell(`
    ${header("ตั้งราคา", "เปิดช่องทางขายและกำหนด GP แต่ละแพลตฟอร์ม")}
    ${card(24, 130, 342, 104, 22)}
    ${text("ต้นทุนสูตร", 44, 166, { size: 14, fill: theme.mutedForeground })}
    ${text("฿122.00", 44, 204, { size: 32, weight: 700 })}
    ${text("ต้นทุน/จาน ฿30.50", 226, 204, { size: 14, fill: theme.mutedForeground })}
    ${card(24, 254, 342, 88, 20)}
    ${platformLogo(grab, 44, 281)}
    ${text(["GrabFood", "GP 32.1% · เปิดขาย"], 90, 296, { size: 16, weight: 600, lineHeight: 22 })}
    <rect x="308" y="288" width="38" height="22" rx="11" fill="${theme.primary}" />
    <circle cx="333" cy="299" r="8" fill="#ffffff" />
    ${card(24, 358, 342, 88, 20)}
    ${platformLogo(shopee, 44, 385)}
    ${text(["ShopeeFood", "GP 32.1% · เปิดขาย"], 90, 400, { size: 16, weight: 600, lineHeight: 22 })}
    <rect x="308" y="392" width="38" height="22" rx="11" fill="${theme.primary}" />
    <circle cx="333" cy="403" r="8" fill="#ffffff" />
    ${card(24, 462, 342, 88, 20)}
    ${platformLogo(lineman, 44, 489)}
    ${text(["LINE MAN", "GP 32.1% · เปิดขาย"], 90, 504, { size: 16, weight: 600, lineHeight: 22 })}
    <rect x="308" y="496" width="38" height="22" rx="11" fill="${theme.primary}" />
    <circle cx="333" cy="507" r="8" fill="#ffffff" />
    ${card(24, 574, 342, 154, 22)}
    ${text("GrabFood", 44, 612, { size: 18, weight: 700 })}
    ${text("มาร์จิน (%)", 44, 650, { size: 13, fill: theme.mutedForeground })}
    <rect x="44" y="666" width="132" height="46" rx="14" fill="${theme.muted}" />
    ${text("40", 154, 695, { size: 18, weight: 600, anchor: "middle" })}
    ${text("ราคาขายต่อจาน", 204, 650, { size: 13, fill: theme.mutedForeground })}
    <rect x="204" y="666" width="142" height="46" rx="14" fill="${theme.muted}" />
    ${text("฿62", 275, 695, { size: 18, weight: 600, anchor: "middle" })}
  `);
}

function ordersScreen({ grab }) {
  return shell(`
    ${header("ออเดอร์", "บันทึกยอดขายวันนี้และปรับสต็อกตามสูตร")}
    ${card(24, 130, 342, 136, 24)}
    ${text("สรุปวันนี้", 44, 168, { size: 18, weight: 700 })}
    ${text("฿2,450.00", 44, 214, { size: 34, weight: 700 })}
    ${pill("ต้นทุน ฿1,120", 44, 230, 128)}
    ${pill("กำไร ฿980", 184, 230, 106, { fill: "#dcfce7", color: "#166534" })}
    ${button("สร้างออเดอร์", 24, 292, 342)}
    ${card(24, 364, 342, 92, 20)}
    <rect x="44" y="388" width="44" height="44" rx="10" fill="#b45309" />
    ${text(["ข้าวไก่ทอด", "วันนี้ · GrabFood"], 104, 404, { size: 15, weight: 600, lineHeight: 20 })}
    ${platformLogo(grab, 248, 393, 28)}
    ${text("x3", 286, 417, { size: 14, weight: 600 })}
    ${text("฿186", 326, 417, { size: 14, weight: 700, anchor: "middle" })}
    ${card(24, 472, 342, 92, 20)}
    <rect x="44" y="496" width="44" height="44" rx="10" fill="#84a98c" />
    ${text(["ข้าวผัดหมู", "วันนี้ · หน้าร้าน"], 104, 512, { size: 15, weight: 600, lineHeight: 20 })}
    ${text("x2", 286, 525, { size: 14, weight: 600 })}
    ${text("฿118", 326, 525, { size: 14, weight: 700, anchor: "middle" })}
    ${card(24, 596, 342, 132, 24)}
    ${text("รายละเอียดการคำนวณ", 44, 632, { size: 17, weight: 700 })}
    ${text("ต้นทุนวัตถุดิบ", 44, 668, { size: 14, fill: theme.mutedForeground })}
    ${text("฿1,030.00", 326, 668, { size: 14, weight: 600, anchor: "middle" })}
    ${text("ค่าคอมมิชชัน", 44, 698, { size: 14, fill: theme.mutedForeground })}
    ${text("- ฿340.00", 326, 698, { size: 14, weight: 600, anchor: "middle" })}
  `);
}

function reportingScreen() {
  return shell(`
    ${header("ภาพรวมกำไร", "ดูรายได้ ต้นทุน GP และกำไรในช่วงเวลาเดียว")}
    ${pill("วันนี้", 24, 130, 74, { fill: theme.primary, color: theme.primaryText })}
    ${pill("เมื่อวาน", 106, 130, 88)}
    ${pill("สัปดาห์นี้", 202, 130, 102)}
    ${pill("กำหนดเอง", 312, 130, 100)}
    ${card(24, 186, 164, 112, 22)}
    ${text("รายได้", 44, 224, { size: 14, fill: theme.mutedForeground })}
    ${text("฿12,800", 44, 264, { size: 27, weight: 700 })}
    ${card(202, 186, 164, 112, 22)}
    ${text("กำไร", 222, 224, { size: 14, fill: theme.mutedForeground })}
    ${text("฿4,760", 222, 264, { size: 27, weight: 700, fill: theme.green })}
    ${card(24, 316, 342, 184, 24)}
    ${text("ต้นทุนและค่าธรรมเนียม", 44, 354, { size: 18, weight: 700 })}
    ${progress(44, 388, 302, .49, theme.amber)}
    ${text("ต้นทุนวัตถุดิบ", 44, 426, { size: 14, fill: theme.mutedForeground })}
    ${text("฿6,240", 318, 426, { size: 14, weight: 600, anchor: "middle" })}
    ${progress(44, 456, 302, .11, theme.blue)}
    ${text("ค่า GP", 44, 494, { size: 14, fill: theme.mutedForeground })}
    ${text("฿1,420", 318, 494, { size: 14, weight: 600, anchor: "middle" })}
    ${card(24, 530, 342, 144, 24)}
    ${text("วัตถุดิบที่ควรวางแผนซื้อ", 44, 568, { size: 18, weight: 700 })}
    ${text("อกไก่", 44, 606, { size: 15, weight: 600 })}
    ${progress(104, 598, 170, .18, theme.red)}
    ${text("18%", 320, 606, { size: 14, weight: 700, fill: theme.red, anchor: "middle" })}
    ${text("ไข่ไก่", 44, 642, { size: 15, weight: 600 })}
    ${progress(104, 634, 170, .4, theme.amber)}
    ${text("40%", 320, 642, { size: 14, weight: 700, fill: theme.amber, anchor: "middle" })}
  `);
}

async function dataUri(fileName) {
  const ext = fileName.endsWith(".png") ? "png" : "jpeg";
  const buffer = await readFile(path.join(imgDir, fileName));
  return `data:image/${ext};base64,${buffer.toString("base64")}`;
}

async function writePng(name, svg) {
  await sharp(Buffer.from(svg)).png().toFile(path.join(outDir, name));
}

const grab = await dataUri("grab-food-logo.png");
const shopee = await dataUri("shopee-food-logo-sm.png");
const lineman = await dataUri("lineman-logo.png");

await Promise.all([
  writePng("inventory-mobile.png", inventoryScreen()),
  writePng("recipe-mobile.png", recipeScreen()),
  writePng("pricing-mobile.png", pricingScreen({ grab, shopee, lineman })),
  writePng("orders-mobile.png", ordersScreen({ grab })),
  writePng("reporting-mobile.png", reportingScreen()),
]);
