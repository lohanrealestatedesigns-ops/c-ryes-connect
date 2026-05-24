export type AppStatus =
  | "PENDING_REVIEW"
  | "SHORTLISTED_FOR_INTERVIEW"
  | "ALLOCATED_TO_TRAINING_HUB"
  | "EQUIPMENT_DISBURSAL";

export interface Application {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  lga: string;
  gender: string;
  qualification: string;
  employment: string;
  track: string;
  consentedAt: string;
  status: AppStatus;
}

const KEY = "cryes_applications_v1";

export function loadAll(): Application[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveApplication(a: Omit<Application, "id" | "status" | "consentedAt">): Application {
  const all = loadAll();
  const id = "CRYES-" + Date.now().toString(36).toUpperCase().slice(-6) + "-" + Math.floor(Math.random() * 900 + 100);
  const rec: Application = {
    ...a,
    id,
    status: "PENDING_REVIEW",
    consentedAt: new Date().toISOString(),
  };
  all.push(rec);
  localStorage.setItem(KEY, JSON.stringify(all));
  return rec;
}

export function findByPhoneOrId(q: string): Application | undefined {
  const norm = q.trim().toLowerCase();
  if (!norm) return undefined;
  return loadAll().find(
    (a) => a.id.toLowerCase() === norm || a.phone.replace(/\s+/g, "") === norm.replace(/\s+/g, ""),
  );
}

export const LGAS = [
  "Abi","Akamkpa","Akpabuyo","Bakassi","Bekwarra","Biase","Boki","Calabar Municipal","Calabar South",
  "Etung","Ikom","Obanliku","Obubra","Obudu","Odukpani","Ogoja","Yakurr","Yala",
];

export const TRACKS = {
  "Digital Tracks": [
    "Artificial Intelligence & Data Analytics",
    "Cyber Security",
    "AI Video Editing & Animation",
  ],
  "Technical Tracks": [
    "Solar Installation",
    "CCTV Security Systems",
    "Mobile/Laptop Engineering",
    "Diagnostic Auto Technician",
  ],
  "Creative & Trades": [
    "Epoxy Flooring & 3D Walls",
    "POP & Interior Decoration",
    "Fashion Designing",
    "Professional Catering",
    "Beauty & Cosmetology",
  ],
  "Production Tracks": [
    "Animal Feed Production",
    "Food Processing",
    "Beverage Production",
  ],
} as const;
