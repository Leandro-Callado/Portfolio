import { useEffect, useRef } from "react";

// ─── Dados ────────────────────────────────────────────────────────────────────

const stack = [
  { name: "Python",      cat: "Back-end",       color: "#3b82f6" },
  { name: "Django",      cat: "Framework",      color: "#22c55e" },
  { name: "TypeScript",  cat: "Front-end",      color: "#60a5fa" },
  { name: "Angular",     cat: "Framework",      color: "#ef4444" },
  { name: "Tailwind",    cat: "Estilização",    color: "#06b6d4" },
  { name: "Java",        cat: "Back-end",       color: "#f97316" },
  { name: "Spring Boot", cat: "Framework",      color: "#4ade80" },
  { name: "HTML/CSS",    cat: "Front-end",      color: "#f59e0b" },
  { name: "SQL",         cat: "Banco de dados", color: "#a78bfa" },
  { name: "Git",         cat: "Versionamento",  color: "#f87171" },
  { name: "C",           cat: "Linguagem",      color: "#94a3b8" },
  { name: "JavaScript",  cat: "Front-end",      color: "#fde047" },
];

const projects = [
  {
    title: "LibrAcess",
    tag: "Ferramentas",
    tagColor: "text-orange-400 bg-orange-500/10",
    barColor: "from-orange-500 to-yellow-400",
    desc: "Script em Python com OpenCV e MediaPipe para mapear movimentos das mãos, reconhecer sinais em LIBRAS e convertê-los em áudio explicativo.",
    techs: ["Python, OpenCV", "MediaPipe", "Machine Learning"],
  },
  {
    title: "Pesquisa IC",
    tag: "Pesquisa",
    tagColor: "text-purple-400 bg-purple-500/15",
    barColor: "from-purple-600 to-pink-500",
    desc: "Iniciação Científica em desenvolvimento web na Unimontes, explorando novas abordagens de interface.",
  techs: ["Python", "Django", "HTML", "CSS", "Tailwind","TypeScript"],
  },
  {
    title: "Gerador de Resumos",
    tag: "Ferramenta",
    tagColor: "text-teal-400 bg-teal-500/10",
    barColor: "from-teal-400 to-blue-500",
    desc: "Script em Python para gerar versões personalizadas de resumos em PDF em um modelo específico.",
    techs: ["Python", "PDF"],
  },
  {
    title: "Projeto OOP",
    tag: "Acadêmico",
    tagColor: "text-pink-400 bg-pink-500/10",
    barColor: "from-pink-500 to-yellow-400",
    desc: "Orientação a Objetos em Java com stress-test de memória JVM e monitoramento de recursos do sistema.",
    techs: ["Java", "Programação Orientada a Objetos"],
  },
];

// ─── Fontes (injetadas uma única vez no <head>) ───────────────────────────────
const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap";

// ─── Estilos globais que não têm equivalente direto em Tailwind ───────────────
const globalStyles = `
  body { font-family: 'DM Sans', sans-serif; }

  /* reveal animation */
  .reveal        { opacity: 0; transform: translateY(20px); transition: opacity .6s ease, transform .6s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* barra de cor no topo dos cards de projeto */
  .project-bar::before {
    content: '';
    position: absolute;
    inset-inline: 0;
    top: 0;
    height: 3px;
    border-radius: 18px 18px 0 0;
    opacity: .7;
    transition: opacity .2s;
  }
  .project-bar:hover::before { opacity: 1; }
  .bar-orange::before { background: linear-gradient(90deg, #FF6B35, #F7C948); }
  .bar-purple::before { background: linear-gradient(90deg, #7B2FBE, #E63B6F); }
  .bar-teal::before   { background: linear-gradient(90deg, #00C2A8, #0090ff); }
  .bar-pink::before   { background: linear-gradient(90deg, #E63B6F, #F7C948); }

  /* section label divider */
  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,.08);
  }
`;

const barClassMap: Record<string, string> = {
  "from-orange-500 to-yellow-400": "bar-orange",
  "from-purple-600 to-pink-500":   "bar-purple",
  "from-teal-400 to-blue-500":     "bar-teal",
  "from-pink-500 to-yellow-400":   "bar-pink",
};

// ─── Ícones ───────────────────────────────────────────────────────────────────

const GitHubIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const EmailIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill={color} aria-hidden>
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.457.316-.827.726-.978a1.63 1.63 0 0 1 .91.012L12 10.09l10.364-5.6c.344-.16.734-.12 1.026.1.273.205.61.558.61.867z" />
  </svg>
);

