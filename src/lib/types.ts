export type ClientStatus =
  | "lead"
  | "active"
  | "completed"
  | "on_hold"
  | "churned";

export const CLIENT_STATUS_LABELS: Record<ClientStatus, string> = {
  lead: "Lead",
  active: "Active",
  completed: "Completed",
  on_hold: "On Hold",
  churned: "Churned",
};

export type Client = {
  id: string;
  name: string;
  business_name: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  industry: string | null;
  first_contacted_at: string | null;
  status: ClientStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type ProjectStatus =
  | "scoping"
  | "in_progress"
  | "completed"
  | "maintenance"
  | "paused"
  | "cancelled";

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  scoping: "Scoping",
  in_progress: "In Progress",
  completed: "Completed",
  maintenance: "Maintenance",
  paused: "Paused",
  cancelled: "Cancelled",
};

export type Project = {
  id: string;
  client_id: string;
  name: string;
  status: ProjectStatus;
  start_date: string | null;
  completion_date: string | null;
  project_fee_cents: number | null;
  monthly_fee_cents: number | null;
  tech_stack: string[] | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type InteractionType =
  | "call"
  | "email"
  | "meeting"
  | "text"
  | "work"
  | "note";

export const INTERACTION_TYPE_LABELS: Record<InteractionType, string> = {
  call: "Call",
  email: "Email",
  meeting: "Meeting",
  text: "Text",
  work: "Work",
  note: "Note",
};

export type Interaction = {
  id: string;
  client_id: string;
  project_id: string | null;
  type: InteractionType;
  occurred_at: string;
  summary: string;
  notes: string | null;
  created_at: string;
};

// ─── Invoices ────────────────────────────────────────────────────────────────

export type InvoiceStatus =
  | "draft"
  | "open"
  | "paid"
  | "uncollectible"
  | "void";

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  draft: "Draft",
  open: "Sent",
  paid: "Paid",
  uncollectible: "Uncollectible",
  void: "Void",
};

export type InvoiceLineItem = {
  description: string;
  amount_cents: number;
  quantity: number;
};

export type Invoice = {
  id: string;
  client_id: string;
  project_id: string | null;
  stripe_invoice_id: string | null;
  stripe_hosted_invoice_url: string | null;
  stripe_invoice_pdf: string | null;
  description: string | null;
  line_items: InvoiceLineItem[];
  amount_total_cents: number;
  currency: string;
  status: InvoiceStatus;
  due_date: string | null;
  sent_at: string | null;
  paid_at: string | null;
  memo: string | null;
  created_at: string;
  updated_at: string;
};
