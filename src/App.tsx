import { useState, useEffect } from "react";
/* ─────────────────────────── DATA ─────────────────────────── */
const EXPERIENCE = [
  {
    title: "Senior Software Engineer",
    company: "Software Country",
    period: "2022 — Present",
    bullets: [
      "Led end-to-end development of a new project (Golang/Python) for automating business processes, including data collection (Drupal) and storage (S3).",
      "Increased system efficiency by 30% through optimization of data pipelines and visualization dashboards.",
      "Built real-time data processing workflows using R, DVC, and S3; integrated machine learning models for predictive analytics.",
      "Collaborated with an international team (English) to deliver cross-functional features and maintain CI/CD (DevOps).",
    ],
    stack: ["Golang", "Python", "R", "S3", "Drupal", "Domino", "Docker", "Kafka"],
  },
  {
    title: "Programmer Analyst",
    company: "X5 Retail Group",
    period: "2021 — 2022",
    bullets: [
      "Engineered real-time data pipelines for mobile apps using Kafka and ClickHouse, reducing latency by 40%.",
      "Developed business dashboards (R/SQL) to track KPIs, improving decision-making for retail operations.",
      "Automated data workflows via AWX/cron, reducing manual effort by 25%.",
    ],
    stack: ["R", "SQL", "Kafka", "ClickHouse", "AWX"],
  },
  {
    title: "Engineer — Bridge Load Modeling",
    company: "Stroyexpertiza",
    period: "2020 — 2021",
    bullets: [
      "Designed mathematical models (Python) for bridge load simulations, improving accuracy by 35%.",
      "Developed a Qt-based frontend for engineers to visualize stress-test results.",
    ],
    stack: ["Python", "Qt", "Mathematical Modeling"],
  },
];
const SKILLS = [
  {
    label: "Backend Engineering",
    items: ["Golang", "Python", "REST APIs", "Microservices", "gRPC"],
  },
  {
    label: "Data & Machine Learning",
    items: ["R", "DVC", "ML Models", "ClickHouse", "SQL", "Predictive Analytics"],
  },
  {
    label: "DevOps & Infrastructure",
    items: ["Docker", "Kafka", "AWS S3", "CI/CD", "AWX", "Linux"],
  },
  {
    label: "Frontend & Visualization",
    items: ["Qt", "Dashboard Design", "Data Visualization", "Drupal"],
  },
];
const STATS = [
  { value: "5+", label: "Years of Experience" },
  { value: "30%", label: "Efficiency Gain" },
  { value: "40%", label: "Latency Reduction" },
];
/* ─────────────────────────── STYLES ─────────────────────────── */
const C = {
  bg: "#080809",
  surface: "#0f0f11",
  surfaceHover: "#141418",
  border: "rgba(255,255,255,0.07)",
  borderHover: "rgba(255,255,255,0.14)",
  text: "#f0eeeb",
  muted: "rgba(240,238,235,0.45)",
  faint: "rgba(240,238,235,0.18)",
  accent: "#e8e8e8",
  accentDim: "rgba(232,232,232,0.12)",
};
const font = {
  heading: "'Syne', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'Space Mono', monospace",
};
const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${C.bg}; color: ${C.text}; font-family: ${font.body}; -webkit-font-smoothing: antialiased; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${C.bg}; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 2px; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes lineGrow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.7); }
  }
  .nav-link {
    background: none; border: none; cursor: pointer;
    font-family: ${font.body}; font-size: 0.72rem; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: ${C.muted}; transition: color 0.2s;
    padding: 0; position: relative;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -3px; left: 0; right: 0;
    height: 1px; background: ${C.text}; transform: scaleX(0);
    transform-origin: left; transition: transform 0.25s ease;
  }
  .nav-link:hover { color: ${C.text}; }
  .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }
  .nav-link.active { color: ${C.text}; }
  .tag {
    display: inline-block;
    font-family: ${font.mono}; font-size: 0.68rem; font-weight: 400;
    letter-spacing: 0.04em; padding: 4px 10px;
    border: 1px solid ${C.border}; color: ${C.muted};
    transition: border-color 0.2s, color 0.2s;
  }
  .tag:hover { border-color: ${C.borderHover}; color: ${C.text}; }
  .exp-card {
    border: 1px solid ${C.border};
    transition: border-color 0.3s, background 0.3s;
    cursor: pointer;
  }
  .exp-card:hover { border-color: ${C.borderHover}; background: ${C.surfaceHover}; }
  .exp-card.open { border-color: rgba(255,255,255,0.13); }
  .skill-row {
    border-bottom: 1px solid ${C.border};
    transition: background 0.2s;
    padding: 1.5rem 0;
  }
  .skill-row:first-child { border-top: 1px solid ${C.border}; }
  .skill-row:hover { background: ${C.surfaceHover}; }
  .contact-item {
    border: 1px solid ${C.border};
    transition: border-color 0.25s, background 0.25s;
    padding: 1.5rem;
  }
  .contact-item:hover { border-color: ${C.borderHover}; background: ${C.surfaceHover}; }
  .dl-btn {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: ${font.body}; font-size: 0.78rem; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: ${C.bg}; background: ${C.text};
    border: none; cursor: pointer; padding: 14px 32px;
    text-decoration: none;
    transition: opacity 0.2s, transform 0.2s;
  }
  .dl-btn:hover { opacity: 0.88; transform: translateY(-1px); }
  .dl-btn:active { transform: translateY(0); }
  .copy-btn {
    background: none; border: none; cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    color: ${C.muted}; transition: color 0.2s;
    font-family: ${font.mono}; font-size: 0.82rem;
    padding: 0;
  }
  .copy-btn:hover { color: ${C.text}; }
  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .hamburger { display: flex !important; }
    .hero-grid { grid-template-columns: 1fr !important; }
    .stats-row { flex-direction: column; gap: 2rem !important; }
    .contact-grid { grid-template-columns: 1fr !important; }
  }
  @media (min-width: 769px) {
    .hamburger { display: none !important; }
    .mobile-menu { display: none !important; }
  }