// ─── Subcomponente: label de seção ────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="section-label mb-7 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#9b96b8]"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      {children}
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function App() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // injeta fonte no <head> uma única vez
    if (!document.getElementById("portfolio-fonts")) {
      const link = document.createElement("link");
      link.id = "portfolio-fonts";
      link.rel = "stylesheet";
      link.href = FONT_URL;
      document.head.appendChild(link);
    }

    // injeta estilos globais mínimos
    if (!document.getElementById("portfolio-globals")) {
      const style = document.createElement("style");
      style.id = "portfolio-globals";
      style.textContent = globalStyles;
      document.head.appendChild(style);
    }

    // scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const ref = (i: number) => (el: HTMLElement | null) => {
    sectionRefs.current[i] = el;
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0f0f13] text-[#f0eefc]">

      {/* ── Blobs decorativos ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -right-20 -top-24 h-96 w-96 rounded-full bg-[#7B2FBE] opacity-[.12] blur-[80px]" />
        <div className="absolute -left-24 bottom-48 h-72 w-72 rounded-full bg-[#FF6B35] opacity-[.12] blur-[80px]" />
        <div className="absolute right-[10%] top-1/2 h-48 w-48 rounded-full bg-[#00C2A8] opacity-[.12] blur-[80px]" />
      </div>

      {/* ── Conteúdo ── */}
      <div className="relative z-10 mx-auto max-w-[860px] px-6 pb-24">

        {/* ── HERO ── */}
        <section ref={ref(0)} className="reveal pb-12 pt-16">

          <div
            className="mb-5 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-[#00C2A8]"
          >
            <span className="inline-block h-0.5 w-6 rounded-full bg-[#00C2A8]" />
            Portfólio
          </div>

          <h1
            className="mb-3 text-[clamp(40px,8vw,72px)] font-extrabold leading-none tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <span className="text-[#FF6B35]">Leandro</span>
            <br />
            <span className="text-[#f0eefc]">Castilho</span>
            <br />
            <span className="text-[#00C2A8]">Feitosa</span>
            <br />
            <span className="text-[#7B2FBE]">Callado</span>
          </h1>

          <p className="mb-7 text-xl font-light italic text-[#9b96b8]">
            Engenharia de Sistemas · Desenvolvedor Web · Pesquisador
          </p>

          <p className="mb-10 max-w-[580px] text-base leading-[1.75] text-[#c8c4e0]">
            Estudante de{" "}
            <strong className="font-medium text-[#f0eefc]">Engenharia de Sistemas</strong> na
            Unimontes, com experiência em desenvolvimento web full stack e pesquisa de Iniciação
            Científica. Apaixonado por construir interfaces que{" "}
            <strong className="font-medium text-[#f0eefc]">fazem sentido</strong> — do back-end ao
            pixel final.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/Leandro-Callado"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/[.08] bg-white/[.06] px-5 py-2.5 text-sm font-medium text-[#f0eefc] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[.12]"
            >
              <GitHubIcon /> Leandro Callado
            </a>
            <a
              href="https://www.linkedin.com/in/leandro-castilho-feitosa-callado-676ab5269"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/[.15] px-5 py-2.5 text-sm font-medium text-sky-400 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500/25"
            >
              <LinkedInIcon /> LinkedIn
            </a>
            <a
              href="mailto:leandrocallado2@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-5 py-2.5 text-sm font-medium text-[#FF6B35] transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-500/20"
            >
              <EmailIcon /> leandrocallado2@gmail.com
            </a>
          </div>
        </section>

        {/* ── STACK ── */}
        <section ref={ref(1)} className="reveal mt-16" style={{ transitionDelay: "75ms" }}>
          <SectionLabel>Habilidades &amp; Stack</SectionLabel>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2.5">
            {stack.map((s) => (
              <div
                key={s.name}
                className="flex cursor-default flex-col items-center gap-1.5 rounded-2xl border border-white/[.08] bg-[#1a1a24] px-3 py-4 text-[13px] font-medium text-[#f0eefc] transition-all duration-200 hover:-translate-y-1 hover:border-white/[.18] hover:bg-[#22223a]"
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: s.color, boxShadow: `0 0 8px ${s.color}55` }}
                />
                {s.name}
                <span className="text-[10px] font-normal text-[#9b96b8]">{s.cat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJETOS ── */}
        <section ref={ref(2)} className="reveal mt-16" style={{ transitionDelay: "100ms" }}>
          <SectionLabel>Projetos</SectionLabel>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <div
                key={p.title}
                className={`project-bar ${barClassMap[p.barColor]} relative cursor-default overflow-hidden rounded-[18px] border border-white/[.08] bg-[#1a1a24] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[.15]`}
              >
                <span className={`mb-3.5 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${p.tagColor}`}>
                  {p.tag}
                </span>

                <h3
                  className="mb-2 text-lg font-bold leading-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {p.title}
                </h3>

                <p className="mb-4 text-[13px] leading-relaxed text-[#9b96b8]">{p.desc}</p>

                <div className="flex flex-wrap gap-1.5">
                  {p.techs.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/[.08] bg-white/[.05] px-2 py-0.5 text-[11px] text-[#a0a0c0]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTATO ── */}
        <section ref={ref(3)} className="reveal mt-16" style={{ transitionDelay: "150ms" }}>
          <SectionLabel>Contato</SectionLabel>
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[18px] border border-white/[.08] bg-[#1a1a24] px-8 py-7">
            <div>
              <h3
                className="mb-1 text-xl font-bold"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Vamos trabalhar juntos?
              </h3>
              <p className="text-sm text-[#9b96b8]">
                Aberto a oportunidades, freelas e colaborações.
              </p>
            </div>
            <a
              href="mailto:leandrocallado2@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-7 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-400"
            >
              <EmailIcon color="#fff" /> Entrar em contato
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}