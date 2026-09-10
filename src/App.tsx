import { ArrowRight, ExternalLink, Github, Mail, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { usePortfolio } from './context/PortfolioContext'
import type { Project } from './types'
import AdminPage from './pages/AdminPage'

const nav = [
  ['About', '/about'],
  ['Projects', '/projects'],
  ['Experience', '/experience'],
  ['Gallery', '/gallery'],
  ['Awards', '/awards'],
  ['Contact', '/contact'],
]

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

function Header() {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <Link className="brand" to="/" onClick={() => setOpen(false)}><span>SW</span> Ssu-Wen Wang</Link>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
    <nav className={open ? 'nav open' : 'nav'}>
      {nav.map(([label, href]) => <NavLink key={href} to={href} onClick={() => setOpen(false)}>{label}</NavLink>)}
    </nav>
  </header>
}

function Footer() {
  const { site } = usePortfolio()
  return <footer><div><strong>Ssu-Wen Wang</strong><p>FinTech · Machine Learning · Applied Research</p></div><div className="footer-links"><a href={site.github} target="_blank"><Github size={18}/> GitHub</a><Link to="/contact"><Mail size={18}/> Contact</Link></div><span>© 2026</span></footer>
}

function Layout({ children }: { children: React.ReactNode }) {
  return <><ScrollTop/><Header/><main>{children}</main><Footer/></>
}

function ArrowLink({ to, children }: { to: string; children: React.ReactNode }) {
  return <Link className="arrow-link" to={to}>{children}<ArrowRight size={18}/></Link>
}

function Home() {
  const { projects, site } = usePortfolio()
  return <Layout>
    <section className="hero">
      <div className="hero-copy">
        <p className="kicker">Hello, I’m Mia — based in Taiwan.</p>
        <h1>Ideas in finance,<br/><em>built</em> with technology.</h1>
        <p className="hero-intro">{site.intro}</p>
        <div className="hero-actions"><ArrowLink to="/projects">Explore my work</ArrowLink><Link className="text-link" to="/about">More about me</Link></div>
      </div>
      <figure className="hero-portrait"><img src="./images/profile.jpeg" alt="Ssu-Wen Wang"/><figcaption><span>Management Science</span><span>Computer Science</span></figcaption></figure>
      <div className="hero-note">Curious about the space between a good model and a useful product.</div>
    </section>

    <section className="marquee" aria-label="Areas of interest"><div>FINTECH <i>•</i> MACHINE LEARNING <i>•</i> RESPONSIBLE AI <i>•</i> BLOCKCHAIN <i>•</i> APPLIED RESEARCH</div></section>

    <section className="section featured-section">
      <div className="section-heading"><p className="kicker">Selected work · 01</p><h2>From questions<br/>to working ideas.</h2><ArrowLink to="/projects">View all projects</ArrowLink></div>
      <div className="project-list">{projects.filter(p => p.featured).map((p, index) => <ProjectCard key={p.slug} project={p} index={index}/>)}</div>
    </section>

    <section className="section statement">
      <p className="kicker">What I bring · 02</p>
      <blockquote>I like work that needs both <span>analytical judgment</span> and the patience to turn an idea into something people can actually use.</blockquote>
      <div className="statement-grid"><div><b>Finance</b><p>Credit risk, corporate finance, investment, and real-world financial systems.</p></div><div><b>Technology</b><p>Machine learning, React, blockchain, data analysis, and product prototyping.</p></div><div><b>Leadership</b><p>Project direction, research framing, presentations, and collaborative execution.</p></div></div>
    </section>

    <section className="section home-award">
      <div><p className="kicker">Recent recognition · 03</p><h2>MicroChain</h2><p>Excellence Award, FinTech Division</p><ArrowLink to="/awards">See recognition</ArrowLink></div>
      <img src="./images/microchain-award.jpeg" alt="MicroChain Excellence Award"/>
    </section>
  </Layout>
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <Link to={`/projects/${project.slug}`} className="project-card">
    <div className="project-image"><img src={project.cover} alt=""/><span>0{index + 1}</span></div>
    <div className="project-meta"><p>{project.eyebrow}</p><h3>{project.title}</h3><p>{project.summary}</p><div className="tags">{project.tags.slice(0, 4).map(t => <span key={t}>{t}</span>)}</div></div>
    <ArrowRight className="project-arrow"/>
  </Link>
}

function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="page-intro"><p className="kicker">{eyebrow}</p><h1>{title}</h1><p>{text}</p></section>
}

function About() {
  const { skills } = usePortfolio()
  return <Layout><PageIntro eyebrow="About · 01" title="Business sense, technical curiosity." text="I’m Ssu-Wen — Mia to friends — a Management Science student building an interdisciplinary path across finance, computer science, and applied research."/>
    <section className="about-grid section"><img src="./images/profile.jpeg" alt="Ssu-Wen Wang"/><div className="about-copy"><h2>I care about what happens after the idea.</h2><p>My work often begins with a financial or organizational problem, then moves through data, models, product decisions, and implementation. I’m especially interested in responsible AI in finance, computational finance, and technology that makes complex decisions more transparent.</p><p>At National Yang Ming Chiao Tung University, I study Management Science while expanding my computer science training through cross-university coursework at National Chengchi University.</p><p>Outside class, I lead and develop fintech projects, help build student organizations, tutor high-school Chinese, and keep learning how to ask better research questions.</p><div className="location">Taipei → Hsinchu → Canada, one day.</div></div></section>
    <section className="section skills-section"><div><p className="kicker">Working toolkit · 02</p><h2>Skills grow around the questions I want to answer.</h2></div><div className="skill-cloud">{skills.map((s,i)=><span className={`skill s${i%4}`} key={s}>{s}</span>)}</div></section>
  </Layout>
}