`;
/* ─────────────────────────── COMPONENT ─────────────────────────── */
export default function App() {
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openExp, setOpenExp] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const copyEmail = () => {
    navigator.clipboard.writeText("v.ashaev@yandex.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMenuOpen(false);
  };
  useEffect(() => {
    const sections = ["about", "experience", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id.charAt(0).toUpperCase() + id.slice(1));
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <style>{css}</style>
      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          borderBottom: `1px solid ${C.border}`,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: "rgba(8,8,9,0.85)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 2.5rem",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: font.heading,
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "0.02em",
              color: C.text,
            }}
          >
            Ilya Ashaev
          </span>
          <div className="desktop-nav" style={{ display: "flex", gap: "2.8rem" }}>
            {["About", "Experience", "Skills", "Contact"].map((link) => (
              <button
                key={link}
                className={`nav-link ${activeSection === link ? "active" : ""}`}
                onClick={() => scrollTo(link)}
              >
                {link}
              </button>
            ))}
          </div>
          {/* Download CV */}
          <a
            href="/cv.pdf"
            download="Ilya_Ashaev_CV.pdf"
            className="desktop-nav"
            style={{
              display: "flex",
              fontFamily: font.body,
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: C.muted,
              textDecoration: "none",
              borderBottom: `1px solid ${C.faint}`,
              paddingBottom: 2,
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = C.text;
              (e.currentTarget as HTMLAnchorElement).style.borderColor = C.text;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = C.muted;
              (e.currentTarget as HTMLAnchorElement).style.borderColor = C.faint;
            }}
          >
            ↓ CV
          </a>
          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "none",
              flexDirection: "column",
              gap: 6,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 24,
                  height: 1,
                  background: C.text,
                  opacity: i === 1 && menuOpen ? 0 : 1,
                  transform:
                    menuOpen && i === 0
                      ? "rotate(45deg) translate(5px, 5px)"
                      : menuOpen && i === 2
                      ? "rotate(-45deg) translate(5px, -5px)"
                      : "none",
                  transition: "transform 0.25s, opacity 0.25s",
                }}
              />
            ))}
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="mobile-menu"
            style={{
              borderTop: `1px solid ${C.border}`,
              padding: "1.5rem 2.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {["About", "Experience", "Skills", "Contact"].map((link) => (
              <button
                key={link}
                className="nav-link"
                onClick={() => scrollTo(link)}
                style={{ textAlign: "left", fontSize: "0.85rem" }}
              >
                {link}
              </button>
            ))}
            <a
              href="/cv.pdf"
              download="Ilya_Ashaev_CV.pdf"
              style={{
                fontFamily: font.body,
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: C.muted,
                textDecoration: "none",
              }}
            >
              ↓ Download CV
            </a>
          </div>
        )}
      </nav>
      {/* ── HERO / ABOUT ── */}
      <section
        id="about"
        style={{
          minHeight: "100vh",
          paddingTop: 60,
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot-grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />
        {/* Radial vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, ${C.bg} 100%)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "5rem 2.5rem",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 320px",
              gap: "5rem",
              alignItems: "center",
            }}
          >
            {/* LEFT — Text */}
            <div style={{ animation: "fadeUp 0.8s ease both" }}>
              {/* Section number */}
              <p
                style={{
                  fontFamily: font.mono,
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  color: C.muted,
                  marginBottom: "1.8rem",
                  textTransform: "uppercase",
                }}
              >
                01 — Profile
              </p>
              <h1
                style={{
                  fontFamily: font.heading,
                  fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  marginBottom: "1rem",
                  color: C.text,
                }}
              >
                Ilya
                <br />
                Ashaev
              </h1>
              {/* Animated underline */}
              <div
                style={{
                  height: 1,
                  background: `linear-gradient(90deg, ${C.text}, transparent)`,
                  marginBottom: "1.8rem",
                  animation: "lineGrow 1s ease 0.4s both",
                  transformOrigin: "left",
                  width: "60%",
                }}
              />
              <p
                style={{
                  fontFamily: font.body,
                  fontSize: "1.05rem",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  color: C.accent,
                  marginBottom: "1.4rem",
                }}
              >
                Senior Software Engineer
              </p>
              <p
                style={{
                  fontFamily: font.body,
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  color: C.muted,
                  maxWidth: 560,
                  marginBottom: "2.5rem",
                }}
              >
                5+ years of experience automating business processes, data engineering,
                and full-stack system integration. Specializes in scalable solutions
                using Golang, Python, R, and DevOps tooling. Adept at machine learning
                and dashboard visualization. Proven track record in international teams
                with end-to-end project ownership.
              </p>
              {/* Contractor badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  border: `1px solid ${C.border}`,
                  padding: "1rem 1.25rem",
                  marginBottom: "2.8rem",
                  maxWidth: 520,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: C.text,
                    marginTop: 6,
                    flexShrink: 0,
                    animation: "pulse-dot 2.5s ease-in-out infinite",
                  }}
                />
                <p
                  style={{
                    fontFamily: font.body,
                    fontSize: "0.82rem",
                    lineHeight: 1.65,
                    color: C.muted,
                  }}
                >
                  <span style={{ color: C.text, fontWeight: 600 }}>
                    Open to contracts.
                  </span>{" "}
                  Available for hire directly or through an Armenia-registered
                  organization — simplifying international contracts and payments.
                </p>
              </div>
              {/* Stats */}
              <div
                className="stats-row"
                style={{ display: "flex", gap: "3rem" }}
              >
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p
                      style={{
                        fontFamily: font.heading,
                        fontSize: "2rem",
                        fontWeight: 800,
                        color: C.text,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                        marginBottom: "0.35rem",
                      }}
                    >
                      {s.value}
                    </p>
                    <p
                      style={{
                        fontFamily: font.mono,
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: C.muted,
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* RIGHT — Photo */}
            <div
              style={{
                animation: "fadeIn 1s ease 0.3s both",
                position: "relative",
              }}
            >
              {/* Offset decorative frame */}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  right: -16,
                  bottom: -16,
                  border: `1px solid ${C.border}`,
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
              {/* Photo frame */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  border: `1px solid ${C.border}`,
                  background: C.surface,
                }}
              >
                <img
                  src="/photo.jpg"
                  alt="Ilya Ashaev"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ── EXPERIENCE ── */}
      <section
        id="experience"
        style={{
          padding: "7rem 0",
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2.5rem" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "1.5rem",
              marginBottom: "3.5rem",
            }}
          >
            <p
              style={{
                fontFamily: font.mono,
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                color: C.muted,
                textTransform: "uppercase",
              }}
            >
              02
            </p>
            <h2
              style={{
                fontFamily: font.heading,
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 800,
                color: C.text,
                letterSpacing: "-0.02em",
              }}
            >
              Experience
            </h2>
          </div>
          {/* Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {EXPERIENCE.map((exp, i) => (
              <div
                key={i}
                className={`exp-card ${openExp === i ? "open" : ""}`}
                onClick={() => setOpenExp(openExp === i ? -1 : i)}
              >
                {/* Card header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1.4rem 1.6rem",
                    gap: "1rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                    {/* Dot indicator */}
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: openExp === i ? C.text : C.faint,
                        flexShrink: 0,
                        transition: "background 0.3s",
                      }}
                    />
                    <div>
                      <p
                        style={{
                          fontFamily: font.heading,
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: C.text,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {exp.title}
                      </p>
                      <p
                        style={{
                          fontFamily: font.mono,
                          fontSize: "0.7rem",
                          color: C.muted,
                          letterSpacing: "0.06em",
                          marginTop: "0.2rem",
                        }}
                      >
                        {exp.company}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2rem",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: font.mono,
                        fontSize: "0.68rem",
                        color: C.muted,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {exp.period}
                    </span>
                    <span
                      style={{
                        fontFamily: font.body,
                        fontSize: "1.2rem",
                        color: C.muted,
                        transition: "transform 0.3s",
                        display: "inline-block",
                        transform: openExp === i ? "rotate(45deg)" : "none",
                      }}
                    >
                      +
                    </span>
                  </div>
                </div>
                {/* Expanded body */}
                {openExp === i && (
                  <div
                    style={{
                      padding: "0 1.6rem 1.8rem 3.4rem",
                      animation: "fadeUp 0.3s ease both",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: 1,
                        background: C.border,
                        marginBottom: "1.4rem",
                      }}
                    />
                    <ul
                      style={{
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                        marginBottom: "1.5rem",
                      }}
                    >
                      {exp.bullets.map((b, j) => (
                        <li
                          key={j}
                          style={{
                            fontFamily: font.body,
                            fontSize: "0.9rem",
                            lineHeight: 1.7,
                            color: C.muted,
                            paddingLeft: "1rem",
                            borderLeft: `1px solid ${C.border}`,
                          }}
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {exp.stack.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── SKILLS ── */}
      <section
        id="skills"
        style={{
          padding: "7rem 0",
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2.5rem" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "1.5rem",
              marginBottom: "3.5rem",
            }}
          >
            <p
              style={{
                fontFamily: font.mono,
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                color: C.muted,
                textTransform: "uppercase",
              }}
            >
              03
            </p>
            <h2
              style={{
                fontFamily: font.heading,
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 800,
                color: C.text,
                letterSpacing: "-0.02em",
              }}
            >
              Skills
            </h2>
          </div>
          {/* Skill rows */}
          <div>
            {SKILLS.map((group) => (
              <div
                key={group.label}
                className="skill-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "220px 1fr",
                  gap: "2rem",
                  alignItems: "center",
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem",
                }}
              >
                <p
                  style={{
                    fontFamily: font.heading,
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: C.text,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {group.label}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {group.items.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── CONTACT ── */}
      <section
        id="contact"
        style={{
          padding: "7rem 0 10rem",
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2.5rem" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "1.5rem",
              marginBottom: "3.5rem",
            }}
          >
            <p
              style={{
                fontFamily: font.mono,
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                color: C.muted,
                textTransform: "uppercase",
              }}
            >
              04
            </p>
            <h2
              style={{
                fontFamily: font.heading,
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 800,
                color: C.text,
                letterSpacing: "-0.02em",
              }}
            >
              Contact
            </h2>
          </div>
          <div
            className="contact-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "3rem",
            }}
          >
            {/* Email */}
            <div className="contact-item">
              <p
                style={{
                  fontFamily: font.mono,
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: C.muted,
                  marginBottom: "0.75rem",
                }}
              >
                Email
              </p>
              <button className="copy-btn" onClick={copyEmail}>
                <span>v.ashaev@yandex.com</span>
                <span style={{ fontSize: "0.7rem", opacity: 0.5 }}>
                  {copied ? "✓ Copied" : "⎘"}
                </span>
              </button>
            </div>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/ilyaashaev1998"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
              style={{ textDecoration: "none", display: "block" }}
            >
              <p
                style={{
                  fontFamily: font.mono,
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: C.muted,
                  marginBottom: "0.75rem",
                }}
              >
                LinkedIn
              </p>
              <p
                style={{
                  fontFamily: font.mono,
                  fontSize: "0.82rem",
                  color: C.text,
                }}
              >
                linkedin.com/in/ilyaashaev1998
              </p>
            </a>
            {/* Location */}
            <div className="contact-item">
              <p
                style={{
                  fontFamily: font.mono,
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: C.muted,
                  marginBottom: "0.75rem",
                }}
              >
                Location
              </p>
              <p
                style={{
                  fontFamily: font.mono,
                  fontSize: "0.82rem",
                  color: C.text,
                }}
              >
                Armenia — Remote worldwide
              </p>
            </div>
            {/* Languages */}
            <div className="contact-item">
              <p
                style={{
                  fontFamily: font.mono,
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: C.muted,
                  marginBottom: "0.75rem",
                }}
              >
                Languages
              </p>
              <p
                style={{
                  fontFamily: font.mono,
                  fontSize: "0.82rem",
                  color: C.text,
                }}
              >
                English — Intermediate &nbsp;·&nbsp; Russian — Native
              </p>
            </div>
          </div>
          {/* CV Download */}
          <a
            href="/cv.pdf"
            download="Ilya_Ashaev_CV.pdf"
            className="dl-btn"
          >
            <span>↓</span>
            <span>Download CV</span>
          </a>
        </div>
      </section>
      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: `1px solid ${C.border}`,
          padding: "2rem 2.5rem",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: font.mono,
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              color: C.faint,
              textTransform: "uppercase",
            }}
          >
            © {new Date().getFullYear()} Ilya Ashaev
          </span>
          <span
            style={{
              fontFamily: font.mono,
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              color: C.faint,
              textTransform: "uppercase",
            }}
          >
            Ashaev-Tech-Lab
          </span>
        </div>
      </footer>
    </>
  );
}
