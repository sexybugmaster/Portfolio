import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "projects");
const chromePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const covers = [
  {
    file: "nunchi-card.jpg",
    accent: "#39e3ff",
    nodes: ["Kiosk", "Agent", "MCP", "Vision", "Grafana"],
    motif: "eye",
  },
  {
    file: "hidden-growth-card.jpg",
    accent: "#67e8b9",
    nodes: ["Text", "Extract", "Validate", "Schema", "Portfolio"],
    motif: "graph",
  },
  {
    file: "kepco-card.jpg",
    accent: "#6aa8ff",
    nodes: ["Vein", "Auth", "Logs", "Match", "Stable"],
    motif: "shield",
  },
  {
    file: "graduation-card.jpg",
    accent: "#f59e0b",
    nodes: ["Transcript", "Rules", "Compare", "Explain", "Result"],
    motif: "rules",
  },
  {
    file: "flexpace-card.jpg",
    accent: "#74efa7",
    nodes: ["Space", "Users", "Booking", "BM", "SaaS"],
    motif: "space",
  },
];

const diagrams = [
  {
    file: "hidden-growth-architecture.jpg",
    title: "HiddenGrowth Architecture",
    columns: [
      ["React", "Experience Input", "Portfolio UI"],
      ["Spring Boot", "API Contract", "Persistence"],
      ["FastAPI", "LangGraph", "Pydantic"],
      ["OpenAI", "JSON Schema", "Post-processing"],
    ],
    caption: "사용자 경험 입력을 Spring/FastAPI 경계에서 표준화하고, LangGraph 단계에서 추출-검증-정제를 분리합니다.",
    accent: "#67e8b9",
  },
  {
    file: "graduation-architecture.jpg",
    title: "Graduation Requirement Flow",
    columns: [
      ["Transcript PDF", "Course History", "Normalize"],
      ["Rule Table", "Required Credits", "Exceptions"],
      ["Compare Engine", "Missing Items", "Progress"],
      ["Explain UI", "Why Not", "Next Action"],
    ],
    caption: "성적표와 학과별 규정을 바로 합산하지 않고, 정규화-규정 로딩-비교-설명 단계로 분리합니다.",
    accent: "#f59e0b",
  },
];

function coverHtml(card) {
  const nodeMarkup = card.nodes
    .map((node, index) => `<span style="--i:${index}">${node}</span>`)
    .join("");

  return `<!doctype html>
<html>
<head>
<meta charset="UTF-8" />
<style>
* { box-sizing: border-box; }
body { margin: 0; width: 1200px; height: 760px; overflow: hidden; background: #071220; }
.cover {
  position: relative;
  width: 1200px;
  height: 760px;
  overflow: hidden;
  background:
    radial-gradient(circle at 70% 24%, ${card.accent}33, transparent 28%),
    radial-gradient(circle at 20% 86%, #1f6feb22, transparent 30%),
    linear-gradient(135deg, #06111f 0%, #0d1c2f 52%, #071220 100%);
}
.grid {
  position: absolute;
  inset: -80px;
  transform: rotate(-8deg);
  opacity: .55;
  background-image:
    linear-gradient(rgba(216,227,238,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(216,227,238,.06) 1px, transparent 1px);
  background-size: 86px 86px;
}
.panel {
  position: absolute;
  inset: 68px;
  border: 1px solid rgba(216,227,238,.14);
  border-radius: 32px;
  background: linear-gradient(145deg, rgba(13,27,45,.78), rgba(7,18,32,.58));
  box-shadow: 0 28px 90px rgba(0,0,0,.45);
}
.orbit {
  position: absolute;
  right: 120px;
  top: 110px;
  width: 430px;
  height: 430px;
  border: 1px solid ${card.accent}66;
  border-radius: 50%;
}
.orbit::before,
.orbit::after {
  position: absolute;
  border: 1px solid ${card.accent}44;
  border-radius: 50%;
  content: "";
}
.orbit::before { inset: 58px; }
.orbit::after { inset: 118px; }
.core {
  position: absolute;
  right: 275px;
  top: 265px;
  width: 124px;
  height: 124px;
  border: 2px solid ${card.accent};
  border-radius: ${card.motif === "shield" ? "28px 28px 38px 38px" : "50%"};
  background: ${card.accent}20;
  box-shadow: 0 0 42px ${card.accent}55;
}
.core::before,
.core::after {
  position: absolute;
  background: ${card.accent};
  content: "";
}
.core::before { left: 28px; right: 28px; top: 60px; height: 3px; }
.core::after { top: 28px; bottom: 28px; left: 60px; width: 3px; }
.nodes span {
  position: absolute;
  left: calc(120px + var(--i) * 96px);
  bottom: calc(130px + (var(--i) % 2) * 72px);
  width: 84px;
  height: 84px;
  border: 1px solid rgba(216,227,238,.18);
  border-radius: 22px;
  background:
    linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.02)),
    ${card.accent}14;
  color: transparent;
  box-shadow: inset 0 0 24px rgba(255,255,255,.04), 0 18px 38px rgba(0,0,0,.24);
}
.nodes span::after {
  position: absolute;
  inset: 28px;
  border: 2px solid ${card.accent};
  border-radius: 50%;
  content: "";
}
.line {
  position: absolute;
  left: 158px;
  right: 450px;
  bottom: 254px;
  height: 2px;
  background: linear-gradient(90deg, transparent, ${card.accent}, transparent);
}
.scan {
  position: absolute;
  left: 120px;
  top: 130px;
  width: 430px;
  height: 240px;
  border: 1px solid rgba(216,227,238,.14);
  border-radius: 24px;
  background:
    repeating-linear-gradient(0deg, rgba(255,255,255,.07) 0 2px, transparent 2px 24px),
    linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.01));
}
.scan::after {
  position: absolute;
  inset: 0;
  border-radius: 24px;
  background: linear-gradient(100deg, transparent 10%, ${card.accent}22 45%, transparent 72%);
  content: "";
}
</style>
</head>
<body>
<main class="cover">
  <div class="grid"></div>
  <div class="panel"></div>
  <div class="scan"></div>
  <div class="line"></div>
  <div class="orbit"></div>
  <div class="core"></div>
  <div class="nodes">${nodeMarkup}</div>
</main>
</body>
</html>`;
}

