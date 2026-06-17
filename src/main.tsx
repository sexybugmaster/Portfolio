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
  stack: string[];
  problem: string[];
  action: string[];
  result: string[];
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
  { value: "27%", label: "인증 지연 개선", detail: "KEPCO MCS" },
  { value: "30-40%", label: "인증 오류율 감소", detail: "로그 기반 분류" },
  { value: "99%+", label: "API 성공률 안정화", detail: "HiddenGrowth" },
  { value: "25%", label: "AI 추출 정확도 향상", detail: "Schema 검증" },
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
      { name: "AI 후처리 파이프라인", level: 4, label: "주력" },
      { name: "데이터 정합성 검증", level: 4, label: "주력" },
    ],
  },
];

const projects: Project[] = [
  {
    eyebrow: "Monitoring / Accessibility",
    title: "NUNCHI 키오스크 서버 모니터링 및 접근성 보조 입력",
    summary:
      "AI 키오스크 서비스의 지연 구간을 측정하고 Prometheus/Grafana 관측 체계와 OpenCV 눈 인식 보조 입력을 구축했습니다.",
    role: "서버/인프라 담당",
    stack: ["Spring Boot", "FastAPI", "PostgreSQL", "Redis", "Docker Compose", "AWS EC2", "Prometheus", "Grafana", "OpenCV"],
    problem: [
      "AI 주문 API 응답 지연이 발생했지만 Spring, DB, MCP, AI Agent 중 병목 구간이 불명확했습니다.",
      "손 사용이 어려운 사용자를 위한 키오스크 보조 입력 방식이 필요했습니다.",
    ],
    action: [
      "Spring Actuator, Prometheus, Grafana로 API 요청 수, 응답 시간, 5xx 에러율을 관측했습니다.",
      "FastAPI [AI_STEP], MCP [MCP_TOOL], Spring [AI_CALL] 로그를 기준으로 지연 구간을 분리했습니다.",
      "OpenCV/MediaPipe 기반 눈동자 방향과 더블 깜빡임 감지를 WebSocket으로 키오스크 화면과 연동했습니다.",
    ],
    result: [
      "MCP Tool 호출은 수십 ms 수준이고 LangGraph Agent 실행이 수 초-수십 초 병목임을 확인했습니다.",
      "운영 관측 체계를 만들고 YES/NO 접근성 보조 입력 PoC를 구현했습니다.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/CapstoneDgu" }],
  },
  {
    eyebrow: "AI Pipeline / API Contract",
    title: "HiddenGrowth",
    summary:
      "사용자 경험 텍스트를 분석해 핵심 스킬, 성장 포인트, 추천 직무, 포트폴리오를 자동 생성하는 AI 기반 성장 플랫폼입니다.",
    role: "팀 리더 / AI 개발 / 백엔드 연동",
    stack: ["Spring Boot", "FastAPI", "LangGraph", "OpenAI API", "MySQL", "Docker", "JSON Schema", "Pydantic"],
    problem: [
      "AI가 문맥과 무관한 스킬을 생성하거나 중복 스킬, 깨진 JSON 구조를 반환했습니다.",
      "FastAPI와 Spring Boot 간 요청/응답 스키마 충돌이 발생했습니다.",
    ],
    action: [
      "단일 프롬프트 대신 LangGraph 기반 추출, 검증, 정제, 최종화 구조로 파이프라인을 분리했습니다.",
      "JSON Schema/Pydantic 검증과 스킬 사전, 제외 규칙, 후처리 필터를 적용했습니다.",
      "API Contract를 정리해 요청/응답 규격을 표준화했습니다.",
    ],
    result: [
      "AI 스킬 추출 정확도 약 25%, 프롬프트/후처리 품질 약 30%를 개선했습니다.",
      "FastAPI-Spring 연동 API 성공률을 99% 이상으로 안정화했습니다.",
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
    stack: ["API 테스트", "로그 분석", "데이터 정합성 검증", "오류 유형 분류", "운영 지표 비교"],
    problem: [
      "생체정맥 인증 실패와 지연이 발생했지만 원인 유형과 검증 기준이 명확하지 않았습니다.",
      "운영 대응이 감에 의존하기 쉬운 상태였습니다.",
    ],
    action: [
      "오류 로그를 기준으로 입력 품질, 데이터 매칭 불일치, 네트워크 지연, 서버 예외 유형을 분류했습니다.",
      "필수값, 형식, 사용자-등록정보 매칭 검증 기준을 보완했습니다.",
      "개선 전후 인증 지연과 오류율 지표를 비교했습니다.",
    ],
    result: [
      "평균 인증 지연을 약 27% 개선했습니다.",
      "인증 오류 발생률을 약 30-40% 줄였습니다.",
    ],
  },
  {
    eyebrow: "Rule-based System / Campus IT",
    title: "AI 기반 졸업요건 판정 시스템",
    summary:
      "성적표와 이수 내역을 기반으로 졸업요건 충족 여부를 자동 판정하는 규정 기반 시스템 경험입니다.",
    role: "데이터 매핑, 판정 로직, 예외 케이스 기준 자문",
    stack: ["Spring Boot", "API 설계", "JWT", "AWS", "CI/CD", "규정 기반 로직"],
    problem: [
      "졸업요건 규정과 학생 이수 내역의 매핑이 복잡하고 예외 케이스가 많았습니다.",
      "판정 결과를 사용자가 이해할 수 있게 설명하는 기준이 필요했습니다.",
    ],
    action: [
      "성적표/이수 내역 기반 데이터 매핑 방식과 자동 판정 로직 기준을 정리했습니다.",
      "학사정보시스템 개발팀과 협업하며 예외 케이스 처리 기준을 자문했습니다.",
    ],
    result: [
      "복잡한 규정 기반 시스템에서 검증, 기준 정의, 설명가능성의 중요성을 경험했습니다.",
      "인증, 사용자 관리, 배포 흐름까지 고려한 서비스 구조를 학습했습니다.",
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
        <small>Backend Portfolio</small>
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
  return (
    <section className="section" id="projects">
      <SectionHeading
        kicker="Projects"
        title="Problem · Action · Result로 정리한 프로젝트"
        text="각 프로젝트는 문제를 어떻게 정의했고, 어떤 조치를 했으며, 어떤 결과를 만들었는지 바로 보이도록 구성했습니다."
      />
      <div className="project-index-grid" aria-label="프로젝트 바로가기">
        {projects.map((project, index) => (
          <a className="project-index-card" href={`#project-${index + 1}`} key={project.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <small>{project.eyebrow}</small>
            <strong>{project.title}</strong>
            <em>Problem · Action · Result</em>
          </a>
        ))}
        <a className="project-index-card planning" href="#project-planning">
          <span>05</span>
          <small>Planning Project</small>
          <strong>{planningProject.title}</strong>
          <em>기획 경험 보기</em>
        </a>
      </div>
      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index + 1} />
        ))}
      </div>
      <article className="planning-card" id="project-planning">
        <div>
          <p className="eyebrow">Planning Project</p>
          <h3>{planningProject.title}</h3>
          <p>{planningProject.summary}</p>
        </div>
        <div className="par-grid compact">
          <ParBlock title="Problem" items={[planningProject.problem]} />
          <ParBlock title="Action" items={[planningProject.action]} />
          <ParBlock title="Result" items={[planningProject.result]} />
        </div>
        <div className="tag-list planning-tags">
          {planningProject.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </article>
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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card" id={`project-${index}`}>
      <div className="project-index">{String(index).padStart(2, "0")}</div>
      <div className="project-main">
        <p className="eyebrow">{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="role-line">
          <BriefcaseBusiness aria-hidden="true" />
          {project.role}
        </div>
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
      <div className="par-grid">
        <ParBlock title="Problem" items={project.problem} />
        <ParBlock title="Action" items={project.action} />
        <ParBlock title="Result" items={project.result} />
      </div>
    </article>
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
