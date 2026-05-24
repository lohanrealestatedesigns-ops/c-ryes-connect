import { createFileRoute } from "@tanstack/react-router";
import { StatusLookup } from "@/components/StatusLookup";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "Track Application — C-RYES" },
      { name: "description", content: "Check your C-RYES application status in real-time." },
    ],
  }),
  component: StatusPage,
});

function StatusPage() {
  return (
    <>
      <section className="bg-[var(--deep)] text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-semibold">Verification Panel</div>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Track Your Application</h1>
          <p className="mt-3 text-primary-foreground/80 max-w-2xl">
            Enter the Phone Number used during registration, or your unique
            Application ID, to see your current verification stage.
          </p>
        </div>
        <div className="h-1 gold-shine" />
      </section>
      <section className="max-w-3xl mx-auto px-4 py-12">
        <StatusLookup />

        <div className="mt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3">Stages</div>
          <ol className="space-y-2 text-sm">
            {[
              ["PENDING_REVIEW", "Submission received; awaiting initial verification."],
              ["SHORTLISTED_FOR_INTERVIEW", "Cleared first review; scheduled for interview."],
              ["ALLOCATED_TO_TRAINING_HUB", "Placed in your selected training hub."],
              ["EQUIPMENT_DISBURSAL", "Graduated; equipment and start-up tools released."],
            ].map(([code, desc]) => (
              <li key={code} className="flex gap-3 p-3 rounded-md bg-card border border-border">
                <span className="font-mono text-[11px] text-primary font-bold whitespace-nowrap">{code}</span>
                <span className="text-muted-foreground">{desc}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
