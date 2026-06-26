'use client';

import Link from "next/link";
import {
  PenTool,
  Users,
  Layers,
  Github,
  Twitter,
  Linkedin,
  Zap,
  MousePointer2,
  Share2,
  Sparkles,
  ArrowRight,
  Infinity as InfinityIcon,
} from "lucide-react";

const features = [
  {
    icon: PenTool,
    title: "Expressive tools",
    description:
      "Pencil, shapes, arrows and freehand strokes with neon-grade styling — built for thinking out loud.",
    glow: "from-fuchsia-500/30 to-violet-500/10",
  },
  {
    icon: Users,
    title: "Real-time co-draw",
    description:
      "Every stroke streams to your room over WebSockets. Draw together, instantly, from anywhere.",
    glow: "from-cyan-500/30 to-blue-500/10",
  },
  {
    icon: InfinityIcon,
    title: "Infinite canvas",
    description:
      "Pan and zoom across an endless grid. Your ideas never run out of room to grow.",
    glow: "from-violet-500/30 to-indigo-500/10",
  },
  {
    icon: Zap,
    title: "Blazing fast",
    description:
      "A hand-tuned canvas engine renders thousands of shapes at buttery 60fps.",
    glow: "from-amber-400/30 to-fuchsia-500/10",
  },
  {
    icon: Share2,
    title: "Shareable rooms",
    description:
      "Spin up a room, share the link, and start collaborating in seconds. No friction.",
    glow: "from-emerald-400/30 to-cyan-500/10",
  },
  {
    icon: Layers,
    title: "Durable by design",
    description:
      "Every shape is persisted, so your board is exactly where you left it next time.",
    glow: "from-pink-500/30 to-violet-500/10",
  },
];

const stats = [
  { value: "60", suffix: "fps", label: "Render speed" },
  { value: "∞", suffix: "", label: "Canvas size" },
  { value: "<50", suffix: "ms", label: "Sync latency" },
  { value: "100%", suffix: "", label: "Open source" },
];

