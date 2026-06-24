import React from "react";
import ReactDOM from "react-dom/client";
import {
  Activity,
  Award,
  Blocks,
  BookOpen,
  BriefcaseBusiness,
  Download,
  GitBranch,
  Mail,
  MonitorDot,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import "./styles.css";

type ProjectLink = {
  label: string;
  href: string;
};

type Project = {
  title: string;
  eyebrow: string;
  summary: string;
  role: string;
  period: string;
  image: string;
  metric: string;
  stack: string[];
  overview: string;
  decisions: {
    problem: string;
    consideration: string;
    choice: string;
    result: string;
  };
  metrics: {
    label: string;
    value: string;
    caption: string;
  }[];
  codeNotes: {
    title: string;
    text: string;
    code?: string;
  }[];
  detailImages?: string[];
  links?: ProjectLink[];
};

type Skill = {
  name: string;
  level: number;
  label: "주력" | "활용" | "경험" | "학습";
};

type SkillGroup = {
  title: string;
  items: Skill[];
};

type Course = {
  name: string;
  grade: string;
};

type CourseGroup = {
  title: string;
  items: Course[];
};

const email = "hyl020415@gmail.com";
const velog = "https://velog.io/@hyl0415/posts";

const metrics = [
  { value: "15/15", label: "기능 요구사항 구현·검증", detail: "NUNCHI physical QA" },
  { value: "9-19s", label: "LLM 병목 구간 분리", detail: "MCP는 수십 ms" },
  { value: "99%+", label: "API 성공률 안정화", detail: "HiddenGrowth" },
  { value: "27%", label: "인증 지연 개선", detail: "KEPCO MCS" },
];

const focusCards = [
  {
    icon: <Workflow aria-hidden="true" />,
    title: "문제 구조화",
    text: "장애와 품질 이슈를 로그, 지표, 재현 조건으로 나누어 원인을 좁힙니다.",
  },
  {
    icon: <ShieldCheck aria-hidden="true" />,
    title: "안정적인 서버/인프라",
    text: "API 규격, 예외 처리, 인증, 데이터 정합성과 배포/운영 환경을 함께 봅니다.",
  },
  {
    icon: <MonitorDot aria-hidden="true" />,
    title: "운영 관점",
    text: "Actuator, Prometheus, Grafana, 로그 분석으로 동작 중인 시스템의 상태를 관측합니다.",
  },
];

const stackGroups: SkillGroup[] = [
  {
    title: "Backend",
    items: [
      { name: "Java", level: 4, label: "주력" },
      { name: "Spring Boot", level: 4, label: "주력" },
      { name: "REST API", level: 4, label: "주력" },
      { name: "FastAPI", level: 3, label: "활용" },
      { name: "JPA / Hibernate", level: 3, label: "활용" },
      { name: "JWT / Security", level: 3, label: "활용" },
    ],
  },
  {
    title: "Database / Infra",
    items: [
      { name: "MySQL", level: 3, label: "활용" },
      { name: "PostgreSQL", level: 3, label: "활용" },
      { name: "Redis", level: 2, label: "경험" },
      { name: "Docker Compose", level: 3, label: "활용" },
      { name: "AWS EC2 / RDS", level: 3, label: "활용" },
      { name: "Nginx", level: 2, label: "경험" },
    ],
  },
  {
    title: "Monitoring / DevOps",
    items: [
      { name: "Spring Actuator", level: 3, label: "활용" },
      { name: "Prometheus", level: 3, label: "활용" },
      { name: "Grafana", level: 3, label: "활용" },
      { name: "GitHub Actions", level: 2, label: "경험" },
      { name: "Swagger / Postman", level: 4, label: "주력" },
      { name: "Linux", level: 3, label: "활용" },
    ],
  },
  {
    title: "AI / Data",
    items: [
      { name: "LangGraph", level: 3, label: "활용" },
      { name: "OpenAI API", level: 3, label: "활용" },
      { name: "JSON Schema", level: 4, label: "주력" },
      { name: "Pydantic", level: 3, label: "활용" },
      { name: "OpenCV / MediaPipe", level: 2, label: "경험" },
      { name: "AI 후처리 파이프라인", level: 4, label: "주력" },
      { name: "데이터 정합성 검증", level: 4, label: "주력" },
    ],
  },
];

const projects: Project[] = [
  {
    eyebrow: "Infra / Monitoring / Gaze Control",
    title: "NUNCHI 키오스크 서버 모니터링 및 시선 기반 전체 조작",
    summary:
      "LLM Agent 기반 배리어프리 키오스크의 지연 구간을 측정하고 Prometheus/Grafana 관측 체계와 시선 기반 전체 조작 기능을 구축했습니다.",
    role: "서버/인프라 담당",
    period: "2026.03 - 2026.06",
    image: "/projects/nunchi-card.jpg",
    metric: "15/15 기능 요구사항 검증",
    stack: [
      "Spring Boot",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker Compose",
      "AWS EC2",
      "Prometheus",
      "Grafana",
      "OpenCV",
      "MediaPipe",
      "WebSocket",
    ],
    overview:
      "NUNCHI는 LLM Agent가 실제 키오스크 주문 시스템을 조작하는 배리어프리 서비스입니다. 저는 서버/인프라 관점에서 배포 구조, 관측 지표, 병목 분리, 시선 입력 연동 검토를 맡아 시스템이 느린 이유와 안전하게 운영되는 조건을 분명히 만드는 데 집중했습니다.",
    decisions: {
      problem:
        "AI 주문 대화가 9-19초까지 지연됐지만, 사용자는 단순히 '서버가 느리다'고 느낄 수밖에 없었습니다. Spring, DB, MCP, LangGraph 중 어느 구간이 실제 병목인지 분리해야 했습니다.",
      consideration:
        "처음에는 API 응답 시간만 보면 된다고 생각할 수 있었지만, 전체 응답 시간만 보면 DB 문제인지 LLM 실행 문제인지 판단할 수 없었습니다. 그래서 서비스 단계별 로그와 Actuator/Prometheus 지표를 함께 보는 방식이 필요했습니다.",
      choice:
        "Spring [AI_CALL], FastAPI [AI_STEP], MCP [MCP_TOOL] 로그를 ms 단위로 남기고, Prometheus/Grafana로 p95/p99 요청 지표를 관측했습니다. 시선 입력은 YES/NO가 아니라 좌우 포커스 이동과 더블 깜빡임 클릭으로 전체 화면 조작이 가능하도록 정리했습니다.",
      result:
        "MCP Tool과 일반 REST API는 충분히 빠르고, 병목은 LLM-bound LangGraph 실행 구간이라는 결론을 얻었습니다. 이 결과 덕분에 최적화 방향을 서버 증설이 아니라 streaming, prefetch, fast path로 좁힐 수 있었습니다.",
    },
    metrics: [
      { label: "기능 검증", value: "15/15", caption: "물리 키오스크 QA 통과" },
      { label: "Agent Turn", value: "9-19s", caption: "LLM-bound 병목 확인" },
      { label: "MCP Tool", value: "ms", caption: "수십 ms 수준 실행" },
    ],
    codeNotes: [
      {
        title: "구간별 타이밍 로그",
        text: "FastAPI, MCP, Spring 로그를 같은 요청 흐름 안에서 비교해 병목 위치를 추적했습니다.",
        code: "[AI_STEP] langgraph_invoke=12840ms\n[MCP_TOOL] tool_add_cart_item=42ms\n[AI_CALL] total=13420ms",
      },
      {
        title: "관측 기준",
        text: "Actuator의 Prometheus endpoint를 15초 주기로 수집하고 p95/p99 요청 히스토그램을 Grafana에서 확인했습니다.",
      },
    ],
    detailImages: [
      "/projects/nunchi-detail-grafana.jpg",
      "/projects/nunchi-detail-gaze.jpg",
      "/projects/nunchi-detail-architecture.jpg",
    ],
    links: [{ label: "GitHub", href: "https://github.com/CapstoneDgu" }],
  },
  {
    eyebrow: "AI Pipeline / API Contract",
    title: "HiddenGrowth",
    summary:
      "사용자 경험 텍스트를 분석해 핵심 스킬, 성장 포인트, 추천 직무, 포트폴리오를 자동 생성하는 AI 기반 성장 플랫폼입니다.",
    role: "팀 리더 / AI 개발 / 백엔드 연동",
    period: "2025 X-THON",
    image: "/projects/hidden-growth-card.jpg",
    metric: "API 성공률 99%+",
    stack: ["Spring Boot", "FastAPI", "LangGraph", "OpenAI API", "MySQL", "Docker", "JSON Schema", "Pydantic"],
    overview:
      "HiddenGrowth는 사용자의 경험 텍스트를 분석해 직무 역량과 성장 포인트를 추출하고, 포트폴리오 형태로 정리하는 AI 서비스입니다. 저는 AI 분석 파이프라인과 FastAPI-Spring 연동 규격을 맡아, LLM 출력이 서비스 데이터로 안전하게 들어오도록 검증 구조를 설계했습니다.",
    decisions: {
      problem:
        "초기에는 AI가 문맥과 무관한 스킬을 만들거나 중복 스킬을 반환했고, JSON 구조가 깨져 Spring 쪽 연동이 실패하는 문제가 있었습니다.",
      consideration:
        "프롬프트를 길게 보강하는 방식은 빠르게 적용할 수 있지만, 출력 형식과 품질을 항상 보장하기 어렵다는 단점이 있었습니다. 반대로 단계별 파이프라인은 구현량이 늘지만 검증과 후처리를 분리할 수 있었습니다.",
      choice:
        "LangGraph로 추출, 검증, 정제, 최종화 단계를 분리하고 JSON Schema/Pydantic 검증을 적용했습니다. Spring과 FastAPI 사이에는 요청/응답 Contract를 명시해 스키마 충돌을 줄였습니다.",
      result:
        "AI 스킬 추출 정확도와 출력 품질이 개선됐고, FastAPI-Spring 연동 성공률을 99% 이상으로 안정화했습니다. 결과적으로 LLM을 단순 응답 생성기가 아니라 검증 가능한 데이터 파이프라인으로 다루는 경험을 얻었습니다.",
    },
    metrics: [
      { label: "API 성공률", value: "99%+", caption: "FastAPI-Spring 연동" },
      { label: "스킬 추출", value: "+25%", caption: "정확도 개선" },
      { label: "출력 품질", value: "+30%", caption: "후처리 개선" },
    ],
    codeNotes: [
      {
        title: "Schema First",
        text: "LLM 출력은 바로 저장하지 않고 Pydantic 모델과 JSON Schema를 통과한 값만 Spring으로 전달했습니다.",
        code: "class SkillResult(BaseModel):\n    skills: list[str]\n    evidence: list[str]\n    confidence: float",
      },
      {
        title: "파이프라인 분리",
        text: "한 번의 프롬프트로 끝내지 않고 추출과 검증 단계를 분리해 원인 추적과 품질 개선이 쉬운 구조로 만들었습니다.",
      },
    ],
    detailImages: [
      "/projects/hidden-growth-ui-landing.jpg",
      "/projects/hidden-growth-ui-basic.jpg",
      "/projects/hidden-growth-ui-chat.jpg",
      "/projects/hidden-growth-architecture.jpg",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/2025-X-Thon-Team4-OhRyuNotJo/2025_X_Thon_Team4_OhRyuNotJo",
      },
    ],
  },
  {
    eyebrow: "Fintech Reliability / Internship",
    title: "한전 MCS 생체정맥 스마트결제 시스템 안정화",
    summary:
      "생체정맥 기반 스마트결제 시스템의 인증 실패와 지연 문제를 로그 기반으로 분석하고 정합성 검증을 개선했습니다.",
    role: "인증 실패/지연 재현 및 로그 분석",
    period: "2025.07 - 2025.08",
    image: "/projects/kepco-card.jpg",
    metric: "인증 지연 27% 개선",
    stack: ["API 테스트", "로그 분석", "데이터 정합성 검증", "오류 유형 분류", "운영 지표 비교"],
    overview:
      "한전 MCS 인턴십에서는 생체정맥 기반 스마트결제 시스템의 인증 실패와 지연을 분석했습니다. 내부 시스템 화면은 보안상 제외하고, 운영 안정화 과정 자체를 로그 기반 분류와 정합성 검증 보완 경험으로 정리했습니다.",
    decisions: {
      problem:
        "인증 실패와 지연이 발생했지만 원인이 입력 품질인지, 사용자 등록정보 매칭 문제인지, 네트워크/서버 지연인지 구분하기 어려웠습니다.",
      consideration:
        "개별 케이스를 임시로 처리하면 단기적으로는 빠르지만 같은 유형의 오류가 반복될 수 있었습니다. 반대로 오류 유형을 먼저 분류하면 시간이 더 걸리지만 운영 대응 기준을 만들 수 있었습니다.",
      choice:
        "로그를 기준으로 입력 품질, 매칭 불일치, 네트워크 지연, 서버 예외를 분류하고 필수값/형식/사용자-등록정보 매칭 검증을 보완했습니다.",
      result:
        "평균 인증 지연은 약 27% 개선됐고, 인증 오류 발생률은 약 30-40% 감소했습니다. 감으로 대응하는 방식이 아니라 재현, 분류, 검증, 지표 비교 흐름으로 문제를 다루는 경험이 됐습니다.",
    },
    metrics: [
      { label: "인증 지연", value: "-27%", caption: "평균 지연 개선" },
      { label: "오류율", value: "-30~40%", caption: "인증 오류 감소" },
      { label: "분류 기준", value: "4 types", caption: "오류 유형 정리" },
    ],
    codeNotes: [
      {
        title: "운영 로그 분류 관점",
        text: "코드 구현보다 운영 데이터 해석이 핵심이었기 때문에, 실패 케이스를 유형화하고 검증 기준을 강화하는 데 집중했습니다.",
        code: "input_quality | matching_mismatch | network_delay | server_exception",
      },
    ],
    detailImages: ["/projects/kepco-card.jpg"],
  },
  {
    eyebrow: "Rule-based System / Campus IT",
    title: "AI 기반 졸업요건 판정 시스템",
    summary:
      "성적표와 이수 내역을 기반으로 졸업요건 충족 여부를 자동 판정하는 규정 기반 시스템 경험입니다.",
    role: "데이터 매핑, 판정 로직, 예외 케이스 기준 자문",
    period: "2025.2",
    image: "/projects/graduation-card.jpg",
    metric: "규정 기반 판정 로직 설계",
    stack: ["Spring Boot", "API 설계", "JWT", "AWS", "CI/CD", "규정 기반 로직"],
    overview:
      "졸업요건 판정 시스템은 성적표와 이수 내역을 바탕으로 졸업요건 충족 여부를 자동 판단하는 규정 기반 서비스입니다. 저는 규정 데이터와 학생 이수 데이터가 어떻게 매핑되어야 하는지, 예외 케이스를 어떤 기준으로 설명해야 하는지에 집중했습니다.",
    decisions: {
      problem:
        "졸업요건은 전공, 교양, 필수 과목, 예외 인정 규칙이 섞여 있어 단순 합산으로 판정하기 어려웠습니다. 사용자에게 왜 미충족인지 설명하는 것도 중요했습니다.",
      consideration:
        "AI로 바로 판정하게 만들면 유연성은 있지만 근거가 불명확해질 수 있었습니다. 반대로 규정 기반 로직은 설계가 까다롭지만 결과를 설명하고 검증하기 쉽다는 장점이 있었습니다.",
      choice:
        "성적표/이수 내역을 정규화한 뒤 규정 테이블과 매핑하고, 부족 학점과 미충족 항목을 분리해 보여주는 방식을 채택했습니다. 예외 케이스는 학사정보시스템 개발팀과 협업하며 기준을 점검했습니다.",
      result:
        "복잡한 규정 기반 시스템에서 기준 정의, 검증 가능성, 설명가능성이 중요하다는 점을 경험했습니다. 이후 백엔드 API 설계에서도 결과뿐 아니라 근거를 함께 전달하는 구조를 더 신경 쓰게 됐습니다.",
    },
    metrics: [
      { label: "판정 방식", value: "Rule", caption: "규정 기반 로직" },
      { label: "입력 데이터", value: "PDF", caption: "성적표/이수 내역" },
      { label: "설명 기준", value: "Why", caption: "미충족 사유 분리" },
    ],
    codeNotes: [
      {
        title: "검증 가능한 판정 흐름",
        text: "학생 이수 내역을 바로 결과로 바꾸지 않고 validate, load_rules, compare 단계로 분리해 결과 근거를 남기는 구조가 핵심이었습니다.",
        code: "validate(transcript) -> load_rules(department) -> compare(completed, required)",
      },
    ],
    detailImages: [
      "/projects/graduation-ui-home.jpg",
      "/projects/graduation-detail.jpg",
      "/projects/graduation-architecture.jpg",
    ],
    links: [{ label: "GitHub", href: "https://github.com/CSID-DGU/2025-2-DES4015-Hangover-3" }],
  },
];