function Projects() {
  const { projects } = usePortfolio()
  return <Layout><PageIntro eyebrow="Projects · 02" title="Work with a reason behind it." text="Selected projects across financial technology, machine learning, blockchain, and applied product development."/><section className="section all-projects">{projects.map((p,i)=><ProjectCard project={p} index={i} key={p.slug}/>)}</section></Layout>
}

function ProjectDetail() {
  const { projects } = usePortfolio()
  const { slug } = useParams(); const p = projects.find(x=>x.slug===slug)
  if (!p) return <Layout><PageIntro eyebrow="404" title="Project not found." text="This project may have moved."/></Layout>
  return <Layout>
    <section className="project-hero"><p className="kicker">{p.eyebrow} · {p.year}</p><h1>{p.title}</h1><p>{p.summary}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div></section>
    <section className="project-cover"><img src={p.cover} alt={p.title}/></section>
    {p.phases?.length&&<section className="section project-phases">
      <div className="phase-intro"><p className="kicker">Project evolution</p><h2>From proposal<br/>to a trained model.</h2><p>One project, developed through two distinct stages.</p></div>
      <div className="phase-list">{p.phases.map((phase, phaseIndex)=><article className="phase" key={phase.step}>
        <header><div><span>{phase.step}</span><p>{phase.subtitle}</p></div><h3>{phase.title}</h3></header>
        <div className={`phase-content ${phase.images.length===1?'single':''}`}>
          <div className="phase-copy"><p>{phase.description}</p><strong>{phase.outcome}</strong></div>
          <div className="phase-images">{phase.images.map((image,imageIndex)=><figure key={image.src}><img src={image.src} alt={image.alt}/><figcaption>0{phaseIndex+1}.{imageIndex+1}</figcaption></figure>)}</div>
        </div>
      </article>)}</div>
    </section>}
    <section className="section project-body">
      <aside><div><small>ROLE</small><p>{p.role}</p></div>{p.result&&<div><small>RECOGNITION</small><p>{p.result}</p></div>}{p.links?.map(l=><a href={l.url} target="_blank" key={l.url}>{l.label}<ExternalLink size={16}/></a>)}</aside>
      <article>{p.description.map((d,i)=><p key={i}>{d}</p>)}<h2>How the work fits together</h2><ol className="hierarchy">{p.hierarchy.map((h,i)=><li key={h}><span>0{i+1}</span>{h}</li>)}</ol></article>
    </section>
    {!p.phases?.length&&p.gallery.length>1&&<section className="section project-gallery">{p.gallery.map((img,i)=><img key={img} src={img} alt={`${p.title} project ${i+1}`}/>)}</section>}
  </Layout>
}

function Experience() {
  const { experiences } = usePortfolio()
  return <Layout><PageIntro eyebrow="Experience · 03" title="Learning by taking responsibility." text="Education, project leadership, competitions, and the communities where I turn plans into shared work."/><section className="section timeline">{experiences.map((e,i)=><article key={e.title}><span>0{i+1}</span><div><p className="kicker">{e.type}</p><h2>{e.title}</h2><b>{e.organization}</b><p>{e.description}</p></div><time>{e.period}</time></article>)}</section></Layout>
}

function Gallery() {
  const { gallery } = usePortfolio()
  const [filter,setFilter]=useState('All'); const categories=['All',...new Set(gallery.map(g=>g.category))]
  return <Layout><PageIntro eyebrow="Gallery · 04" title="The work, and the people around it." text="Moments from competitions, project presentations, teamwork, and milestones."/><section className="section"><div className="filters">{categories.map(c=><button className={filter===c?'active':''} onClick={()=>setFilter(c)} key={c}>{c}</button>)}</div><div className="gallery-grid">{gallery.filter(g=>filter==='All'||g.category===filter).map(g=><figure className={g.orientation} key={g.src}><img src={g.src} alt={g.alt}/><figcaption><span>{g.category}</span>{g.caption}</figcaption></figure>)}</div></section></Layout>
}

function Awards() {
  const { awards } = usePortfolio()
  return <Layout><PageIntro eyebrow="Awards · 05" title="Recognition for moving ideas forward." text="Selected competition results and project milestones."/><section className="section awards-list">{awards.map((a,i)=><article key={a.title}><span className="award-no">0{i+1}</span><div><p className="kicker">{a.date}</p><h2>{a.title}</h2><b>{a.issuer}</b><p>{a.description}</p></div>{a.image&&<img src={a.image} alt={a.title}/>}</article>)}</section></Layout>
}

function Contact() {
  const { site } = usePortfolio()
  return <Layout><section className="contact-page"><p className="kicker">Contact · 06</p><h1>Let’s build something<br/><em>worth explaining.</em></h1><p>I’m open to research opportunities, fintech collaborations, and conversations about turning analytical ideas into useful products.</p><div className="contact-links">{site.email&&<a href={`mailto:${site.email}`}><Mail/> {site.email}</a>}<a href={site.github} target="_blank"><Github/> github.com/swenwang</a></div><p className="contact-note">Taipei & Hsinchu, Taiwan · Open to international opportunities</p></section></Layout>
}

export default function App() {
  return <Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/projects" element={<Projects/>}/><Route path="/projects/:slug" element={<ProjectDetail/>}/><Route path="/experience" element={<Experience/>}/><Route path="/gallery" element={<Gallery/>}/><Route path="/awards" element={<Awards/>}/><Route path="/contact" element={<Contact/>}/><Route path="/admin" element={<AdminPage/>}/><Route path="*" element={<Home/>}/></Routes>
}
