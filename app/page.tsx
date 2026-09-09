'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Download, Lightbulb, Mail, MapPin, Check, ChevronRight, Pause, Play } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AmbientBackdrop } from './ambient-backdrop';
import { projects, projectStories, roles } from './content';
import { consumeWheel } from '@/lib/wheel-navigation.mjs';

const sections = ['Overview', 'Experience', 'Projects', 'Technology', 'Contact'] as const;
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const technologies = {
  csharp: 'C#', dotnetcore: '.NET Core', angular: 'Angular', react: 'React',
  microsoftsqlserver: 'Microsoft SQL Server', claude: 'Claude Code', openai: 'ChatGPT',
  azure: 'Microsoft Azure', docker: 'Docker', typescript: 'TypeScript',
  javascript: 'JavaScript', nodejs: 'Node.js', python: 'Python', php: 'PHP',
  git: 'Git', azuredevops: 'Azure DevOps', html5: 'HTML5', css3: 'CSS3',
  django: 'Django', nextjs: 'Next.js', powershell: 'PowerShell',
};
type Tech = keyof typeof technologies;
const core: Tech[] = ['csharp', 'dotnetcore', 'angular', 'react', 'microsoftsqlserver', 'claude', 'openai', 'azure', 'docker'];
const stacks: { title: string; description: string; icons: Tech[] }[] = [
  { title: 'Product development', description: 'Web interfaces, APIs, and full-stack applications.', icons: ['csharp', 'dotnetcore', 'angular', 'react', 'typescript', 'javascript', 'html5', 'css3', 'nextjs'] },
  { title: 'Backend & data', description: 'Business logic, integrations, and reliable data systems.', icons: ['microsoftsqlserver', 'nodejs', 'python', 'django', 'php', 'dotnetcore'] },
  { title: 'Cloud & delivery', description: 'Cloud infrastructure, containers, and automated releases.', icons: ['azure', 'docker', 'azuredevops', 'git', 'powershell'] },
  { title: 'AI-assisted development', description: 'Claude Code and ChatGPT in the development workflow; Azure AI for product integrations.', icons: ['claude', 'openai', 'azure'] },
];
const projectTech: Tech[][] = [
  ['angular','dotnetcore','azure','microsoftsqlserver'], ['azure','openai'],
  ['dotnetcore','microsoftsqlserver'], ['python','nodejs','php'], ['dotnetcore','docker','microsoftsqlserver'],
  ['angular','typescript'], ['git'], [], ['microsoftsqlserver'],
  ['microsoftsqlserver'], [],
];

function TechIcon({ name }: { name: Tech }) {
  const [show, setShow] = useState(false);
  return <button className="tech-icon" type="button" aria-label={technologies[name]} aria-pressed={show}
    onClick={() => setShow(!show)} onBlur={() => setShow(false)}>
    <img src={base + '/tech/' + name + '.svg'} alt="" width="30" height="30" draggable={false} />
    <span className={show ? 'icon-label shown' : 'icon-label'}>{technologies[name]}</span>
  </button>;
}
function TechIcons({ names }: { names: readonly Tech[] }) {
  return <div className="icon-row">{names.map(name => <TechIcon name={name} key={name} />)}</div>;
}
function Pager({ index, total, onChange, label }: { index: number; total: number; onChange: (value: number) => void; label: string }) {
  return <div className="pager" aria-label={label + ' navigation'}>
    <button type="button" onClick={() => onChange(index - 1)} disabled={index === 0} aria-label={'Previous ' + label}><ArrowLeft size={18} /></button>
    <span aria-live="polite">{String(index + 1).padStart(2, '0')} <i>/ {String(total).padStart(2, '0')}</i></span>
    <button type="button" onClick={() => onChange(index + 1)} disabled={index === total - 1} aria-label={'Next ' + label}><ArrowRight size={18} /></button>
  </div>;
}

