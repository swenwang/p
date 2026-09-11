import {
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { usePortfolio } from "./context/PortfolioContext";
import type { Project } from "./types";
import AdminPage from "./pages/AdminPage";

type Language = "en" | "zh";
const LanguageContext = createContext({
  lang: "en" as Language,
  toggle: () => {},
});
const useLanguage = () => useContext(LanguageContext);

const nav = [
  ["About", "關於我", "/about"],
  ["Projects", "專案", "/projects"],
  ["Experience", "經歷", "/experience"],
  ["Gallery", "紀錄", "/gallery"],
  ["Awards", "獎項", "/awards"],
  ["Contact", "聯絡", "/contact"],
];

const projectZh: Record<string, any> = {
  "microchain-SME": {
    title: "MicroChain",
    eyebrow: "中小企業信用評分 → 區塊鏈融資",
    summary:
      "五人團隊提出中小企業替代資料信用評估方案，從 40+ 支隊伍中晉級 IDEA FinTech 八強，並延伸為獲獎的 MicroChain 原型。",
    role: "組長 · 簡報主講 · 財務風險分析規劃",
    result: "IDEA FinTech 八強 · 金融科技組優等獎",
    description: [
      "我擔任組長與主要簡報者，統整提案方向、規劃財務風險分析，並將物流、網購及發票資料納入可解釋的中小企業信用評估架構。",
      "我們選擇 LightGBM 處理商業特徵間的非線性關係，並使用 SHAP 說明各項因素如何影響個別信用分數。法遵設計則涵蓋資料同意、目的限制、模型透明度與人工覆核，避免替代資料直接決定融資結果。",
      "第二階段以模擬的中小企業資料集完成信用評分模型原型。目前成果定位為學術原型，而非可直接用於真實授信的正式系統。",
    ],
    hierarchy: [
      "金融科技",
      "信用風險評估",
      "中小企業信用評分",
      "LightGBM + SHAP",
      "替代資料 → MicroChain 原型",
    ],
    phases: [
      {
        title: "SME Chain 提案與八強",
        subtitle: "IDEA FinTech 2025",
        description:
          "五人團隊以物流、網購與發票資訊設計替代資料信用評估。我負責帶領專案、規劃財務風險分析並擔任簡報主講；LightGBM 用於表格資料建模，SHAP 用於解釋個別評分依據。",
        outcome: "從 40+ 支隊伍中晉級八強",
      },
      {
        title: "模型實作與獲獎",
        subtitle: "MicroChain",
        description:
          "我們將提案轉為可運作的原型，建立模擬中小企業資料集並訓練信用評分模型，作為 MicroChain 融資方案中的模型元件。",
        outcome: "金融科技組優等獎",
      },
    ],
  },
  "aws-generative-ai-hackathon": {
    title: "文資物品修復系統",
    eyebrow: "AWS 生成式 AI 黑客松",
    summary:
      "五人團隊建立文化資產應變原型，整合 15 類文物影像辨識、800+ 張分類圖片與 AWS PartyRock 修復諮詢流程。",
    role: "隊長 · 後端建置 · 系統串接 · 簡報主講",
    description: [
      "我擔任隊長，負責專案帶領、後端流程、系統串接與主要簡報。團隊從網路蒐集並分類 800+ 張圖片，涵蓋 15 類文化資產物品。",
      "系統利用 AWS 影像辨識服務辨識上傳物件，再將結果串接至 AWS PartyRock 的諮詢流程。由於目前尚未完整記錄訓練設定與資料切分，網站保守描述為影像辨識工作流程，不宣稱從零訓練模型。",
    ],
    hierarchy: [
      "人工智慧",
      "文化資產辨識",
      "文物修復諮詢",
      "AWS 影像辨識 + 生成式 AI",
      "800+ 張圖片 · 15 類 · Demo 工作流程",
    ],
  },
  "campus-token-dapp": {
    title: "校園點名獎勵雙代幣系統",
    eyebrow: "區塊鏈點名與獎勵",
    summary:
      "三人 Web3 課程專案：學生完成驗證點名後取得 AToken，並可透過鏈上兌換鑄造 BToken，作為未來串接校園商家的獎勵資產。",
    role: "系統架構整合 · 前端 DApp 開發",
    description: [
      "我統整老師操作流程、智慧合約、React DApp、MetaMask 與 Sepolia 的端到端架構，並透過 ethers.js 實作前端互動。學生通過點名驗證後取得 AToken；核准 AToken 後可透過兌換合約，在兌換當下鑄造 BToken。BToken 未來預計延伸至校園商家合作獎勵。",
    ],
    hierarchy: [
      "區塊鏈",
      "雙代幣獎勵系統",
      "課堂點名與校園獎勵",
      "ERC-20 + 數位簽章",
      "點名領取 → AToken 授權 → 兌換合約 → BToken 鑄造",
    ],
  },
};

const experienceZh: Record<string, [string, string, string, string]> = {
  "B.B.A. in Management Science": [
    "管理科學學士",
    "國立陽明交通大學",
    "跨足管理科學、金融、資料分析與資訊工程的跨域學習。",
    "學歷",
  ],
  "Cross-university Computer Science Study": [
    "資訊科學跨校雙主修",
    "國立政治大學",
    "透過跨校雙主修深化資訊科學、金融科技與軟體專案能力。",
    "學歷",
  ],
  "Project Development Officer": [
    "專案開發部幹部",
    "政大金融科技創新實驗室",
    "參與專案發展、組織制度，以及供其他部門使用的網站後台與資料庫架構。",
    "領導",
  ],
  "Interdisciplinary Artificial Intelligence Program": [
    "跨域人工智慧學程",
    "國立陽明交通大學",
    "正在修讀跨域人工智慧訓練，將機器學習與資料方法連結至金融及管理應用。",
    "學歷",
  ],
  "Team Lead & Proposal Lead": [
    "組長暨提案負責人",
    "IDEA FinTech 2025",
    "帶領替代資料中小企業信用評分提案，並延伸為獲獎的 MicroChain 原型。",
    "競賽",
  ],
};

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() =>
    localStorage.getItem("portfolio-language") === "zh" ? "zh" : "en",
  );
  const toggle = () =>
    setLang((current) => {
      const next = current === "en" ? "zh" : "en";
      localStorage.setItem("portfolio-language", next);
      document.documentElement.lang = next === "zh" ? "zh-Hant" : "en";
      return next;
    });
  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  }, [lang]);
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { site } = usePortfolio();
  const { lang, toggle } = useLanguage();
  return (
    <header className="site-header">
      <a className="brand" href="#/" onClick={() => setOpen(false)}>
        <span>SW</span> 王思問 · Ssu-Wen Wang
      </a>
      <button
        type="button"
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-label={lang === "zh" ? "開啟導覽選單" : "Toggle navigation"}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? "nav open" : "nav"}>
        {nav.map(([en, zh, href]) => (
          <a
            key={href}
            className={pathname === href ? "active" : ""}
            href={"#" + href}
            onClick={() => setOpen(false)}
          >
            {lang === "zh" ? zh : en}
          </a>
        ))}
        <button
          className="language-toggle"
          type="button"
          onClick={toggle}
          aria-label={lang === "zh" ? "Switch to English" : "切換成中文"}
        >
          {lang === "zh" ? "EN" : "中文"}
        </button>
        <a
          className="nav-github"
          href={site.github}
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpen(false)}
        >
          <Github size={16} /> GitHub
        </a>
      </nav>
    </header>
  );
}

