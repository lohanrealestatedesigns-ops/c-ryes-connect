import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Check, ArrowLeft, ArrowRight, ShieldCheck, Copy } from "lucide-react";
import { LGAS, TRACKS, saveApplication, type Application } from "@/lib/applications";
import { StatusCard } from "@/components/StatusLookup";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply — C-RYES Registration" },
      { name: "description", content: "Register for the Cross River Youth Empowerment Scheme in 4 secure steps." },
    ],
  }),
  component: ApplyPage,
});

const STEPS = ["Identification", "Background", "Pathway", "Consent"] as const;

const step1Schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full legal name").max(80).regex(/^[A-Za-z][A-Za-z\s'’.\-]+$/, "Letters, spaces, hyphens only"),
  phone: z.string().trim().regex(/^(\+234|0)[789][01]\d{8}$/, "Enter a valid Nigerian phone number"),
  email: z.string().trim().email("Enter a valid email").max(120),
  lga: z.enum(LGAS as unknown as [string, ...string[]], { message: "Select your LGA" }),
  gender: z.enum(["Male", "Female"], { message: "Select gender" }),
});

const step2Schema = z.object({
  qualification: z.enum(["FSLC", "SSCE/WAEC", "OND/NCE", "HND/BSc", "MSc/PhD", "None"], { message: "Select qualification" }),
  employment: z.enum(["Unemployed", "Self-Employed", "Underemployed", "Student", "Employed"], { message: "Select employment status" }),
});

const step3Schema = z.object({
  track: z.string().min(2, "Select a pathway"),
});

const step4Schema = z.object({
  consent: z.literal(true, { message: "You must confirm to submit" }),
});

type FormState = {
  fullName: string; phone: string; email: string; lga: string; gender: string;
  qualification: string; employment: string;
  track: string;
  consent: boolean;
};

const INITIAL: FormState = {
  fullName: "", phone: "", email: "", lga: "", gender: "",
  qualification: "", employment: "",
  track: "",
  consent: false,
};

function ApplyPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Application | null>(null);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  function validateStep(): boolean {
    const schemas = [step1Schema, step2Schema, step3Schema, step4Schema];
    const res = schemas[step].safeParse(data as any);
    if (res.success) { setErrors({}); return true; }
    const errs: Record<string, string> = {};
    for (const i of res.error.issues) errs[i.path[0] as string] = i.message;
    setErrors(errs);
    return false;
  }

  function next() {
    if (!validateStep()) return;
    if (step < 3) setStep(step + 1);
    else submit();
  }

  function submit() {
    const rec = saveApplication({
      fullName: data.fullName.trim(),
      phone: data.phone.trim(),
      email: data.email.trim(),
      lga: data.lga, gender: data.gender,
      qualification: data.qualification, employment: data.employment,
      track: data.track,
    });
    setSubmitted(rec);
  }

  if (submitted) return <SuccessView app={submitted} />;

  return (
    <>
      <section className="bg-[var(--deep)] text-primary-foreground">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-semibold">Empowerment Registration</div>
          <h1 className="mt-3 font-display text-3xl md:text-4xl">Secure Application Wizard</h1>
          <p className="mt-2 text-primary-foreground/70 max-w-2xl text-sm">
            All data is collected under Cross River State verification rules.
            Provide accurate information — false entries lead to disqualification.
          </p>
        </div>
        <div className="h-1 gold-shine" />
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <Stepper step={step} />
        <div className="mt-8 bg-card border border-border rounded-xl shadow-sm p-6 md:p-8">
          {step === 0 && <Step1 data={data} set={set} errors={errors} />}
          {step === 1 && <Step2 data={data} set={set} errors={errors} />}
          {step === 2 && <Step3 data={data} set={set} errors={errors} />}
          {step === 3 && <Step4 data={data} set={set} errors={errors} />}

          <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
            <button
              type="button"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium border border-input disabled:opacity-40 hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              type="button"
              onClick={next}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold ${step === 3 ? "gold-shine text-[var(--gold-foreground)]" : "bg-primary text-primary-foreground hover:bg-[var(--deep)]"}`}
            >
              {step === 3 ? "Submit Application" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <ol className="grid grid-cols-4 gap-2">
      {STEPS.map((label, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <li key={label} className="flex flex-col gap-2">
            <div className={`h-1.5 rounded-full ${done || active ? "bg-primary" : "bg-border"}`} />
            <div className="flex items-center gap-2">
              <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                done ? "bg-primary text-primary-foreground" :
                active ? "bg-[var(--gold)] text-[var(--gold-foreground)]" :
                "bg-secondary text-muted-foreground"
              }`}>
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={`text-xs font-semibold ${active ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">{label}</div>
      {children}
      {error && <div className="text-xs text-destructive mt-1">{error}</div>}
    </label>
  );
}

const inputCls = "w-full px-3.5 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring";

function Step1({ data, set, errors }: any) {
  return (
    <div>
      <Heading title="Personal Identification" sub="Step 1 of 4 — confirm who you are." />
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Full Legal Name" error={errors.fullName}>
          <input className={inputCls} maxLength={80} value={data.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="e.g. Eyo Bassey Effiom" />
        </Field>
        <Field label="Phone Number" error={errors.phone}>
          <input className={inputCls} inputMode="tel" maxLength={14} value={data.phone} onChange={(e) => set("phone", e.target.value.replace(/[^\d+]/g, ""))} placeholder="080XXXXXXXX" />
        </Field>
        <Field label="Email Address" error={errors.email}>
          <input className={inputCls} type="email" maxLength={120} value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" />
        </Field>
        <Field label="LGA of Origin" error={errors.lga}>
          <select className={inputCls} value={data.lga} onChange={(e) => set("lga", e.target.value)}>
            <option value="">Select LGA…</option>
            {LGAS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </Field>
        <Field label="Gender" error={errors.gender}>
          <div className="flex gap-2">
            {["Male", "Female"].map((g) => (
              <button type="button" key={g} onClick={() => set("gender", g)}
                className={`flex-1 px-4 py-2.5 rounded-md border text-sm font-medium ${data.gender === g ? "border-primary bg-primary/5 text-primary" : "border-input hover:bg-secondary"}`}>
                {g}
              </button>
            ))}
          </div>
        </Field>
      </div>
    </div>
  );
}

function Step2({ data, set, errors }: any) {
  return (
    <div>
      <Heading title="Educational Context & Biography" sub="Step 2 of 4 — tell us where you're starting from." />
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Highest Qualification" error={errors.qualification}>
          <select className={inputCls} value={data.qualification} onChange={(e) => set("qualification", e.target.value)}>
            <option value="">Select qualification…</option>
            {["None","FSLC","SSCE/WAEC","OND/NCE","HND/BSc","MSc/PhD"].map((q) => <option key={q} value={q}>{q}</option>)}
          </select>
        </Field>
        <Field label="Current Employment Status" error={errors.employment}>
          <select className={inputCls} value={data.employment} onChange={(e) => set("employment", e.target.value)}>
            <option value="">Select status…</option>
            {["Unemployed","Self-Employed","Underemployed","Student","Employed"].map((q) => <option key={q} value={q}>{q}</option>)}
          </select>
        </Field>
      </div>
    </div>
  );
}

function Step3({ data, set, errors }: any) {
  return (
    <div>
      <Heading title="Pathway Selection" sub="Step 3 of 4 — choose ONE vocational or tech track." />
      {errors.track && <div className="text-xs text-destructive mb-3">{errors.track}</div>}
      <div className="space-y-6">
        {(Object.entries(TRACKS) as [string, readonly string[]][]).map(([cat, items]) => (
          <div key={cat}>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{cat}</div>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map((t) => {
                const active = data.track === t;
                return (
                  <button type="button" key={t} onClick={() => set("track", t)}
                    className={`text-left p-4 rounded-lg border transition relative ${active ? "border-[var(--gold)] bg-[var(--gold)]/10 shadow-md" : "border-border hover:border-primary/50 hover:bg-secondary"}`}>
                    {active && (
                      <div className="absolute top-2 right-2 h-5 w-5 rounded-full gold-shine flex items-center justify-center">
                        <Check className="h-3 w-3 text-[var(--gold-foreground)]" />
                      </div>
                    )}
                    <div className={`text-sm font-semibold ${active ? "text-primary" : "text-foreground"}`}>{t}</div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step4({ data, set, errors }: any) {
  const summary = useMemo(() => ([
    ["Full Name", data.fullName],
    ["Phone", data.phone],
    ["Email", data.email],
    ["LGA", data.lga],
    ["Gender", data.gender],
    ["Qualification", data.qualification],
    ["Employment", data.employment],
    ["Selected Track", data.track],
  ]), [data]);

  return (
    <div>
      <Heading title="Final Consent & Verification" sub="Step 4 of 4 — review and submit." />
      <div className="rounded-lg border border-border bg-secondary/40 p-5 grid sm:grid-cols-2 gap-3">
        {summary.map(([k, v]) => (
          <div key={k}>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{k}</div>
            <div className="text-sm font-medium">{v || <span className="text-destructive">— missing —</span>}</div>
          </div>
        ))}
      </div>

      <label className="mt-6 flex items-start gap-3 p-4 rounded-lg border border-input bg-background cursor-pointer hover:bg-secondary/50">
        <input
          type="checkbox" checked={data.consent} onChange={(e) => set("consent", e.target.checked)}
          className="mt-1 h-4 w-4 accent-[var(--primary)]"
        />
        <div className="text-sm">
          <div className="font-semibold flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" /> I confirm under state verification rules
          </div>
          <div className="text-muted-foreground mt-1 text-xs leading-relaxed">
            I declare that the information provided is true and accurate to the best of my
            knowledge. I understand that any false declaration will result in immediate
            disqualification and may attract penalties under Cross River State law.
          </div>
        </div>
      </label>
      {errors.consent && <div className="text-xs text-destructive mt-2">{errors.consent}</div>}
    </div>
  );
}

function Heading({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-2xl text-primary">{title}</h2>
      <p className="text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}

function SuccessView({ app }: { app: Application }) {
  function copyId() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(app.id);
    }
  }
  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 rounded-full gold-shine flex items-center justify-center shadow-lg">
          <Check className="h-8 w-8 text-[var(--gold-foreground)]" />
        </div>
        <h1 className="mt-6 font-display text-3xl md:text-4xl text-primary">Application Submitted</h1>
        <p className="mt-2 text-muted-foreground">
          Your registration has been received and is now <strong>PENDING_REVIEW</strong>.
          Save your Application ID — you'll need it to track progress.
        </p>
      </div>

      <div className="mt-8 bg-card border-2 border-[var(--gold)] rounded-xl p-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Your Application ID</div>
            <div className="font-mono text-2xl font-bold text-primary">{app.id}</div>
          </div>
          <button onClick={copyId} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-[var(--deep)]">
            <Copy className="h-4 w-4" /> Copy ID
          </button>
        </div>
        <StatusCard app={app} />
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/status" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md border border-input text-sm font-semibold hover:bg-secondary">
          Go to Tracking Panel
        </Link>
        <Link to="/" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-[var(--deep)]">
          Return Home
        </Link>
      </div>
    </section>
  );
}