const planningProject = {
  title: "FLEXPACE",
  summary:
    "교회의 유휴공간과 2030 소모임 수요를 연결하는 공간 공유 플랫폼을 기획하고 Flutter 기반 프로토타입과 비즈니스 모델을 설계했습니다.",
  stack: ["Flutter", "서비스 기획", "경쟁사 분석", "사용자 흐름 설계", "비즈니스 모델"],
  problem: "교회 유휴공간과 2030 소모임 수요 사이의 미스매치",
  action: "사용자 흐름, 예약 화면, 수익 모델, 시장 진입 전략 설계",
  result: "기술 구현뿐 아니라 문제 정의, 타깃 사용자, 수익 모델까지 함께 보는 관점 확보",
};

const experiences = [
  {
    title: "KEPCO MCS / 한전 MCS 청년 일경험 프로젝트 인턴",
    period: "2025.07.22 - 2025.08.29",
    text: "생체정맥 디바이스 기반 어르신 스마트결제 시스템 안정화. 인증 실패와 지연을 로그 기반으로 분석했습니다.",
  },
  {
    title: "동국대학교 교내 국가근로",
    period: "IT Support",
    text: "컴퓨터 AS 접수 및 수리, 학내 IT 지원을 수행하며 사용자 문제를 기술적 원인과 조치 단위로 정리했습니다.",
  },
  {
    title: "서울시립영등포보현희망센터 거리상담원",
    period: "Field Communication",
    text: "현장 대응과 물품 배분을 맡으며 다양한 사용자와 명확하게 소통하는 경험을 쌓았습니다.",
  },
];