function Footer() {
  const { site } = usePortfolio();
  const { lang } = useLanguage();
  return (
    <footer>
      <div>
        <strong>王思問 · Ssu-Wen Wang</strong>
        <p>FinTech · Machine Learning · Applied Research</p>
      </div>
      <div className="footer-links">
        <a href={site.github} target="_blank" rel="noreferrer">
          <Github size={18} /> GitHub
        </a>
        <a href="#/contact">
          <Mail size={18} /> {lang === "zh" ? "聯絡" : "Contact"}
        </a>
      </div>
      <span>© 2026</span>
    </footer>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <>
      <ScrollTop />
      <Header />
      <main key={pathname} className="page-slide">
        {children}
      </main>
      <Footer />
    </>
  );
}

function ArrowLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <a className="arrow-link" href={"#" + to}>
      {children}
      <ArrowRight size={18} />
    </a>
  );
}

function Home() {
  const { projects, site } = usePortfolio();
  const { lang } = useLanguage();
  return (
    <Layout>
      <section className="hero">
        <div className="hero-copy">
          <p className="kicker">
            {lang === "zh"
              ? "你好，我是王思問（Mia）。"
              : "Hello, I’m Ssu-Wen (Mia) — 王思問."}
          </p>
          <h1>
            {lang === "zh" ? (
              <>
                從商業問題出發，
                <br />
                <em>打造</em>更好的金融系統。
              </>
            ) : (
              <>
                Management insight,
                <br />
                <em>engineered</em> for finance.
              </>
            )}
          </h1>
          <p className="hero-intro">
            {lang === "zh"
              ? "我是管理科學系學生，並於政治大學跨校雙主修資訊科學。我的作品結合金融判斷、機器學習、區塊鏈與系統設計，讓決策和流程更透明、更能真正落地。"
              : site.intro}
          </p>
          <div className="hero-actions">
            <ArrowLink to="/projects">
              {lang === "zh" ? "查看專案" : "Explore my work"}
            </ArrowLink>
            <a className="text-link" href="#/about">
              {lang === "zh" ? "認識我" : "More about me"}
            </a>
          </div>
        </div>
        <figure className="hero-portrait">
          <img src="./images/profile.jpeg" alt="王思問 Ssu-Wen Wang" />
          <figcaption>
            <span>{lang === "zh" ? "管理科學" : "Management Science"}</span>
            <span>{lang === "zh" ? "資訊科學" : "Computer Science"}</span>
          </figcaption>
        </figure>
        <div className="hero-note">
          {lang === "zh"
            ? "我關心的不只是好模型，而是如何把它變成真正能使用的系統。"
            : "I care about the space between a good model and a useful system."}
        </div>
      </section>

      <section
        className="impact-strip"
        aria-label={lang === "zh" ? "成果數字" : "Selected metrics"}
      >
        {site.stats.map((stat: { value: string; label: string }, i: number) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>
              {lang === "zh"
                ? [
                    "競賽與黑客松",
                    "晉級 + 獲獎",
                    "AI 分類圖片",
                    "最大帶領團隊",
                    "活動參與者",
                    "分析交易資料",
                  ][i]
                : stat.label}
            </span>
          </div>
        ))}
      </section>

      <section className="marquee" aria-label="Areas of interest">
        <div>
          FINTECH <i>•</i> MACHINE LEARNING <i>•</i> RESPONSIBLE AI <i>•</i>{" "}
          BLOCKCHAIN <i>•</i> APPLIED RESEARCH
        </div>
      </section>
      <section className="section featured-section">
        <div className="section-heading">
          <p className="kicker">
            {lang === "zh" ? "精選作品 · 01" : "Selected work · 01"}
          </p>
          <h2>
            {lang === "zh" ? (
              <>
                從問題出發，
                <br />
                做到可以運作。
              </>
            ) : (
              <>
                From questions
                <br />
                to working systems.
              </>
            )}
          </h2>
          <ArrowLink to="/projects">
            {lang === "zh" ? "全部專案" : "View all projects"}
          </ArrowLink>
        </div>
        <div className="project-list">
          {projects
            .filter((p) => p.featured)
            .map((p, index) => (
              <ProjectCard key={p.slug} project={p} index={index} />
            ))}
        </div>
      </section>
      <section className="section statement">
        <p className="kicker">
          {lang === "zh" ? "我的價值 · 02" : "What I bring · 02"}
        </p>
        <blockquote>
          {lang === "zh" ? (
            <>
              我擅長同時運用<span>分析判斷</span>
              、系統思考與執行力，把概念推進到可驗證的成果。
            </>
          ) : (
            <>
              I combine <span>analytical judgment</span>, systems thinking, and
              ownership to move ideas toward evidence.
            </>
          )}
        </blockquote>
        <div className="statement-grid">
          <div>
            <b>{lang === "zh" ? "商業判斷" : "Business judgment"}</b>
            <p>
              {lang === "zh"
                ? "理解信用風險、公司理財、投資與組織問題。"
                : "Credit risk, corporate finance, investment, and organizational context."}
            </p>
          </div>
          <div>
            <b>{lang === "zh" ? "技術實作" : "Technical execution"}</b>
            <p>
              {lang === "zh"
                ? "運用機器學習、React、區塊鏈與資料分析建立原型。"
                : "Machine learning, React, blockchain, data analysis, and prototyping."}
            </p>
          </div>
          <div>
            <b>{lang === "zh" ? "專案領導" : "Project ownership"}</b>
            <p>
              {lang === "zh"
                ? "統整研究問題、系統架構、團隊協作與簡報溝通。"
                : "Research framing, system architecture, team coordination, and presentation."}
            </p>
          </div>
        </div>
      </section>
      <section className="section home-award">
        <div>
          <p className="kicker">
            {lang === "zh" ? "近期成果 · 03" : "Recent recognition · 03"}
          </p>
          <h2>MicroChain</h2>
          <p>
            {lang === "zh"
              ? "金融科技組優等獎"
              : "Excellence Award, FinTech Division"}
          </p>
          <ArrowLink to="/awards">
            {lang === "zh" ? "查看獎項" : "See recognition"}
          </ArrowLink>
        </div>
        <img
          src="./images/microchain-award.jpeg"
          alt="MicroChain Excellence Award"
        />
      </section>
    </Layout>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { lang } = useLanguage();
  const z = projectZh[project.slug];
  const title = lang === "zh" && z ? z.title : project.title;
  return (
    <a href={"#/projects/" + project.slug} className="project-card">
      <div
        className={
          "project-image " + (project.cover ? "" : "project-image-placeholder")
        }
      >
        {project.cover ? (
          <img src={project.cover} alt="" />
        ) : (
          <div
            className="project-placeholder"
            aria-label={title + " image coming soon"}
          >
            <b>CT</b>
            <small>{lang === "zh" ? "圖片待補" : "Image coming soon"}</small>
          </div>
        )}
        <span>0{index + 1}</span>
      </div>
      <div className="project-meta">
        <p>{lang === "zh" && z ? z.eyebrow : project.eyebrow}</p>
        <h3>{title}</h3>
        <p>{lang === "zh" && z ? z.summary : project.summary}</p>
        <div className="tags">
          {project.tags.slice(0, 4).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <ArrowRight className="project-arrow" />
    </a>
  );
}

function PageIntro({
  eyebrow,
  title,
  text,
  zhTitle,
  zhText,
}: {
  eyebrow: string;
  title: string;
  text: string;
  zhTitle?: string;
  zhText?: string;
}) {
  const { lang } = useLanguage();
  return (
    <section className="page-intro">
      <p className="kicker">{eyebrow}</p>
      <h1>{lang === "zh" && zhTitle ? zhTitle : title}</h1>
      <p>{lang === "zh" && zhText ? zhText : text}</p>
    </section>
  );
}

function About() {
  const { skills, site } = usePortfolio();
  const { lang } = useLanguage();
  return (
    <Layout>
      <PageIntro
        eyebrow={lang === "zh" ? "關於我 · 01" : "About · 01"}
        title="Business sense, technical curiosity."
        zhTitle="懂商業，也願意把技術做到底。"
        text="I’m 王思問 — Ssu-Wen, or Mia to friends — a Management Science student pursuing a cross-university double major in Computer Science."
        zhText="我是王思問，也可以叫我 Mia。我就讀陽明交大管理科學系，並於政治大學跨校雙主修資訊科學。"
      />
      <section className="about-grid section">
        <img src="./images/profile.jpeg" alt="王思問 Ssu-Wen Wang" />
        <div className="about-copy">
          <h2>
            {lang === "zh"
              ? "我關心的是：想法之後，怎麼真正做出來。"
              : "I care about what happens after the idea."}
          </h2>
          <p>
            {lang === "zh"
              ? "我從管理科學延伸到資訊工程，是因為我不只想分析商業問題，也想親自建立、測試並改善解決方案。金融科技吸引我的地方，正是金融判斷與技術實作必須同時成立。"
              : "I extended my Management Science training into Computer Science because I want to do more than analyze business problems: I want to build, test, and improve the systems that address them. FinTech interests me because financial judgment and technical implementation have to work together."}
          </p>
          <p>
            {lang === "zh"
              ? "我特別關注可解釋的信用風險、資料驅動的金融決策，以及能降低流程摩擦的系統。相較純技術背景，我能從商業目的、風險與利害關係人理解問題；相較純商管背景，我能把想法轉成模型、流程與可操作原型。"
              : "I am especially interested in explainable credit risk, data-driven financial decisions, and systems that reduce process friction. I bring business purpose, risk, and stakeholder context into technical work—and can turn business ideas into models, workflows, and usable prototypes."}
          </p>
          <div className="trait-list">
            <span>{lang === "zh" ? "分析判斷" : "Analytical judgment"}</span>
            <span>{lang === "zh" ? "系統思考" : "Systems thinking"}</span>
            <span>{lang === "zh" ? "主動承擔" : "Ownership"}</span>
          </div>
        </div>
      </section>
      <section className="section academic-section">
        <div>
          <p className="kicker">
            {lang === "zh" ? "學術背景 · 02" : "Academic profile · 02"}
          </p>
          <h2>
            {lang === "zh"
              ? "管理科學 × 資訊科學"
              : "Management Science × Computer Science"}
          </h2>
        </div>
        <div className="academic-grid">
          <article>
            <small>{lang === "zh" ? "學位" : "DEGREE"}</small>
            <strong>{site.academics.degree}</strong>
            <p>{site.academics.period}</p>
          </article>
          <article>
            <small>{lang === "zh" ? "跨校雙主修" : "SECOND MAJOR"}</small>
            <strong>{site.academics.secondMajor}</strong>
            <p>National Chengchi University</p>
          </article>
          <article>
            <small>GPA</small>
            <strong>{site.academics.gpa}</strong>
            <p>{lang === "zh" ? "截至 114-2 學期" : site.academics.gpaAsOf}</p>
          </article>
          <article>
            <small>ENGLISH</small>
            <strong>{site.academics.toeic}</strong>
          </article>
        </div>
        <div className="coursework">
          <small>{lang === "zh" ? "相關修課" : "RELEVANT COURSEWORK"}</small>
          <div className="tags">
            {site.academics.coursework.map((course: string) => (
              <span key={course}>{course}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="section skills-section">
        <div>
          <p className="kicker">
            {lang === "zh" ? "工具與能力 · 03" : "Working toolkit · 03"}
          </p>
          <h2>
            {lang === "zh"
              ? "工具服務於問題，不只是關鍵字。"
              : "Tools grow around the questions I want to answer."}
          </h2>
        </div>
        <div className="skill-cloud">
          {skills.map((s, i) => (
            <span className={"skill s" + (i % 4)} key={s}>
              {s}
            </span>
          ))}
        </div>
      </section>
    </Layout>
  );
}

function Projects() {
  const { projects } = usePortfolio();
  const { lang } = useLanguage();
  return (
    <Layout>
      <PageIntro
        eyebrow={lang === "zh" ? "專案 · 02" : "Projects · 02"}
        title="Work with a reason behind it."
        zhTitle="每個作品，都從一個真實問題開始。"
        text="Selected projects across financial technology, machine learning, blockchain, and applied product development."
        zhText="聚焦金融科技、機器學習、區塊鏈與系統實作的精選專案。"
      />
      <section className="section all-projects">
        {projects.map((p, i) => (
          <ProjectCard project={p} index={i} key={p.slug} />
        ))}
      </section>
    </Layout>
  );
}

function ProjectDetail() {
  const { projects } = usePortfolio();
  const { lang } = useLanguage();
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  const z = p ? projectZh[p.slug] : null;
  if (!p)
    return (
      <Layout>
        <PageIntro
          eyebrow="404"
          title="Project not found."
          zhTitle="找不到專案"
          text="This project may have moved."
          zhText="這個專案可能已移動。"
        />
      </Layout>
    );
  return (
    <Layout>
      <section className="project-hero">
        <p className="kicker">
          {lang === "zh" && z ? z.eyebrow : p.eyebrow} · {p.year}
        </p>
        <h1>{lang === "zh" && z ? z.title : p.title}</h1>
        <p>{lang === "zh" && z ? z.summary : p.summary}</p>
        <div className="tags">
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </section>
      {p.cover && (
        <section className="project-cover">
          <img src={p.cover} alt={lang === "zh" && z ? z.title : p.title} />
        </section>
      )}
      {p.phases?.length && (
        <section className="section project-phases">
          <div className="phase-intro">
            <p className="kicker">
              {lang === "zh" ? "專案演進" : "Project evolution"}
            </p>
            <h2>
              {lang === "zh" ? (
                <>
                  從提案
                  <br />
                  走到模型實作。
                </>
              ) : (
                <>
                  From proposal
                  <br />
                  to implementation.
                </>
              )}
            </h2>
            <p>
              {lang === "zh"
                ? "同一個問題，經過兩個清楚階段逐步落地。"
                : "One project, developed through two distinct stages."}
            </p>
          </div>
          <div className="phase-list">
            {p.phases.map((phase, phaseIndex) => {
              const zp = z?.phases?.[phaseIndex];
              return (
                <article className="phase" key={phase.step}>
                  <header>
                    <div>
                      <span>{phase.step}</span>
                      <p>
                        {lang === "zh" && zp ? zp.subtitle : phase.subtitle}
                      </p>
                    </div>
                    <h3>{lang === "zh" && zp ? zp.title : phase.title}</h3>
                  </header>
                  <div
                    className={
                      "phase-content " +
                      (phase.images.length === 1 ? "single" : "")
                    }
                  >
                    <div className="phase-copy">
                      <p>
                        {lang === "zh" && zp
                          ? zp.description
                          : phase.description}
                      </p>
                      <strong>
                        {lang === "zh" && zp ? zp.outcome : phase.outcome}
                      </strong>
                    </div>
                    <div className="phase-images">
                      {phase.images.map((image, imageIndex) => (
                        <figure key={image.src}>
                          <img src={image.src} alt={image.alt} />
                          <figcaption>
                            0{phaseIndex + 1}.{imageIndex + 1}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
      <section className="section project-body">
        <aside>
          <div>
            <small>{lang === "zh" ? "我的角色" : "ROLE"}</small>
            <p>{lang === "zh" && z ? z.role : p.role}</p>
          </div>
          {p.result && (
            <div>
              <small>{lang === "zh" ? "成果" : "RECOGNITION"}</small>
              <p>{lang === "zh" && z?.result ? z.result : p.result}</p>
            </div>
          )}
          {p.links?.map((l, i) => (
            <a href={l.url} target="_blank" rel="noreferrer" key={l.url}>
              {lang === "zh"
                ? i === 0
                  ? l.url.includes("youtu")
                    ? "觀看 Demo"
                    : l.url.includes("drive")
                      ? "查看提案簡報"
                      : "查看 GitHub"
                  : "查看簡報"
                : l.label}
              <ExternalLink size={16} />
            </a>
          ))}
        </aside>
        <article>
          {(lang === "zh" && z ? z.description : p.description).map(
            (d: string, i: number) => (
              <p key={i}>{d}</p>
            ),
          )}
          <h2>
            {lang === "zh"
              ? "領域 → 任務 → 應用 → 方法 → 實作"
              : "Domain → Task → Application → Method → Implementation"}
          </h2>
          <ol className="hierarchy">
            {(lang === "zh" && z ? z.hierarchy : p.hierarchy).map(
              (h: string, i: number) => (
                <li key={h}>
                  <span>0{i + 1}</span>
                  {h}
                </li>
              ),
            )}
          </ol>
        </article>
      </section>
      {!p.phases?.length && p.gallery.length > 1 && (
        <section className="section project-gallery">
          {p.gallery.map((img, i) => (
            <img
              key={img}
              src={img}
              alt={
                (lang === "zh" && z ? z.title : p.title) + " project " + (i + 1)
              }
            />
          ))}
        </section>
      )}
    </Layout>
  );
}

function Experience() {
  const { experiences } = usePortfolio();
  const { lang } = useLanguage();
  return (
    <Layout>
      <PageIntro
        eyebrow={lang === "zh" ? "經歷 · 03" : "Experience · 03"}
        title="Learning by taking responsibility."
        zhTitle="在承擔責任的過程中成長。"
        text="Education, project leadership, competitions, and the communities where I turn plans into shared work."
        zhText="我的學習、專案領導、競賽，以及把計畫轉化成團隊成果的經歷。"
      />
      <section className="section timeline">
        {experiences.map((e, i) => {
          const z = experienceZh[e.title];
          return (
            <article key={e.title}>
              <span>0{i + 1}</span>
              <div>
                <p className="kicker">{lang === "zh" && z ? z[3] : e.type}</p>
                <h2>{lang === "zh" && z ? z[0] : e.title}</h2>
                <b>{lang === "zh" && z ? z[1] : e.organization}</b>
                <p>{lang === "zh" && z ? z[2] : e.description}</p>
              </div>
              <div className="experience-side">
                <time>{e.period}</time>
                {e.logo && (
                  <img
                    className="experience-logo"
                    src={e.logo}
                    alt={e.logoAlt || e.organization + " logo"}
                  />
                )}
              </div>
            </article>
          );
        })}
      </section>
    </Layout>
  );
}

function Gallery() {
  const { gallery } = usePortfolio();
  const { lang } = useLanguage();
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(gallery.map((g) => g.category))];
  const categoryName = (c: string) =>
    lang === "zh"
      ? (
          {
            All: "全部",
            Competitions: "競賽",
            Projects: "專案",
            Awards: "獎項",
          } as Record<string, string>
        )[c] || c
      : c;
  return (
    <Layout>
      <PageIntro
        eyebrow={lang === "zh" ? "紀錄 · 04" : "Gallery · 04"}
        title="The work, and the people around it."
        zhTitle="成果，也來自一起完成它的人。"
        text="Moments from competitions, project presentations, teamwork, and milestones."
        zhText="競賽、專案簡報、團隊合作與里程碑的紀錄。"
      />
      <section className="section">
        <div className="filters">
          {categories.map((c) => (
            <button
              className={filter === c ? "active" : ""}
              onClick={() => setFilter(c)}
              key={c}
            >
              {categoryName(c)}
            </button>
          ))}
        </div>
        <div className="gallery-grid">
          {gallery
            .filter((g) => filter === "All" || g.category === filter)
            .map((g) => (
              <figure className={g.orientation} key={g.src}>
                <img src={g.src} alt={g.alt} />
                <figcaption>
                  <span>{categoryName(g.category)}</span>
                  {g.caption}
                </figcaption>
              </figure>
            ))}
        </div>
      </section>
    </Layout>
  );
}

function Awards() {
  const { awards } = usePortfolio();
  const { lang } = useLanguage();
  return (
    <Layout>
      <PageIntro
        eyebrow={lang === "zh" ? "獎項 · 05" : "Awards · 05"}
        title="Recognition for moving ideas forward."
        zhTitle="讓想法往前走所獲得的肯定。"
        text="Selected competition results and project milestones."
        zhText="精選競賽成果與專案里程碑。"
      />
      <section className="section awards-list">
        {awards.map((a, i) => (
          <article key={a.title}>
            <span className="award-no">0{i + 1}</span>
            <div>
              <p className="kicker">{a.date}</p>
              <h2>
                {lang === "zh"
                  ? i === 0
                    ? "金融科技組優等獎"
                    : "八強入選"
                  : a.title}
              </h2>
              <b>{a.issuer}</b>
              <p>
                {lang === "zh"
                  ? i === 0
                    ? "MicroChain 微型企業區塊鏈融資專案獲獎。"
                    : "以替代資料、LightGBM、SHAP 與法遵設計提出中小企業信用評估方案。"
                  : a.description}
              </p>
            </div>
            {a.image && <img src={a.image} alt={a.title} />}
          </article>
        ))}
      </section>
    </Layout>
  );
}

function Contact() {
  const { site } = usePortfolio();
  const { lang } = useLanguage();
  return (
    <Layout>
      <section className="contact-page">
        <p className="kicker">{lang === "zh" ? "聯絡 · 06" : "Contact · 06"}</p>
        <h1>
          {lang === "zh" ? (
            <>
              一起把值得研究的問題，
              <br />
              <em>做成能使用的成果。</em>
            </>
          ) : (
            <>
              Let’s build something
              <br />
              <em>worth explaining.</em>
            </>
          )}
        </h1>
        <p>
          {lang === "zh"
            ? "我期待研究機會、金融科技合作，以及關於如何把分析想法轉成實用系統的交流。"
            : "I’m open to research opportunities, fintech collaborations, and conversations about turning analytical ideas into useful systems."}
        </p>
        <div className="contact-links">
          {site.email && (
            <a href={"mailto:" + site.email}>
              <Mail /> {site.email}
            </a>
          )}
          <a href={site.github} target="_blank" rel="noreferrer">
            <Github /> github.com/swenwang
          </a>
          {site.linkedin && (
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              <Linkedin /> LinkedIn
            </a>
          )}
        </div>
        <p className="contact-note">
          Taipei & Hsinchu, Taiwan ·{" "}
          {lang === "zh"
            ? "歡迎研究與國際合作機會"
            : "Open to research and international opportunities"}
        </p>
      </section>
    </Layout>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </LanguageProvider>
  );
}
