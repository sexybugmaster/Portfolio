import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "projects");
const chromePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const cards = [
  {
    file: "hidden-growth-card.jpg",
    eyebrow: "AI Pipeline / API Contract",
    title: "HiddenGrowth",
    subtitle: "경험 텍스트를 분석해 스킬, 성장 포인트, 포트폴리오를 생성하는 AI 플랫폼",
    metric: "API 성공률 99%+",
    tags: ["FastAPI", "LangGraph", "JSON Schema", "Spring Boot"],
    accent: "#67e8b9",
  },
  {
    file: "kepco-card.jpg",
    eyebrow: "Fintech Reliability",
    title: "KEPCO MCS",
    subtitle: "생체정맥 스마트결제 인증 실패와 지연을 로그 기반으로 안정화",
    metric: "인증 지연 27% 개선",
    tags: ["Log Analysis", "Validation", "Error Taxonomy", "API Test"],
    accent: "#6aa8ff",
  },
  {
    file: "flexpace-card.jpg",
    eyebrow: "Planning / Prototype",
    title: "FLEXPACE",
    subtitle: "교회 유휴공간과 2030 소모임 수요를 연결한 공간 공유 서비스 기획",
    metric: "Service Planning",
    tags: ["Flutter", "Business Model", "UX Flow", "Market Entry"],
    accent: "#74efa7",
  },
];

function html(card) {
  const tags = card.tags.map((tag) => `<span>${tag}</span>`).join("");
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
        font-family: "Malgun Gothic", "Pretendard", "Segoe UI", Arial, sans-serif;
      }
      .card {
        position: relative;
        width: 1200px;
        height: 760px;
        padding: 72px;
        color: #f8fbff;
        background:
          radial-gradient(circle at 82% 16%, ${card.accent}33, transparent 28%),
          linear-gradient(135deg, #071220 0%, #0d1b2d 56%, #071220 100%);
      }
      .grid {
        position: absolute;
        inset: 0;
        opacity: .5;
        background-image:
          linear-gradient(rgba(216,227,238,.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(216,227,238,.055) 1px, transparent 1px);
        background-size: 86px 86px;
      }
      .panel {
        position: relative;
        display: grid;
        align-content: space-between;
        width: 100%;
        height: 100%;
        border: 1px solid rgba(216,227,238,.16);
        border-radius: 26px;
        padding: 58px 64px;
        background: rgba(13,27,45,.82);
        box-shadow: 0 30px 80px rgba(0,0,0,.38);
      }
      .eyebrow {
        margin: 0 0 22px;
        color: ${card.accent};
        font-family: "Cascadia Code", Consolas, monospace;
        font-size: 24px;
        font-weight: 800;
        letter-spacing: .02em;
      }
      h1 {
        max-width: 760px;
        margin: 0 0 22px;
        font-size: 74px;
        line-height: 1.06;
        letter-spacing: 0;
      }
      .subtitle {
        max-width: 760px;
        margin: 0;
        color: #bfd0e0;
        font-size: 28px;
        line-height: 1.55;
        word-break: keep-all;
      }
      .metric {
        display: inline-flex;
        width: fit-content;
        margin-top: 34px;
        border: 1px solid ${card.accent};
        border-radius: 999px;
        padding: 14px 22px;
        background: ${card.accent}1f;
        color: #efffff;
        font-size: 24px;
        font-weight: 900;
      }
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        max-width: 780px;
      }
      .tags span {
        border: 1px solid rgba(216,227,238,.18);
        border-radius: 999px;
        padding: 12px 18px;
        background: rgba(255,255,255,.05);
        color: #d8e3ee;
        font-size: 20px;
        font-weight: 800;
        line-height: 1;
      }
      .symbol {
        position: absolute;
        right: 86px;
        bottom: 92px;
        width: 230px;
        height: 160px;
        border: 3px solid ${card.accent};
        border-radius: 22px;
        opacity: .95;
      }
      .symbol::before,
      .symbol::after {
        position: absolute;
        inset: 50% auto auto 50%;
        background: ${card.accent};
        content: "";
        transform: translate(-50%, -50%);
      }
      .symbol::before { width: 120px; height: 3px; }
      .symbol::after { width: 3px; height: 92px; }
    </style>
  </head>
  <body>
    <main class="card">
      <div class="grid"></div>
      <section class="panel">
        <div>
          <p class="eyebrow">${card.eyebrow}</p>
          <h1>${card.title}</h1>
          <p class="subtitle">${card.subtitle}</p>
          <strong class="metric">${card.metric}</strong>
        </div>
        <div class="tags">${tags}</div>
        <div class="symbol"></div>
      </section>
    </main>
  </body>
</html>`;
}

await fs.mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: chromePath });
const page = await browser.newPage({ viewport: { width: 1200, height: 760 }, deviceScaleFactor: 1 });

for (const card of cards) {
  await page.setContent(html(card), { waitUntil: "networkidle" });
  await page.locator(".card").screenshot({
    path: path.join(outDir, card.file),
    type: "jpeg",
    quality: 92,
  });
}

await browser.close();