export default function Home() {
  const [active, setActive] = useState(0);
  const [dark, setDark] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const [category, setCategory] = useState('all');
  const [stackIndex, setStackIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const lock = useRef(0);
  const wheel = useRef({ total: 0, last: 0 });
  const touch = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReducedMotion(preference.matches);
    const syncVisibility = () => setPageHidden(document.hidden);
    syncPreference();
    syncVisibility();
    try { setMotionPaused(localStorage.getItem('portfolio-motion') === 'paused'); } catch { /* Optional preference. */ }
    preference.addEventListener('change', syncPreference);
    document.addEventListener('visibilitychange', syncVisibility);
    return () => {
      preference.removeEventListener('change', syncPreference);
      document.removeEventListener('visibilitychange', syncVisibility);
    };
  }, []);

  const toggleMotion = () => {
    const next = !motionPaused;
    setMotionPaused(next);
    try { localStorage.setItem('portfolio-motion', next ? 'paused' : 'active'); } catch { /* Works without storage. */ }
  };

  const navigate = useCallback((value: number) => {
    const next = Math.max(0, Math.min(sections.length - 1, value));
    if (next === activeRef.current) return;
    activeRef.current = next;
    lock.current = Date.now() + 800;
    setActive(next);
    history.replaceState(null, '', '#' + sections[next].toLowerCase());
    panelRef.current?.scrollTo({ top: 0 });
    const focused = document.activeElement;
    if (focused instanceof HTMLElement && panelRef.current?.contains(focused)) focused.blur();
  }, []);

  useEffect(() => {
    let preferred = false;
    try { preferred = localStorage.getItem('theme') === 'dark'; } catch { /* Storage is optional. */ }
    document.documentElement.classList.toggle('dark', preferred);
    setDark(preferred);
    const restore = () => {
      const index = sections.findIndex(section => '#' + section.toLowerCase() === location.hash);
      if (index >= 0) { activeRef.current = index; setActive(index); }
    };
    restore();
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || (event.target as HTMLElement).closest('select, input, textarea') || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const panel = panelRef.current;
      // On small screens and enlarged text, let an overflowing panel remain readable.
      if (panel && panel.scrollHeight > panel.clientHeight + 2 && panel.contains(event.target as Node)) {
        const canScroll = event.deltaY > 0 ? panel.scrollTop + panel.clientHeight < panel.scrollHeight - 2 : panel.scrollTop > 2;
        if (canScroll) return;
      }
      event.preventDefault();
      const now = Date.now();
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 600 : 1);
      const gesture = consumeWheel(wheel.current, delta, now, lock.current);
      wheel.current = { total: gesture.total, last: gesture.last };
      lock.current = gesture.lockedUntil;
      if (gesture.direction) navigate(activeRef.current + gesture.direction);
    };
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('input, select, textarea, button, a, [role="tab"], [contenteditable]')) return;
      const panel = panelRef.current;
      // A focused, overflowing case study must retain native keyboard scrolling.
      if (panel?.contains(target) && panel.scrollHeight > panel.clientHeight + 2) return;
      if (['ArrowDown', 'PageDown', 'ArrowUp', 'PageUp', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
        if (event.key === 'Home') navigate(0);
        else if (event.key === 'End') navigate(sections.length - 1);
        else navigate(activeRef.current + (['ArrowDown', 'PageDown'].includes(event.key) ? 1 : -1));
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', restore);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hashchange', restore);
    };
  }, [navigate]);

  const filtered = projects.filter(project => category === 'all' || project.category === category);
  const project = filtered[projectIndex] ?? filtered[0];
  const story = projectStories[project.number];
  const role = roles[roleIndex];
  const changeProjectCategory = (value: string) => { setCategory(value); setProjectIndex(0); };
  const toggleTheme = () => {
    const next = !dark; setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch { /* Theme still works without storage. */ }
  };

  return <main className="portfolio" data-motion={motionPaused || reducedMotion || pageHidden ? 'paused' : 'active'}>
    <AmbientBackdrop />
    <header className="masthead">
      <button className="identity" onClick={() => navigate(0)} aria-label="Victor Paul Noel, overview"><span className="monogram">vn<span>.</span></span><span className="identity-name">VICTOR PAUL NOEL<small>Software engineering</small></span></button>
      <div className="header-actions"><Button variant="ghost" className="motion-toggle" onClick={toggleMotion} disabled={reducedMotion} aria-pressed={!motionPaused && !reducedMotion} aria-label={reducedMotion ? 'Animations disabled by your reduced-motion preference' : motionPaused ? 'Resume animations' : 'Pause animations'} title={reducedMotion ? 'Reduced motion is enabled on your device' : motionPaused ? 'Resume animations' : 'Pause animations'}>{motionPaused || reducedMotion ? <Play size={14} /> : <Pause size={14} />}<span>Motion {motionPaused || reducedMotion ? 'off' : 'on'}</span></Button><a className="resume-link" href={base + '/Victor-Paul-Noel-CV.pdf'} download><Download size={16} /><span>Résumé</span></a><button className="bulb" onClick={toggleTheme} aria-label={'Switch to ' + (dark ? 'light' : 'dark') + ' mode'} aria-pressed={dark}><Lightbulb key={dark ? 'lit' : 'unlit'} size={20} /></button></div>
    </header>
    <Tabs value={sections[active]} onValueChange={value => navigate(sections.indexOf(value as typeof sections[number]))} className="workspace">
      <TabsList className="section-nav" variant="line" aria-label="Portfolio sections">
        {sections.map((section, index) => <TabsTrigger value={section} key={section}><span className="nav-number">0{index + 1}</span>{section}</TabsTrigger>)}
      </TabsList>
      <div className="panel-viewport" ref={panelRef} tabIndex={0} aria-label={sections[active] + ' content'}
        onTouchStart={event => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
        onTouchEnd={event => {
          if (!touch.current) return;
          const dx = event.changedTouches[0].clientX - touch.current.x;
          const dy = event.changedTouches[0].clientY - touch.current.y;
          touch.current = null;
          const panel = panelRef.current;
          if (panel && panel.scrollHeight > panel.clientHeight + 2) return;
          if (Math.abs(dy) > 75 && Math.abs(dy) > Math.abs(dx) * 1.5) navigate(activeRef.current + (dy < 0 ? 1 : -1));
        }}>
        <TabsContent value="Overview" className="view overview">
          <div className="intro">
            <p className="eyebrow"><span className="status-dot" /> SENIOR SOFTWARE ENGINEER<span className="terminal-cursor" aria-hidden="true">_</span></p>
            <h1>Victor Paul<br /><span>Noel.</span></h1>
            <p className="intro-summary">I build reliable software<br className="desktop-break" /> that makes business simpler.</p>
            <p className="location"><MapPin size={15} /><span>Cebu, Philippines · Dieppe, New Brunswick, Canada</span></p>
            <button className="canadian-experience" onClick={() => { setRoleIndex(roles.findIndex(role => role.company === 'University of Fredericton')); navigate(1); }}>Canadian experience · University of Fredericton <ArrowUpRight size={15} /></button>
            <div className="actions"><a className="primary" href="mailto:dev.vpauln@gmail.com">Let's talk <ArrowUpRight size={18} /></a><button className="text-button" onClick={() => navigate(2)}>View projects <ArrowRight size={17} /></button></div>
          </div>
          <aside className="quick-profile">
            <p className="eyebrow">AT A GLANCE</p>
            <h2>Full-stack depth.<br />Business perspective.</h2>
            <p>From modern web applications to legacy systems, I connect architecture, development, and delivery.</p>
            <div className="profile-facts"><div><span>Focus</span><strong>Enterprise applications & modernization</strong></div><div><span>Experience</span><strong>Engineering, finance, education & operations</strong></div><div><span>Approach</span><strong>Secure systems. Clear communication.</strong></div></div>
            <div className="metrics"><div><strong>15+</strong><span>years in software</span></div><div><strong>75%</strong><span>less manual paperwork</span></div><div><strong>35%</strong><span>lower infrastructure cost</span></div></div>
          </aside>
        </TabsContent>
        <TabsContent value="Experience" className="view">
          <div className="view-heading"><div><p className="eyebrow">CAREER</p><h2>Experience that delivers.</h2></div><Pager index={roleIndex} total={roles.length} onChange={setRoleIndex} label="role" /></div>
          <div className="detail-layout">
            <div className="record-menu">
              <label className="mobile-selector">Choose a role<select value={roleIndex} onChange={e => setRoleIndex(Number(e.target.value))}>{roles.map((item, index) => <option value={index} key={item.company}>{item.company} · {item.period}</option>)}</select></label>
              <div className="record-buttons">{roles.slice(Math.floor(roleIndex / 4) * 4, Math.floor(roleIndex / 4) * 4 + 4).map((item, index) => {
                const value = Math.floor(roleIndex / 4) * 4 + index;
                return <button key={item.company} className={roleIndex === value ? 'record selected' : 'record'} aria-pressed={roleIndex === value} onClick={() => setRoleIndex(value)}><span><strong>{item.company}</strong><small>{item.period}</small></span><ChevronRight size={17} /></button>;
              })}</div>
              <a className="subtle-link" href={base + '/Victor-Paul-Noel-CV.pdf'} download>Full career in the résumé <Download size={15} /></a>
            </div>
            <article className="detail-card" key={roleIndex}>
              <div className="detail-meta"><span>{role.period}</span><span><MapPin size={14} />{role.place}</span></div>
              <h3>{role.role}</h3><p className="company">{role.company}</p><p className="detail-description">{role.note}</p>
              <div className="detail-bottom"><span className="eyebrow">DELIVERY FOCUS</span><p>Application development · Collaboration · Reliable delivery</p></div>
            </article>
          </div>
        </TabsContent>
        <TabsContent value="Projects" className="view">
          <div className="view-heading"><div><p className="eyebrow">SELECTED WORK / 11 PROJECTS</p><h2>Projects & contributions.</h2></div><Pager index={projectIndex} total={filtered.length} onChange={setProjectIndex} label="project" /></div>
          <div className="filters" aria-label="Project categories">{[['all','All projects'],['modernization','Modernization'],['intelligence','AI & automation'],['platforms','Platforms']].map(([value,label]) => <button key={value} aria-pressed={category === value} onClick={() => changeProjectCategory(value)}>{label}</button>)}</div>
          <div className="detail-layout project-layout">
            <div className="record-menu"><label className="mobile-selector">Choose a project<select value={projectIndex} onChange={e => setProjectIndex(Number(e.target.value))}>{filtered.map((item,index) => <option value={index} key={item.number}>{item.title}</option>)}</select></label>
              <div className="record-buttons">{filtered.slice(Math.floor(projectIndex / 6) * 6, Math.floor(projectIndex / 6) * 6 + 6).map((item,index) => {
                const value = Math.floor(projectIndex / 6) * 6 + index;
                return <button key={item.number} className={projectIndex === value ? 'record selected' : 'record'} aria-pressed={projectIndex === value} onClick={() => setProjectIndex(value)}><span className="project-number">{item.number}</span><span><strong>{item.title}</strong><small>{projectStories[item.number].audience}</small></span><ChevronRight size={17} /></button>;
              })}{filtered.length > 6 && <div className="directory-pages" aria-label="Project directory pages">{Array.from({ length: Math.ceil(filtered.length / 6) }, (_, page) => <button key={page} aria-pressed={Math.floor(projectIndex / 6) === page} onClick={() => setProjectIndex(page * 6)}>Projects {page * 6 + 1}–{Math.min((page + 1) * 6, filtered.length)}</button>)}</div>}</div>
            </div>
            <article className="detail-card project-detail" key={project.number} aria-labelledby={'project-' + project.number}>
              <p className="eyebrow">PROJECT {project.number}<span className="project-audience">{story.audience}</span></p>
              <h3 id={'project-' + project.number}>{project.title}</h3>
              <p className="detail-description">{story.overview}</p>
              <div className="case-study-body">
                <section><h4>My contribution</h4><p>{story.contribution}</p></section>
                <section><h4>What the system does</h4><ul>{story.capabilities.map(capability => <li key={capability}><Check size={15} aria-hidden="true" /><span>{capability}</span></li>)}</ul></section>
              </div>
              <div className="case-study-footer">
                <section className="project-value"><h4>{story.measured ? 'Measured outcome' : 'Business value'}</h4><p>{story.value}</p></section>
                <section className="project-stack"><h4>{projectTech[Number(project.number) - 1].length ? 'Technologies' : 'Project focus'}</h4>{projectTech[Number(project.number) - 1].length ? <TechIcons names={projectTech[Number(project.number) - 1]} /> : <p>{project.tags.join(' · ')}</p>}</section>
              </div>
            </article>
          </div>
        </TabsContent>
        <TabsContent value="Technology" className="view">
          <div className="view-heading"><div><p className="eyebrow">THE TOOLKIT</p><h2>Built with the right tools.</h2></div><Pager index={stackIndex} total={stacks.length} onChange={setStackIndex} label="technology group" /></div>
          <div className="detail-layout"><div className="record-menu"><div className="stack-buttons">{stacks.map((stack,index) => <button className={stackIndex === index ? 'record selected' : 'record'} key={stack.title} onClick={() => setStackIndex(index)} aria-pressed={stackIndex === index}><strong>{stack.title}</strong><ChevronRight size={17} /></button>)}</div></div>
            <article className="detail-card stack-detail" key={stackIndex}><p className="eyebrow">0{stackIndex + 1} / EXPERTISE</p><h3>{stacks[stackIndex].title}</h3><p className="detail-description">{stacks[stackIndex].description}</p><div className="large-icons"><TechIcons names={stacks[stackIndex].icons} /></div><p className="icon-hint">Hover or tap an icon to see the technology.</p></article>
          </div>
        </TabsContent>
        <TabsContent value="Contact" className="view contact-view">
          <div><p className="eyebrow">LET'S CONNECT</p><h2>Good work starts<br />with a conversation<span>.</span></h2><p className="intro-summary">Have a role, a project, or a system<br className="desktop-break" /> that needs a fresh perspective?</p><a className="primary" href="mailto:dev.vpauln@gmail.com">Email Victor <ArrowUpRight size={18} /></a></div>
          <aside className="contact-card"><a href="mailto:dev.vpauln@gmail.com"><Mail size={21} /><span><small>Email</small>dev.vpauln@gmail.com</span><ArrowUpRight size={18} /></a><a href="https://www.linkedin.com/in/vpnoel/" target="_blank" rel="noreferrer"><ArrowUpRight size={21} /><span><small>LinkedIn</small>linkedin.com/in/vpnoel</span><ArrowUpRight size={18} /></a><div className="contact-location"><MapPin size={21} /><span><small>Locations</small>Cebu, Philippines<br />Dieppe, New Brunswick, Canada</span></div><a href={base + '/Victor-Paul-Noel-CV.pdf'} download><Download size={21} /><span><small>Experience & qualifications</small>Download résumé</span><ArrowDown size={18} /></a></aside>
        </TabsContent>
      </div>
    </Tabs>
    <div className="technology-dock"><div className="dock-caption"><span className="eyebrow">CORE TECHNOLOGIES</span><span>Tools I work with</span></div><TechIcons names={core} /><button className="toolkit-link" onClick={() => navigate(3)} aria-label="View all technologies"><ArrowUpRight size={19} /></button></div>
    <footer className="footer"><span className="section-status" aria-live="polite">0{active + 1} <i>/ 05</i><span className="dev-location" key={active}><span aria-hidden="true">~/</span>{sections[active].toLowerCase()}<span aria-hidden="true">.tsx</span></span></span><span className="scroll-hint">Scroll to explore <ArrowDown size={14} /></span><div className="section-arrows"><button disabled={active === 0} onClick={() => navigate(active - 1)} aria-label="Previous section"><ArrowLeft size={18} /></button><button disabled={active === 4} onClick={() => navigate(active + 1)} aria-label="Next section"><ArrowRight size={18} /></button></div></footer>
  </main>;
}