const testimonials = [
  {
    name: "Alex Chen",
    role: "Staff Engineer",
    quote: "It feels like Figma and a terminal had a neon baby. Instantly my team's default whiteboard.",
  },
  {
    name: "Sarah Johnson",
    role: "Product Designer",
    quote: "The real-time sync is flawless and the glow on dark mode is genuinely gorgeous.",
  },
  {
    name: "Mike Roberts",
    role: "Tech Lead",
    quote: "Fast, infinite, collaborative. We replaced three tools with this one.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070611] text-white selection:bg-fuchsia-500/30">
      {/* ---------- animated background ---------- */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#070611]">
        {/* 3D perspective grid (retro floor + back wall) */}
        <div className="grid-scene">
          <div className="grid-wall" />
          <div className="grid-floor" />
        </div>
        {/* glowing horizon line where the planes meet */}
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
        <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent blur-[3px]" />
        <div className="absolute left-[15%] right-[15%] top-1/2 h-20 -translate-y-1/2 bg-cyan-400/25 blur-[60px]" />
        {/* aurora color wash (kept off the top/bottom edges so the grid shows) */}
        <div className="absolute -left-[15%] top-[20%] h-[45vmax] w-[45vmax] rounded-full bg-violet-600/20 blur-[140px] animate-aurora animate-glow" />
        <div className="absolute right-[-20%] top-[15%] h-[40vmax] w-[40vmax] rounded-full bg-fuchsia-600/15 blur-[140px] animate-aurora animate-glow" style={{ animationDelay: "-6s" }} />
        {/* gentle side-only fade so vertical edge lines aren't harsh (leaves top/bottom grid bright) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#070611,transparent_12%,transparent_88%,#070611)]" />
      </div>

      {/* ---------- nav ---------- */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_0_20px_rgba(168,85,247,0.6)]">
            <PenTool className="h-5 w-5 text-white" />
          </span>
          <span className="text-lg font-bold tracking-tight neon-text">Excel.Draw</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#showcase" className="transition hover:text-white">Showcase</a>
          <a href="#voices" className="transition hover:text-white">Voices</a>
        </nav>
        <Link
          href="/auth"
          className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:border-violet-400/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
        >
          Launch app
        </Link>
      </header>

      {/* ---------- hero ---------- */}
      <section className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-20 pb-28 text-center md:pt-28">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-200 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          Real-time collaborative whiteboard
        </div>

        <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
          Draw at the
          <span className="relative mx-3 inline-block bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent animate-gradient neon-text">
            speed of thought
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-lg text-white/65 md:text-xl">
          An infinite neon canvas for teams. Sketch, diagram and brainstorm together
          in real time — every stroke glows, every idea syncs instantly.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/auth"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-base font-semibold text-white shadow-[0_0_35px_rgba(168,85,247,0.55)] transition hover:scale-[1.04] hover:shadow-[0_0_55px_rgba(168,85,247,0.85)]"
          >
            Start drawing free
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </Link>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white/90 backdrop-blur transition hover:border-cyan-400/50 hover:text-white"
          >
            <MousePointer2 className="h-5 w-5" />
            Sign in
          </Link>
        </div>

        {/* stats */}
        <div className="mt-20 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 backdrop-blur"
            >
              <div className="bg-gradient-to-r from-fuchsia-300 to-cyan-300 bg-clip-text text-3xl font-bold text-transparent">
                {s.value}
                <span className="text-lg">{s.suffix}</span>
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/50">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- features ---------- */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">create</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            A focused toolset wrapped in a fast, beautiful, collaborative canvas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description, glow }) => (
            <div key={title} className="neon-card group rounded-2xl p-6">
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${glow} ring-1 ring-white/10`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-white/60">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- showcase / preview ---------- */}
      <section id="showcase" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            Your canvas,{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">supercharged</span>
          </h2>
        </div>
        <div className="relative mx-auto max-w-4xl animate-float">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 opacity-50 blur-xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0a16]">
            {/* faux window chrome */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
              <span className="ml-3 text-xs text-white/40">excel.draw / room / neon-sprint</span>
            </div>
            {/* faux canvas with glowing shapes */}
            <div className="relative h-[340px] bg-[radial-gradient(circle_at_center,#12101f,#0b0a16)]">
              <div className="absolute inset-0 neon-grid opacity-40" />
              <div className="absolute left-[12%] top-[22%] h-24 w-40 rounded-xl border-2 border-fuchsia-400 shadow-[0_0_24px_rgba(232,121,249,0.7)]" />
              <div className="absolute right-[18%] top-[30%] h-28 w-28 rounded-full border-2 border-cyan-400 shadow-[0_0_24px_rgba(34,211,238,0.7)]" />
              <div className="absolute bottom-[20%] left-[34%] h-20 w-52 rotate-[-6deg] rounded-lg border-2 border-violet-400 shadow-[0_0_24px_rgba(167,139,250,0.7)]" />
              <svg className="absolute inset-0 h-full w-full" aria-hidden>
                <line x1="32%" y1="40%" x2="62%" y2="44%" stroke="#a78bfa" strokeWidth="2" style={{ filter: "drop-shadow(0 0 6px #a78bfa)" }} />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- testimonials ---------- */}
      <section id="voices" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            Loved by{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">builders</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="neon-card rounded-2xl p-7">
              <p className="mb-6 text-lg leading-relaxed text-white/80">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 font-semibold text-white shadow-[0_0_18px_rgba(168,85,247,0.5)]">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-white/50">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA band ---------- */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-600/20 via-fuchsia-600/10 to-cyan-500/10 px-8 py-16 text-center backdrop-blur">
          <div className="absolute inset-0 neon-grid opacity-30" />
          <h2 className="relative text-4xl font-bold md:text-5xl neon-text">Ready to light up your ideas?</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/70">
            Join a room and start drawing in seconds. Free, fast, and beautifully neon.
          </p>
          <Link
            href="/auth"
            className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-base font-semibold text-white shadow-[0_0_35px_rgba(168,85,247,0.6)] transition hover:scale-[1.04] hover:shadow-[0_0_55px_rgba(168,85,247,0.9)]"
          >
            Launch the canvas
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="relative z-10 border-t border-white/10 bg-black/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
              <PenTool className="h-4 w-4 text-white" />
            </span>
            <span className="font-bold">Excel.Draw</span>
          </div>
          <p className="text-sm text-white/50">&copy; 2026 Excel.Draw. Crafted with neon.</p>
          <div className="flex gap-4 text-white/60">
            <a href="https://github.com/sanyamhbtu/ExcelDraw" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition hover:text-white"><Github className="h-5 w-5" /></a>
            <a href="https://x.com/SanyamJain__04" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="transition hover:text-white"><Twitter className="h-5 w-5" /></a>
            <a href="https://www.linkedin.com/in/sanyam-jain-1425611b9/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition hover:text-white"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
