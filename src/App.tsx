import { useState, useRef, useCallback, useEffect } from "react";

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
  { value: "30%", label: "System Efficiency Gain" },
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
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
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

  .photo-upload {
    position: relative; cursor: pointer;
    width: 100%; aspect-ratio: 3/4;
    overflow: hidden; background: ${C.surface};
    border: 1px solid ${C.border};
  }
  .photo-upload:hover .photo-overlay { opacity: 1; }
  .photo-overlay {
    position: absolute; inset: 0; background: rgba(8,8,9,0.7);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 8px;
    opacity: 0; transition: opacity 0.25s;
    font-family: ${font.body}; font-size: 0.72rem; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase; color: ${C.text};
  }

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
    .skills-grid { grid-template-columns: 1fr !important; }
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
  const [photo, setPhoto] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openExp, setOpenExp] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
  }, []);

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

  // Intersection observer for active nav
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
          background: "rgba(8,8,9,0.82)",
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

          {/* Download CV – always visible in nav */}
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
        {/* Subtle background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            pointerEvents: "none",
          }}
        />
        {/* Radial vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(255,255,255,0.018) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "6rem 2.5rem 6rem",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 340px",
              gap: "6rem",
              alignItems: "center",
            }}
          >
            {/* Left — Text */}
            <div style={{ animation: "fadeUp 0.8s ease both" }}>
              {/* Availability badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: font.mono,
                  fontSize: "0.68rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.muted,
                  marginBottom: "2.5rem",
                  border: `1px solid ${C.border}`,
                  padding: "6px 14px",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#6ee7b7",
                    display: "inline-block",
                    animation: "pulse-dot 2s ease-in-out infinite",
                  }}
                />
                Available for hire
              </div>

              {/* Name */}
              <h1
                style={{
                  fontFamily: font.heading,
                  fontWeight: 800,
                  fontSize: "clamp(3rem, 6vw, 5.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                  color: C.text,
                  marginBottom: "1.2rem",
                }}
              >
                Ilya
                <br />
                Ashaev
              </h1>

              {/* Title line */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: "2rem",
                }}
              >
                <div style={{ height: 1, width: 40, background: C.muted }} />
                <span
                  style={{
                    fontFamily: font.mono,
                    fontSize: "0.78rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: C.muted,
                  }}
                >
                  Senior Software Engineer
                </span>
              </div>

              {/* Summary */}
              <p
                style={{
                  fontFamily: font.body,
                  fontSize: "1.05rem",
                  lineHeight: 1.75,
                  color: "rgba(240,238,235,0.65)",
                  maxWidth: 560,
                  marginBottom: "2.5rem",
                  fontWeight: 300,
                }}
              >
                5+ years of experience automating business processes, data engineering,
                and full-stack system integration. Specializes in scalable solutions
                using Golang, Python, R, and modern DevOps tooling.
              </p>

              {/* Stats */}
              <div
                className="stats-row"
                style={{
                  display: "flex",
                  gap: "3rem",
                  marginBottom: "3rem",
                  paddingTop: "2rem",
                  borderTop: `1px solid ${C.border}`,
                }}
              >
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div
                      style={{
                        fontFamily: font.heading,
                        fontWeight: 700,
                        fontSize: "2.2rem",
                        color: C.text,
                        lineHeight: 1,
                        marginBottom: 4,
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontFamily: font.body,
                        fontSize: "0.72rem",
                        color: C.muted,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        fontWeight: 400,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Contractor note */}
              <div
                style={{
                  display: "inline-flex",
                  gap: 12,
                  padding: "14px 20px",
                  border: `1px solid ${C.border}`,
                  background: C.surface,
                  maxWidth: 520,
                }}
              >
                <span style={{ fontSize: "1rem", marginTop: 1 }}>🏢</span>
                <p
                  style={{
                    fontFamily: font.body,
                    fontSize: "0.8rem",
                    lineHeight: 1.65,
                    color: C.muted,
                    fontWeight: 300,
                  }}
                >
                  <strong style={{ color: C.text, fontWeight: 500 }}>Contractor option:</strong>{" "}
                  Available for direct hire or through an Armenia-registered organization —
                  simplifying international contracts and payments.
                </p>
              </div>
            </div>

            {/* Right — Photo */}
            <div style={{ animation: "fadeIn 1s ease 0.3s both" }}>
              <div
                className="photo-upload"
                onClick={() => photoInputRef.current?.click()}
                title="Click to upload your photo"
              >
                {photo ? (
                  <img
                    src={photo}
                    alt="Ilya Ashaev"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                      background: C.surface,
                      minHeight: 420,
                    }}
                  >
                    {/* Placeholder silhouette */}
                    <svg
                      width="72"
                      height="72"
                      viewBox="0 0 72 72"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="36" cy="28" r="16" fill="rgba(255,255,255,0.08)" />
                      <ellipse cx="36" cy="64" rx="26" ry="18" fill="rgba(255,255,255,0.06)" />
                    </svg>
                    <span
                      style={{
                        fontFamily: font.mono,
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: C.faint,
                      }}
                    >
                      Add Photo
                    </span>
                  </div>
                )}
                <div className="photo-overlay">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 2v16M2 10h16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>{photo ? "Replace photo" : "Upload photo"}</span>
                </div>
              </div>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: "none" }}
              />

              {/* Location & languages below photo */}
              <div
                style={{
                  marginTop: 1,
                  padding: "14px 16px",
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderTop: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
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
                  📍 Armenia
                </span>
                <div style={{ display: "flex", gap: 8 }}>
                  {["EN", "RU"].map((lang) => (
                    <span
                      key={lang}
                      style={{
                        fontFamily: font.mono,
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        border: `1px solid ${C.border}`,
                        padding: "3px 8px",
                        color: C.muted,
                      }}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding: "8rem 0", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2.5rem" }}>
          <SectionHeader index="01" title="Experience" />

          <div style={{ marginTop: "4rem", display: "flex", flexDirection: "column", gap: "1px" }}>
            {EXPERIENCE.map((exp, i) => (
              <div
                key={i}
                className={`exp-card ${openExp === i ? "open" : ""}`}
                style={{ background: openExp === i ? C.surfaceHover : "transparent" }}
                onClick={() => setOpenExp(openExp === i ? -1 : i)}
              >
                {/* Card header */}
                <div
                  style={{
                    padding: "1.8rem 2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "1rem",
                        flexWrap: "wrap",
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: font.heading,
                          fontWeight: 600,
                          fontSize: "1.15rem",
                          color: C.text,
                        }}
                      >
                        {exp.title}
                      </span>
                      <span
                        style={{
                          fontFamily: font.body,
                          fontSize: "0.85rem",
                          color: C.muted,
                          fontWeight: 300,
                        }}
                      >
                        @ {exp.company}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: font.mono,
                        fontSize: "0.68rem",
                        color: C.faint,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: font.mono,
                      fontSize: "1.2rem",
                      color: C.muted,
                      transition: "transform 0.3s",
                      transform: openExp === i ? "rotate(45deg)" : "none",
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </div>

                {/* Expanded body */}
                {openExp === i && (
                  <div
                    style={{
                      padding: "0 2rem 2rem",
                      animation: "fadeUp 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        height: 1,
                        background: C.border,
                        marginBottom: "1.5rem",
                      }}
                    />
                    <ul
                      style={{
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.8rem",
                        marginBottom: "1.5rem",
                      }}
                    >
                      {exp.bullets.map((b, j) => (
                        <li
                          key={j}
                          style={{
                            display: "flex",
                            gap: 14,
                            fontFamily: font.body,
                            fontSize: "0.88rem",
                            lineHeight: 1.7,
                            color: "rgba(240,238,235,0.6)",
                            fontWeight: 300,
                          }}
                        >
                          <span style={{ color: C.faint, flexShrink: 0, marginTop: 2 }}>—</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
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
      <section id="skills" style={{ padding: "8rem 0", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2.5rem" }}>
          <SectionHeader index="02" title="Skills" />

          <div style={{ marginTop: "4rem" }}>
            {SKILLS.map((s, i) => (
              <div key={i} className="skill-row" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "260px 1fr",
                    gap: "2rem",
                    alignItems: "start",
                    padding: "0 0.25rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: font.heading,
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      color: C.text,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {s.label}
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 2 }}>
                    {s.items.map((item) => (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "8rem 0", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2.5rem" }}>
          <SectionHeader index="03" title="Contact" />

          <div
            style={{
              marginTop: "4rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "start",
            }}
            className="contact-grid"
          >
            {/* Left — CTA */}
            <div>
              <h2
                style={{
                  fontFamily: font.heading,
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  lineHeight: 1.1,
                  color: C.text,
                  letterSpacing: "-0.02em",
                  marginBottom: "1.2rem",
                }}
              >
                Let's build
                <br />
                something great.
              </h2>
              <p
                style={{
                  fontFamily: font.body,
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  color: C.muted,
                  fontWeight: 300,
                  maxWidth: 400,
                  marginBottom: "2.5rem",
                }}
              >
                Open to full-time roles, contract projects, and consulting.
                Reach out — I respond within 24 hours.
              </p>

              <a
                href="/cv.pdf"
                download="Ilya_Ashaev_CV.pdf"
                className="dl-btn"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1v8M3 9l4 4 4-4M1 13h12"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Download CV
              </a>
            </div>

            {/* Right — Contact items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              {/* Email */}
              <div className="contact-item">
                <div
                  style={{
                    fontFamily: font.mono,
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: C.faint,
                    marginBottom: 10,
                  }}
                >
                  Email
                </div>
                <button className="copy-btn" onClick={copyEmail}>
                  <span>v.ashaev@yandex.com</span>
                  <span style={{ fontSize: "0.7rem", color: C.faint }}>
                    {copied ? "✓ Copied" : "Copy"}
                  </span>
                </button>
              </div>

              {/* LinkedIn */}
              <div className="contact-item">
                <div
                  style={{
                    fontFamily: font.mono,
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: C.faint,
                    marginBottom: 10,
                  }}
                >
                  LinkedIn
                </div>
                <a
                  href="https://linkedin.com/in/ilyaashaev1998"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: font.mono,
                    fontSize: "0.82rem",
                    color: C.muted,
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = C.text)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = C.muted)
                  }
                >
                  linkedin.com/in/ilyaashaev1998 →
                </a>
              </div>

              {/* Location */}
              <div className="contact-item">
                <div
                  style={{
                    fontFamily: font.mono,
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: C.faint,
                    marginBottom: 10,
                  }}
                >
                  Location
                </div>
                <span
                  style={{
                    fontFamily: font.mono,
                    fontSize: "0.82rem",
                    color: C.muted,
                  }}
                >
                  Armenia — Remote Worldwide
                </span>
              </div>

              {/* GitHub */}
              <div className="contact-item">
                <div
                  style={{
                    fontFamily: font.mono,
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: C.faint,
                    marginBottom: 10,
                  }}
                >
                  GitHub
                </div>
                <a
                  href="https://github.com/Ashaev-Tech-lab"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: font.mono,
                    fontSize: "0.82rem",
                    color: C.muted,
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = C.text)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = C.muted)
                  }
                >
                  github.com/Ashaev-Tech-lab →
                </a>
              </div>
            </div>
          </div>
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
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: font.heading,
              fontWeight: 700,
              fontSize: "0.9rem",
              color: C.faint,
              letterSpacing: "0.02em",
            }}
          >
            Ilya Ashaev
          </span>
          <span
            style={{
              fontFamily: font.mono,
              fontSize: "0.65rem",
              color: C.faint,
              letterSpacing: "0.08em",
            }}
          >
            © {new Date().getFullYear()} — Senior Software Engineer
          </span>
        </div>
      </footer>
    </>
  );
}

/* ─────────────────────────── SECTION HEADER ─────────────────────────── */

function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.68rem",
          letterSpacing: "0.1em",
          color: "rgba(240,238,235,0.25)",
        }}
      >
        {index}
      </span>
      <div style={{ height: 1, width: 48, background: "rgba(240,238,235,0.15)" }} />
      <h2
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
          letterSpacing: "-0.02em",
          color: "rgba(240,238,235,0.92)",
        }}
      >
        {title}
      </h2>
    </div>
  );
}