function diagramHtml(diagram) {
  const columns = diagram.columns
    .map(
      (items) => `<div class="col">${items.map((item, i) => `<span class="${i === 0 ? "head" : ""}">${item}</span>`).join("")}</div>`,
    )
    .join("<i></i>");

  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<style>
* { box-sizing: border-box; }
body {
  margin: 0;
  width: 1200px;
  height: 760px;
  overflow: hidden;
  background: #071220;
  font-family: "Malgun Gothic", "Segoe UI", Arial, sans-serif;
}
.wrap {
  width: 1200px;
  height: 760px;
  padding: 68px;
  color: #f8fbff;
  background:
    radial-gradient(circle at 80% 10%, ${diagram.accent}2b, transparent 30%),
    linear-gradient(135deg, #071220, #0d1b2d);
}
h1 {
  margin: 0 0 18px;
  font-size: 48px;
  line-height: 1.1;
  letter-spacing: 0;
}
p {
  max-width: 940px;
  margin: 0 0 54px;
  color: #bfd0e0;
  font-size: 24px;
  line-height: 1.55;
}
.flow {
  display: grid;
  grid-template-columns: 1fr 50px 1fr 50px 1fr 50px 1fr;
  align-items: center;
  gap: 0;
}
.col {
  display: grid;
  gap: 14px;
  min-height: 300px;
  border: 1px solid rgba(216,227,238,.16);
  border-radius: 24px;
  padding: 28px;
  background: rgba(13,27,45,.82);
}
.col span {
  border: 1px solid rgba(216,227,238,.12);
  border-radius: 999px;
  padding: 12px 14px;
  color: #d8e3ee;
  font-size: 18px;
  font-weight: 800;
  text-align: center;
}
.col .head {
  border-color: ${diagram.accent};
  background: ${diagram.accent}1d;
  color: #ffffff;
  font-size: 22px;
}
i {
  display: block;
  height: 3px;
  background: linear-gradient(90deg, ${diagram.accent}, transparent);
}
</style>
</head>
<body>
<main class="wrap">
  <h1>${diagram.title}</h1>
  <p>${diagram.caption}</p>
  <section class="flow">${columns}</section>
</main>
</body>
</html>`;
}

await fs.mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: chromePath });
const page = await browser.newPage({ viewport: { width: 1200, height: 760 }, deviceScaleFactor: 1 });

for (const cover of covers) {
  await page.setContent(coverHtml(cover), { waitUntil: "networkidle" });
  await page.locator(".cover").screenshot({
    path: path.join(outDir, cover.file),
    type: "jpeg",
    quality: 92,
  });
}

for (const diagram of diagrams) {
  await page.setContent(diagramHtml(diagram), { waitUntil: "networkidle" });
  await page.locator(".wrap").screenshot({
    path: path.join(outDir, diagram.file),
    type: "jpeg",
    quality: 92,
  });
}

await browser.close();
