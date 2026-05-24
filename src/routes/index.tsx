import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Wrench, Cog, Sparkles, ShieldCheck, Award, Users } from "lucide-react";
import { StatusLookup } from "@/components/StatusLookup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "C-RYES — The People First: Transforming Potential into Prosperity" },
      { name: "description", content: "Register for the Cross River Youth Empowerment Scheme. Hands-on mastery, startup equipment, and future-proof skills." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--deep)] text-primary-foreground">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[var(--gold)]/20 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-[var(--gold)]/40 backdrop-blur text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
              <span className="text-[var(--gold)] font-semibold tracking-wide">GOVERNOR'S PEOPLE FIRST AGENDA</span>
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-display leading-[1.05]">
              The People First:{" "}
              <span className="text-[var(--gold)] italic">Transforming Potential</span>{" "}
              into Prosperity.
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl leading-relaxed">
              The Cross River Youth Empowerment Scheme (C-RYES) is moving beyond
              traditional training to equip our youth with market-driven expertise,
              capital resources, and startup machinery.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/apply"
                className="group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md gold-shine text-[var(--gold-foreground)] font-bold text-sm uppercase tracking-[0.12em] shadow-lg shadow-black/20 hover:brightness-105 transition"
              >
                Register for Empowerment Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md border border-white/20 text-sm font-semibold hover:bg-white/5"
              >
                Explore the 7 Pillars
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-primary-foreground/60">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[var(--gold)]" /> State-Verified</span>
              <span className="flex items-center gap-2"><Award className="h-4 w-4 text-[var(--gold)]" /> Certified Pathways</span>
              <span className="flex items-center gap-2"><Users className="h-4 w-4 text-[var(--gold)]" /> 18 LGAs Covered</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-card text-foreground rounded-2xl shadow-2xl border border-[var(--gold)]/30 overflow-hidden">
              <div className="bg-secondary px-5 py-3 border-b border-border">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">Real-Time Verification</div>
                <div className="font-display text-lg text-primary">Track Your Application</div>
              </div>
              <div className="p-5">
                <StatusLookup compact />
                <p className="mt-3 text-xs text-muted-foreground">
                  Enter the Phone Number or Application ID issued at registration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Deck */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-[0.25em] text-primary font-bold">Why C-RYES</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-foreground">
            More than training. A complete launchpad.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Wrench,
              title: "Hands-On Mastery",
              body: "Practical, on-the-job training delivered by industry experts in modern workshops across the state — no theory-only programmes.",
            },
            {
              icon: Cog,
              title: "Start-Up Ready Equipment",
              body: "Graduates receive tools, machinery and seed kits required to begin earning income from day one of completion.",
            },
            {
              icon: Sparkles,
              title: "Future-Proof Skills",
              body: "Curriculum aligned with global market trends — AI, renewable energy, modern construction and beyond.",
            },
          ].map((f) => (
            <div key={f.title} className="group relative bg-card border border-border rounded-xl p-7 hover:border-[var(--gold)]/60 hover:shadow-lg transition">
              <div className="absolute top-0 left-7 right-7 h-0.5 gold-shine opacity-0 group-hover:opacity-100 transition" />
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-secondary border-y border-border">
        <div className="max-w-7xl mx-auto px-4 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-primary">Ready to claim your place?</h3>
            <p className="text-muted-foreground mt-1 text-sm">Registration takes under 4 minutes. State verification applies.</p>
          </div>
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-[var(--deep)] transition"
          >
            Begin Application <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
