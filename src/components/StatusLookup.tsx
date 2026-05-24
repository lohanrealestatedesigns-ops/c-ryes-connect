import { useState } from "react";
import { Search, CheckCircle2, Clock, GraduationCap, PackageCheck, AlertCircle } from "lucide-react";
import { findByPhoneOrId, type Application } from "@/lib/applications";

const STATUS_META: Record<Application["status"], { label: string; icon: any; tone: string }> = {
  PENDING_REVIEW: { label: "Pending Review", icon: Clock, tone: "bg-amber-100 text-amber-900 border-amber-300" },
  SHORTLISTED_FOR_INTERVIEW: { label: "Shortlisted for Interview", icon: CheckCircle2, tone: "bg-blue-100 text-blue-900 border-blue-300" },
  ALLOCATED_TO_TRAINING_HUB: { label: "Allocated to Training Hub", icon: GraduationCap, tone: "bg-emerald-100 text-emerald-900 border-emerald-300" },
  EQUIPMENT_DISBURSAL: { label: "Equipment Disbursal", icon: PackageCheck, tone: "bg-[oklch(0.93_0.06_85)] text-[var(--gold-foreground)] border-[var(--gold)]" },
};

export function StatusLookup({ compact = false }: { compact?: boolean }) {
  const [q, setQ] = useState("");
  const [result, setResult] = useState<Application | null | undefined>(undefined);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const safe = q.replace(/[^0-9A-Za-z+\-]/g, "").slice(0, 40);
    if (!safe) return;
    setResult(findByPhoneOrId(safe) ?? null);
  }

  return (
    <div className={compact ? "" : "bg-card border border-border rounded-xl p-6 shadow-sm"}>
      {!compact && (
        <div className="mb-4">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--gold-foreground)]/70 font-semibold">Verification Panel</div>
          <h3 className="font-display text-xl text-primary mt-1">Track Your Application</h3>
        </div>
      )}
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Phone number or Application ID"
          maxLength={40}
          className="flex-1 px-4 py-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button type="submit" className="px-4 py-3 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-[var(--deep)] flex items-center gap-2">
          <Search className="h-4 w-4" /> Check
        </button>
      </form>

      {result === null && (
        <div className="mt-4 flex items-start gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md p-3">
          <AlertCircle className="h-4 w-4 mt-0.5" />
          <span>No application found. Please verify your Phone Number or Application ID.</span>
        </div>
      )}
      {result && (
        <StatusCard app={result} />
      )}
    </div>
  );
}

export function StatusCard({ app }: { app: Application }) {
  const meta = STATUS_META[app.status];
  const Icon = meta.icon;
  return (
    <div className="mt-4 border border-border rounded-lg overflow-hidden bg-background">
      <div className="px-4 py-3 bg-secondary flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Application ID</div>
          <div className="font-mono text-sm font-semibold text-primary">{app.id}</div>
        </div>
        <div className={`px-3 py-1.5 text-xs font-semibold rounded-full border flex items-center gap-1.5 ${meta.tone}`}>
          <Icon className="h-3.5 w-3.5" />
          {meta.label}
        </div>
      </div>
      <div className="p-4 grid sm:grid-cols-2 gap-3 text-sm">
        <Detail label="Full Name" value={app.fullName} />
        <Detail label="Phone" value={app.phone} />
        <Detail label="LGA of Origin" value={app.lga} />
        <Detail label="Selected Track" value={app.track} />
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="font-medium text-foreground">{value}</div>
    </div>
  );
}
