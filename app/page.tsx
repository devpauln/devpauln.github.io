'use client';

import {
  ArrowDown,
  ArrowUpRight,
  Blocks,
  Bot,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Cpu,
  Database,
  Download,
  ExternalLink,
  GraduationCap,
  GitBranch,
  Layers3,
  Lightbulb,
  Mail,
  MapPin,
  Network,
  Phone,
  Quote,
  Rocket,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const projectGroups = {
  modernization: [
    { number: '01', title: 'Miller Structures, reimagined', summary: 'Rebuilt a structural engineering platform with Angular and .NET Core, connecting time tracking, Power BI reporting, SharePoint, and automated workflows.', result: '75% less manual paperwork', tags: ['Angular', '.NET Core', 'Power BI'], icon: Workflow },
    { number: '02', title: 'Finance-grade data retention', summary: 'Led a microservice solution for financial statements and credit reporting, designed for integrity across an experimental OpenShift and Docker environment.', result: '30% fewer post-release bugs', tags: ['Microservices', 'Docker', 'OpenShift'], icon: Database },
    { number: '03', title: 'From FTP to a modern publishing flow', summary: 'Led a three-engineer team enhancing a European book publishing system while replacing fragile FTP transfers with a Git-based process.', result: 'Faster, traceable releases', tags: ['Git', 'Team leadership', 'Publishing'], icon: GitBranch },
  ],
  intelligence: [
    { number: '04', title: 'AI inside Microsoft Teams', summary: 'Integrated Azure Bot, OpenAI, and LUIS into a company chatbot for time tracking, automatic scheduling, and organization lookups.', result: 'Work happens where teams talk', tags: ['Azure AI', 'OpenAI', 'MS Teams'], icon: Bot },
    { number: '05', title: 'Language assessment at scale', summary: 'Took a language screening and certification platform from an initial concept to a complete product with speech-to-text scoring and international standards.', result: '180% higher user engagement', tags: ['Speech-to-text', '.NET', 'Education'], icon: Sparkles },
    { number: '06', title: 'Spider Platform Redesign', summary: 'Redesigned a legacy Python spider into a dependable ETL workflow for ATS and job sites, improving both accuracy and detail capture.', result: '75% accuracy gain · 100% detail capture', tags: ['ETL', 'Node.js', 'PHP'], icon: Network },
  ],
  platforms: [
    { number: '07', title: 'One desk for every social channel', summary: 'Engineered a centralized platform for scheduling, controlling, and managing multiple social networks and their operational workflows.', result: 'One source of control', tags: ['Angular', 'APIs', 'Scheduling'], icon: Layers3 },
    { number: '08', title: 'Infrastructure made observable', summary: 'Built support dashboards and deployment automation while leading the Philippine DevOps team across Elasticsearch, Logstash, and Kibana.', result: 'Clearer operations, faster support', tags: ['ELK', 'DevOps', 'Automation'], icon: ServerCog },
    { number: '09', title: 'Connected business operations', summary: 'Delivered internal ERP, asset management, student management, and reliability systems for education and heavy-equipment organizations.', result: 'Complex workflows, simplified', tags: ['ERP', 'Asset management', 'SQL'], icon: Blocks },
  ],
};

const roles = [
  { period: '2025 — Now', role: 'Software Engineering Consultant', company: 'ByDesign Technologies', place: 'Florida, US · Remote', note: 'Modern application development, rigorous code review, SQL nightly-operation optimization, and global Nuvei payment and tax-engine integrations.' },
  { period: '2025 — Now', role: 'Senior Software Engineer', company: 'Full Scale', place: 'Remote', note: 'Custom client development, internal timeclock collaboration, and rapid-response support across legacy and modern projects.' },
  { period: '2020 — 2025', role: 'Software Engineer · Contract / On-call', company: 'Added Innovation', place: 'Missouri, US · Remote', note: 'Angular/.NET modernization, Azure OpenAI chatbot integration, secure Azure AD workflows, SQL architecture, and CI/CD delivery.' },
  { period: '2024', role: 'Developer', company: 'University of Fredericton', place: 'New Brunswick, CA', note: 'SCORM storyboards and fluid, pixel-precise learning experiences.' },
  { period: '2023 — 2024', role: 'Senior Software Engineer · .NET', company: 'Kaczmarski Group', place: 'Poland · Remote', note: 'Finance microservices, .NET 7, data retention, test strategy, delivery leadership, and UI modernization.' },
  { period: '2016 — 2021', role: 'Senior Software Developer', company: 'CoDev Philippines', place: 'Cebu, PH', note: 'Greenfield language assessment software and major PHP, AngularJS, Laravel, and Microsoft-stack migrations.' },
  { period: '2015 — 2016', role: 'Software Engineer', company: 'Cloud Employee', place: 'Cebu, PH', note: 'Python/Django social intelligence and team leadership for publishing software.' },
  { period: '2012 — 2015', role: 'DevOps Engineer · Software Developer', company: 'JobTarget', place: 'Cebu, PH', note: 'Spidering and ETL redesign, ELK infrastructure, and ATS data integrations.' },
  { period: '2012', role: 'Systems Engineer', company: 'DirectAccess Corporation', place: 'Cebu, PH', note: 'Network continuity, BPO software support, internal tools, and on-site infrastructure.' },
  { period: '2011 — 2012', role: 'Software Development Intern', company: 'Asian College of Technology', place: 'Cebu, PH', note: 'Grading, enrollment, school website, and finance administration systems.' },
  { period: '2010 — 2012', role: 'Lead PHP/WordPress Developer · Freelance', company: 'Cyberknights Solutions Inc.', place: 'Cebu, PH', note: 'PSD-to-WordPress builds and leadership of a three-person CRM development team.' },
];

const skillGroups = [
  { title: 'Product engineering', icon: Code2, skills: ['C# / .NET Core', 'ASP.NET MVC', 'Angular', 'JavaScript / TypeScript', 'Node.js / Next.js', 'PHP', 'Python / Django', 'HTML / CSS'] },
  { title: 'Architecture & data', icon: Cpu, skills: ['Microservices', 'Monolithic systems', 'Entity Framework', 'Dapper', 'SQL', 'Azure Cosmos DB', 'Unit testing'] },
  { title: 'Cloud & delivery', icon: Rocket, skills: ['Microsoft Azure', 'Azure DevOps / Pipelines', 'Docker', 'CI/CD', 'TeamCity / Octopus', 'PowerShell / Bash', 'Git / SVN'] },
  { title: 'Intelligence & practice', icon: Bot, skills: ['Azure AI / Bot', 'Power BI', 'Agile Scrum', 'Jira', 'Technical leadership'] },
];

const publicBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function ProjectGrid({ projects }: { projects: typeof projectGroups.modernization }) {
  return (
    <div className="project-grid">
      {projects.map((project) => {
        const Icon = project.icon;
        return (
          <article className="project-card" key={project.number}>
            <div className="project-head"><span>{project.number}</span><Icon size={24} strokeWidth={1.6} /></div>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <div className="project-result"><Check size={15} /> {project.result}</div>
            <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </article>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const preferred = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(preferred);
    document.documentElement.classList.toggle('dark', preferred);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return (
    <main className="site-shell">
      <nav className="portfolio-nav" aria-label="Primary navigation">
        <a href="#top" className="brand" aria-label="Victor Paul Noel, home">VP<span>N</span></a>
        <div className="nav-links"><a href="#work">Work</a><a href="#experience">Experience</a><a href="#skills">Skills</a></div>
        <button className="bulb-switch" onClick={toggleTheme} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`} aria-pressed={dark}>
          <span className="bulb-glow" /><Lightbulb size={21} strokeWidth={1.8} /><span className="switch-tip">{dark ? 'Light' : 'Dark'}</span>
        </button>
      </nav>

      <section id="top" className="hero-section">
        <div className="eyebrow"><span /> Cebu City · Available worldwide</div>
        <h1>Engineering systems<br />that move <em>business.</em></h1>
        <p className="hero-copy">I&apos;m Victor, a software architect and senior engineer turning complex workflows and legacy systems into secure, scalable products.</p>
        <div className="hero-actions">
          <a className="primary-action" href="mailto:dev.vpauln@gmail.com"><Mail size={18} /> Start a conversation</a>
          <a className="text-action" href="#work">Explore my work <ArrowDown size={17} /></a>
        </div>
        <div className="impact-strip" aria-label="Career highlights">
          <div><strong>15+</strong><span>years building software</span></div>
          <div><strong>75%</strong><span>less manual paperwork</span></div>
          <div><strong>35%</strong><span>lower infrastructure cost</span></div>
          <a href="https://www.linkedin.com/in/vpnoel/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16} /></a>
        </div>
      </section>

      <section id="work" className="section-wrap work-section">
        <div className="section-intro">
          <div><span className="section-index">01</span><p className="section-kicker">Selected work</p></div>
          <h2>Useful systems.<br /><em>Measurable change.</em></h2>
          <p>I work where product thinking, architecture, and delivery meet—often modernizing the systems businesses rely on most.</p>
        </div>
        <Tabs defaultValue="modernization" className="project-tabs">
          <TabsList variant="line" aria-label="Project categories">
            <TabsTrigger value="modernization">Modernization</TabsTrigger>
            <TabsTrigger value="intelligence">AI & automation</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
          </TabsList>
          <TabsContent value="modernization"><ProjectGrid projects={projectGroups.modernization} /></TabsContent>
          <TabsContent value="intelligence"><ProjectGrid projects={projectGroups.intelligence} /></TabsContent>
          <TabsContent value="platforms"><ProjectGrid projects={projectGroups.platforms} /></TabsContent>
        </Tabs>
      </section>

      <section className="belief-section" aria-label="Engineering philosophy">
        <div className="belief-icon"><BriefcaseBusiness size={30} strokeWidth={1.4} /></div>
        <blockquote>“Good engineering makes complexity <em>feel simple</em>—for the people using it and the teams maintaining it.”</blockquote>
        <div className="belief-notes"><span>Business aligned</span><span>Secure by design</span><span>Built to evolve</span></div>
      </section>

      <section id="experience" className="section-wrap experience-section">
        <div className="section-intro compact">
          <div><span className="section-index">02</span><p className="section-kicker">Experience</p></div>
          <h2>A career built<br />across <em>the stack.</em></h2>
        </div>
        <div className="timeline">
          {roles.slice(0, 6).map((item, index) => (
            <article className="timeline-item" key={`${item.company}-${item.period}`}>
              <span className="timeline-number">{String(index + 1).padStart(2, '0')}</span>
              <p className="timeline-period">{item.period}</p>
              <div><h3>{item.role}</h3><p className="company">{item.company}</p><p className="role-note">{item.note}</p></div>
              <p className="place"><MapPin size={14} /> {item.place}</p>
            </article>
          ))}
          <details className="earlier-career">
            <summary>Earlier career · 2010—2016 <ChevronDown size={18} /></summary>
            <div>
              {roles.slice(6).map((item) => (
                <article className="early-role" key={`${item.company}-${item.period}`}>
                  <p className="timeline-period">{item.period}</p>
                  <div><h3>{item.role}</h3><p className="company">{item.company} · {item.place}</p><p className="role-note">{item.note}</p></div>
                </article>
              ))}
            </div>
          </details>
          <aside className="peer-signal">
            <Quote size={25} strokeWidth={1.4} />
            <p>Peer recommendations consistently highlight fast learning, calm problem-solving, and an ability to guide legacy platforms into modern stacks.</p>
            <a href="https://www.linkedin.com/in/vpnoel/details/recommendations/" target="_blank" rel="noreferrer">Read public recommendations <ArrowUpRight size={15} /></a>
          </aside>
        </div>
      </section>

      <section id="skills" className="section-wrap skills-section">
        <div className="section-intro compact">
          <div><span className="section-index">03</span><p className="section-kicker">Capabilities</p></div>
          <h2>Depth where it<br /><em>matters most.</em></h2>
          <p>Hands-on engineering experience from interface details to cloud operations, with architecture and team delivery tying it together.</p>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return <article className="skill-card" key={group.title}><div className="skill-title"><span>0{index + 1}</span><Icon size={22} strokeWidth={1.5} /></div><h3>{group.title}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>;
          })}
        </div>
        <div className="credentials" aria-label="Education and credentials">
          <article><GraduationCap size={24} strokeWidth={1.5} /><div><span>Education</span><h3>Bachelor&apos;s degree, Information Technology</h3><p>Asian College of Technology · 2008—2012</p></div></article>
          <article><GraduationCap size={24} strokeWidth={1.5} /><div><span>Foundation</span><h3>Information Technology studies</h3><p>University of San Jose-Recoletos · 2008—2009</p></div></article>
          <article><ShieldCheck size={24} strokeWidth={1.5} /><div><span>Selected credentials</span><h3>Maintainable automated testing · xUnit.net 2</h3><p>Pluralsight · Issued September 2022</p></div></article>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-orbit"><Lightbulb size={48} strokeWidth={1.3} /><span /></div>
        <p className="section-kicker">Have a difficult system to build or modernize?</p>
        <h2>Let&apos;s turn it into<br /><em>something clear.</em></h2>
        <div className="cta-actions">
          <a className="primary-action inverted" href="mailto:dev.vpauln@gmail.com"><Mail size={18} /> dev.vpauln@gmail.com</a>
          <a className="secondary-action" href={`${publicBase}/Victor-Paul-Noel-CV.pdf`} download><Download size={18} /> Download résumé</a>
        </div>
        <div className="contact-line"><a href="tel:+639682044710"><Phone size={15} /> +63 968 204 4710</a><a href="https://www.linkedin.com/in/vpnoel/" target="_blank" rel="noreferrer"><ExternalLink size={15} /> linkedin.com/in/vpnoel</a></div>
      </section>

      <footer><p>© {new Date().getFullYear()} Victor Paul Noel</p><p>Senior Software Engineer · Full-Stack Developer</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}