const leadershipActivities = [
  {
    title: "학과 학생회",
    period: "2021 - 2025",
    items: [
      "1학년 학과 대표",
      "학과 기획국원",
      "학과 선거운동본부장",
      "학과 홍보국장",
    ],
  },
  {
    title: "교육 / 대외 활동",
    period: "Bootcamp & Training",
    items: [
      "코멘토 SW개발 직무부트캠프",
      "Google Cloud Fundamentals: Core Infrastructure",
      "반도체 부트캠프",
      "FarmSystem 교내 학습 커뮤니티",
    ],
  },
  {
    title: "봉사 / 장학",
    period: "Community & Scholarship",
    items: [
      "야간 아웃리치 상담원",
      "리더장학",
      "인재육성장학 수석/우수",
      "서울 RISE 교육활동지원 장학",
    ],
  },
];

const coursework: CourseGroup[] = [
  {
    title: "Backend / CS Core",
    items: [
      { name: "자료구조와실습", grade: "A+" },
      { name: "컴퓨터알고리즘및실습", grade: "A+" },
      { name: "객체지향언어와실습", grade: "A+" },
      { name: "운영체제", grade: "A+" },
      { name: "데이터베이스체제", grade: "A+" },
    ],
  },
  {
    title: "Network / Infra",
    items: [
      { name: "컴퓨터네트워크", grade: "A+" },
      { name: "데이터통신", grade: "A+" },
      { name: "통신이론", grade: "A+" },
      { name: "컴퓨터구성", grade: "A+" },
    ],
  },
  {
    title: "Embedded / IoT",
    items: [
      { name: "임베디드소프트웨어와스마트모빌리티", grade: "A+" },
      { name: "스마트홈 IoT 플랫폼및특허분석", grade: "P" },
      { name: "디지털신호처리", grade: "A+" },
      { name: "신호와시스템", grade: "A+" },
    ],
  },
  {
    title: "Capstone / Product",
    items: [
      { name: "지산학캡스톤디자인2", grade: "P" },
      { name: "기술창업캡스톤디자인2", grade: "B+" },
      { name: "어드벤처디자인", grade: "A0" },
      { name: "커리어멘토링", grade: "P" },
    ],
  },
];

