import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sun, Truck, Sprout, Trophy, Cpu, Briefcase, HardHat, ChevronDown, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About C-RYES — Empowering Dreams, Building Our Future" },
      { name: "description", content: "Discover the 7 Pillars of Transformation powering the Cross River Youth Empowerment Scheme." },
    ],
  }),
  component: AboutPage,
});

const PILLARS = [
  {
    icon: Sun,
    title: "Renewable Energy",
    summary: "Building Cross River's green workforce.",
    detail:
      "Train as a certified solar technician, micro-grid installer, and clean-energy systems engineer. Graduates are positioned to power homes, schools, and SMEs across the state with sustainable, off-grid solutions.",
  },
  {
    icon: Truck,
    title: "Transportation & Logistics",
    summary: "Fueling commerce and mobility.",
    detail:
      "Modern fleet management, last-mile logistics operations, professional driving certification, and dispatch coordination — preparing youth for jobs across regional and national supply chains.",
  },
  {
    icon: Sprout,
    title: "Modern Agriculture",
    summary: "Climate-smart farming for a prosperous state.",
    detail:
      "Precision agriculture, greenhouse management, aquaculture, and agro-processing. Trainees receive seed capital and machinery to launch commercial farms anchored in data and sustainability.",
  },
  {
    icon: Trophy,
    title: "Sports Excellence",
    summary: "From local talent to global stages.",
    detail:
      "Identification, structured coaching, and direct sponsorship pathways into European professional sports academies. A first-of-its-kind investment in the athletic future of our youth.",
  },
  {
    icon: Cpu,
    title: "Digital / ICT Mastery",
    summary: "Where Cross River meets the global tech economy.",
    detail:
      "AI engineering, cybersecurity, mobile and web app development, video editing & animation. Graduates are equipped to win remote contracts and build homegrown technology companies.",
  },
  {
    icon: Briefcase,
    title: "Small Scale Business Development",
    summary: "Founders, by design.",
    detail:
      "Business modeling, bookkeeping, digital marketing, regulatory compliance, and access to microfinance — turning skilled hands into self-sustaining enterprises.",
  },
  {
    icon: HardHat,
    title: "Modern Construction",
    summary: "Building the cities of tomorrow.",
    detail:
      "Advanced finishing, epoxy flooring, POP, interior decoration, and modular construction techniques aligned with international building standards.",
  },
];

function AboutPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <section className="bg-[var(--deep)] text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-semibold">About Us</div>
          <h1 className="mt-3 font-display text-4xl md:text-5xl max-w-3xl leading-tight">
            Empowering Dreams, Building Our Future.
          </h1>
          <p className="mt-5 text-primary-foreground/80 max-w-3xl leading-relaxed">
            C-RYES is the flagship empowerment programme of the Cross River State
            Government under His Excellency Governor Bassey Edet Otu. It is structured
            around seven deliberate pillars — each engineered to convert latent
            potential into measurable prosperity across our 18 Local Government Areas.
          </p>
        </div>
        <div className="h-1 gold-shine" />
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.25em] text-primary font-bold">The Framework</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              The 7 Pillars of Transformation
            </h2>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
              Every pillar combines accredited training, market access, and
              equipment-on-graduation — ensuring every youth completes the
              programme prepared not just to work, but to lead.
            </p>
            <Link
              to="/apply"
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-md gold-shine text-[var(--gold-foreground)] font-semibold text-sm hover:brightness-105"
            >
              Select Your Pillar <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="lg:col-span-8 space-y-3">
            {PILLARS.map((p, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={p.title}
                  className={`border rounded-xl bg-card transition ${isOpen ? "border-[var(--gold)] shadow-md" : "border-border"}`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 p-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <p.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-[var(--gold-foreground)]/60">0{i + 1}</span>
                        <h3 className="font-display text-lg md:text-xl text-foreground truncate">{p.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{p.summary}</p>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180 text-primary" : ""}`} />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 pl-[88px] text-sm text-foreground/80 leading-relaxed border-t border-border pt-4">
                        {p.detail}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
