import { Link, Outlet } from "@tanstack/react-router";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

export function SiteShell() {
  const [open, setOpen] = useState(false);
  const nav = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About & Pillars" },
    { to: "/apply", label: "Apply" },
    { to: "/status", label: "Track Status" },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Executive Top Bar */}
      <div className="bg-[var(--deep)] text-primary-foreground text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-3 justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Shield className="h-3.5 w-3.5 text-[var(--gold)] shrink-0" />
            <span className="truncate">
              Official Portal of the Cross River State Government — His Excellency, Governor Bassey Edet Otu
            </span>
          </div>
          <span className="hidden md:inline text-[var(--gold)] font-medium tracking-wide">
            .gov.ng • Secure
          </span>
        </div>
      </div>
      <div className="h-1 gov-stripe" />

      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-card/90">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-display text-lg shadow-sm ring-1 ring-[var(--gold)]/40">
              C
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg text-primary">C-RYES</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Cross River Youth Empowerment
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-md hover:bg-secondary transition-colors"
                activeProps={{ className: "px-3 py-2 text-sm font-semibold text-primary bg-secondary rounded-md" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/apply"
              className="ml-2 px-4 py-2 text-sm font-semibold rounded-md gold-shine text-[var(--gold-foreground)] shadow-sm hover:brightness-105 transition"
            >
              Register
            </Link>
          </nav>

          <button
            className="md:hidden p-2 rounded-md hover:bg-secondary"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-4 py-3 flex flex-col gap-1">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 text-sm rounded-md hover:bg-secondary"
                  activeProps={{ className: "px-3 py-2 text-sm rounded-md bg-secondary text-primary font-semibold" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-[var(--deep)] text-primary-foreground">
        <div className="h-1 gold-shine" />
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-9 w-9 rounded-md bg-[var(--gold)] flex items-center justify-center text-[var(--gold-foreground)] font-display">
                C
              </div>
              <div className="font-display text-xl">C-RYES</div>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Cross River Youth Empowerment Scheme — A flagship initiative of the
              Cross River State Government under the People First Agenda.
            </p>
          </div>
          <div>
            <div className="uppercase text-xs tracking-[0.2em] text-[var(--gold)] mb-3">Quick Links</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-[var(--gold)]">7 Pillars of Transformation</Link></li>
              <li><Link to="/apply" className="hover:text-[var(--gold)]">Apply for Empowerment</Link></li>
              <li><Link to="/status" className="hover:text-[var(--gold)]">Application Status</Link></li>
            </ul>
          </div>
          <div>
            <div className="uppercase text-xs tracking-[0.2em] text-[var(--gold)] mb-3">State Motto</div>
            <p className="font-display text-lg leading-snug">
              "Skilled Hands. Empowered Minds. A Prosperous State."
            </p>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-primary-foreground/60 flex flex-wrap gap-2 justify-between">
            <span>© {new Date().getFullYear()} Cross River State Government. All rights reserved.</span>
            <span>Secure Civil Onboarding System • v1.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