const certificates = [
  "네트워크관리사 2급",
  "리눅스마스터 2급",
  "SQLD",
  "AWS Certified AI Practitioner",
  "TOEIC Speaking IH 140",
  "TRIZ Level 1",
  "IPAT 4급",
];

const navItems = ["About", "Skills", "Projects", "Activities", "Experience", "Certificates", "Contact"];

function App() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Activities />
      <Experience />
      <Certificates />
      <Contact />
    </main>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="임호영 포트폴리오 홈">
        <span>임호영</span>
      </a>
      <nav aria-label="주요 섹션">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Backend · Server/Infra · Financial IT · AI Service Reliability</p>
        <h1>흐릿한 문제를 안정적인 시스템 구조로 바꾸는 개발자</h1>
        <p className="hero-name">임호영입니다.</p>
        <p className="hero-description">
          API 표준화, 데이터 정합성, 서버 모니터링, 인프라 운영, AI 파이프라인 검증을 통해 서비스 신뢰를 만드는
          개발자를 지향합니다.
        </p>
        <div className="hero-actions" aria-label="주요 링크">
          <a className="button primary" href={`mailto:${email}`}>
            <Mail aria-hidden="true" />
            이메일 보내기
          </a>
          <a className="button secondary" href="#projects">
            <Blocks aria-hidden="true" />
            프로젝트 보기
          </a>
          <a className="button secondary" href={velog} target="_blank" rel="noreferrer">
            <BookOpen aria-hidden="true" />
            Velog 보기
          </a>
          <a className="button ghost" href="/resume.pdf">
            <Download aria-hidden="true" />
            이력서 다운로드
          </a>
        </div>
      </div>
      <div className="reliability-panel" aria-label="핵심 성과와 문제 해결 흐름">
        <div className="panel-top">
          <span className="status-dot" />
          <span>Reliability Highlights</span>
          <Activity aria-hidden="true" />
        </div>
        <div className="hero-metric-grid">
          {metrics.map((metric) => (
            <article className="hero-metric-card" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <small>{metric.detail}</small>
            </article>
          ))}
        </div>
        <div className="solve-flow">
          <h2>How I Stabilize Services</h2>
          <ol>
            <li>
              <span>Observe</span>
              로그와 메트릭을 수집해 현상을 수치로 확인합니다.
            </li>
            <li>
              <span>Isolate</span>
              Spring, DB, MCP, AI Agent처럼 구간별 병목을 분리합니다.
            </li>
            <li>
              <span>Validate</span>
              API Contract, Schema, 정합성 기준으로 흔들리는 출력을 검증합니다.
            </li>
            <li>
              <span>Stabilize</span>
              개선 전후 지표를 비교해 안정화 효과를 확인합니다.
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <SectionHeading
        kicker="About"
        title="기능 구현 이후의 안정성까지 고민합니다."
        text="정보통신공학을 전공하며 서버/인프라, 백엔드, AI 연동 서비스 개발을 중심으로 경험을 쌓았습니다."
      />
      <div className="about-grid">
        <article className="about-text">
          <p>
            저는 단순히 기능을 구현하는 것보다, 서비스가 안정적으로 동작하도록 API 규격, 데이터 정합성, 예외
            처리, 로그, 모니터링 지표를 구조화하는 데 강점이 있습니다.
          </p>
          <p>
            금융 서비스처럼 정확성, 안정성, 실시간성이 중요한 환경에서 검증 가능한 구조를 만들고, 서버와 인프라
            운영 흐름까지 이해하는 개발자로 성장하고자 합니다.
          </p>
        </article>
        <div className="focus-grid">
          {focusCards.map((card) => (
            <article className="focus-card" key={card.title}>
              {card.icon}
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="metrics-grid">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <small>{metric.detail}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section" id="skills">
      <SectionHeading
        kicker="Skills"
        title="서버/인프라, 백엔드, AI 연동을 한 흐름으로 연결합니다."
        text="숙련도는 점수보다 경험 깊이가 보이도록 4단계 기준으로 표시했습니다."
      />
      <div className="skill-legend" aria-label="숙련도 기준">
        <span>
          <strong>주력</strong> 직접 설계하고 문제 해결 가능
        </span>
        <span>
          <strong>활용</strong> 프로젝트에서 안정적으로 사용
        </span>
        <span>
          <strong>경험</strong> 연동/운영 경험 보유
        </span>
        <span>
          <strong>학습</strong> 학습 및 실습 단계
        </span>
      </div>
      <div className="skill-grid">
        {stackGroups.map((group) => (
          <article className="skill-card" key={group.title}>
            <h3>{group.title}</h3>
            <div className="skill-meter-list">
              {group.items.map((item) => (
                <div className="skill-meter" key={item.name}>
                  <div className="skill-meter-top">
                    <span>{item.name}</span>
                    <small>{item.label}</small>
                  </div>
                  <div className="skill-steps" aria-label={`${item.name} 숙련도 ${item.level}단계`}>
                    {Array.from({ length: 5 }, (_, step) => (
                      <span className={step < item.level ? "filled" : ""} key={step} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

  return (
    <section className="section" id="projects">
      <SectionHeading
        kicker="Projects"
        title="대표 프로젝트를 먼저 가볍게 훑고, 필요한 내용만 깊게 볼 수 있게 정리했습니다."
        text="카드는 한 줄 요약과 핵심 지표만 보여주고, 클릭하면 문제·액션·성과와 시각 자료가 열립니다."
      />
      <div className="project-gallery">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index + 1} onOpen={setSelectedProject} />
        ))}
      </div>
      <article className="planning-card" id="project-planning">
        <img src="/projects/flexpace-card.jpg" alt="" />
        <div className="planning-copy">
          <p className="eyebrow">Planning Project</p>
          <h3>{planningProject.title}</h3>
          <p>{planningProject.summary}</p>
        </div>
        <div className="tag-list planning-tags">
          {planningProject.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </article>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}

function Activities() {
  return (
    <section className="section" id="activities">
      <SectionHeading
        kicker="Activities"
        title="학생회, 교육, 수강과목에서 협업과 CS 기반을 쌓았습니다."
        text="기술 프로젝트 외에도 학과 운영, 홍보, 기획, 교육 활동을 통해 커뮤니케이션과 실행 경험을 확장했습니다."
      />
      <div className="activity-grid">
        {leadershipActivities.map((activity) => (
          <article className="activity-card" key={activity.title}>
            <Users aria-hidden="true" />
            <small>{activity.period}</small>
            <h3>{activity.title}</h3>
            <ul>
              {activity.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="coursework-panel">
        <div>
          <p className="eyebrow">Coursework</p>
          <h3>직무와 연결되는 전공 수강과목</h3>
          <p className="course-gpa">총 평점 4.32 / 4.5</p>
        </div>
        <div className="course-grid">
          {coursework.map((group) => (
            <article className="course-card" key={group.title}>
              <h4>{group.title}</h4>
              <div className="tag-list">
                {group.items.map((item) => {
                  return (
                    <span className="course-tag" key={`${item.name}-${item.grade}`}>
                      {item.name}
                      <strong>{item.grade}</strong>
                    </span>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  return (
    <article className="project-card" id={`project-${index}`}>
      <button type="button" className="project-card-button" onClick={() => onOpen(project)}>
        <img src={project.image} alt="" />
        <div className="project-card-body">
          <div className="project-card-topline">
            <span>{String(index).padStart(2, "0")}</span>
            <small>{project.eyebrow}</small>
          </div>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <div className="project-card-meta">
            <span>{project.role}</span>
            <span>{project.period}</span>
          </div>
          <strong className="project-metric">{project.metric}</strong>
          <div className="tag-list">
            {project.stack.slice(0, 5).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </button>
    </article>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null;

  return (
    <div className="project-modal-backdrop" role="presentation" onClick={onClose}>
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="프로젝트 상세 닫기">
          ×
        </button>
        <div className="project-modal-hero">
          <img src={project.image} alt="" />
          <div>
            <p className="eyebrow">{project.eyebrow}</p>
            <h3 id="project-modal-title">{project.title}</h3>
            <p>{project.overview}</p>
            <div className="project-card-meta">
              <span>{project.role}</span>
              <span>{project.period}</span>
            </div>
            <strong className="project-metric">{project.metric}</strong>
          </div>
        </div>
        <div className="project-story">
          <p>
            <strong>문제 인식</strong>
            {project.decisions.problem}
          </p>
          <p>
            <strong>고민한 선택지</strong>
            {project.decisions.consideration}
          </p>
          <p>
            <strong>채택한 방식</strong>
            {project.decisions.choice}
          </p>
          <p>
            <strong>결과</strong>
            {project.decisions.result}
          </p>
        </div>
        <div className="metric-visual-grid" aria-label="프로젝트 핵심 수치">
          {project.metrics.map((metric) => (
            <article className="metric-visual" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.caption}</small>
              <div className="metric-bars" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </article>
          ))}
        </div>
        <section className="code-note-section">
          <h4>핵심 코드/구조 포인트</h4>
          <div className="code-note-grid">
            {project.codeNotes.map((note) => (
              <article className="code-note" key={note.title}>
                <h5>{note.title}</h5>
                <p>{note.text}</p>
                {note.code ? <pre>{note.code}</pre> : null}
              </article>
            ))}
          </div>
        </section>
        {project.detailImages ? (
          <div className="project-detail-media">
            {project.detailImages.map((image) => (
              <img src={image} alt="" key={image} />
            ))}
          </div>
        ) : null}
        <div className="project-modal-footer">
          <div className="tag-list">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          {project.links ? (
            <div className="project-links">
              {project.links.map((link) => (
                <a key={link.href} className="text-link" href={link.href} target="_blank" rel="noreferrer">
                  <GitBranch aria-hidden="true" />
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function ParBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="par-block">
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function Experience() {
  return (
    <section className="section" id="experience">
      <SectionHeading
        kicker="Experience"
        title="기술 문제와 사용자 현장을 함께 경험했습니다."
        text="운영 안정화, IT 지원, 현장 커뮤니케이션 경험은 문제를 실제 사용자 기준으로 보는 습관으로 이어졌습니다."
      />
      <div className="timeline">
        {experiences.map((item) => (
          <article className="timeline-item" key={item.title}>
            <span className="timeline-dot" />
            <div>
              <small>{item.period}</small>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Certificates() {
  return (
    <section className="section" id="certificates">
      <SectionHeading
        kicker="Certificates"
        title="운영과 데이터 기반을 보강하는 자격"
        text="네트워크, 리눅스, SQL, 클라우드 AI 기반 지식을 서버/인프라 운영 역량과 연결하고 있습니다."
      />
      <div className="cert-grid">
        {certificates.map((cert) => (
          <article className="cert-card" key={cert}>
            <Award aria-hidden="true" />
            <span>{cert}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>신뢰할 수 있는 서버/인프라와 서비스 구조를 만드는 일을 하고 싶습니다.</h2>
        <p>
          금융 IT, 서버/인프라, 백엔드, AI 연동 직무에서 정확성과 안정성이 중요한 서비스를 함께 만들고 싶습니다.
        </p>
      </div>
      <div className="contact-actions">
        <a className="button primary" href={`mailto:${email}`}>
          <Mail aria-hidden="true" />
          Email
        </a>
        <a className="button secondary" href={velog} target="_blank" rel="noreferrer">
          <BookOpen aria-hidden="true" />
          Velog
        </a>
        <a className="button ghost" href="/resume.pdf">
          <Download aria-hidden="true" />
          Resume PDF
        </a>
      </div>
    </section>
  );
}

function SectionHeading({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{kicker}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
