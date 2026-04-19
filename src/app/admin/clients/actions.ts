"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ClientStatus, InteractionType } from "@/lib/types";

// ─── Clients ─────────────────────────────────────────────────────────────────

export async function createClientAction(formData: FormData) {
  const supabase = await createClient();

  const raw = {
    name: String(formData.get("name") || "").trim(),
    business_name: String(formData.get("business_name") || "").trim(),
    email: String(formData.get("email") || "").trim() || null,
    phone: String(formData.get("phone") || "").trim() || null,
    city: String(formData.get("city") || "").trim() || null,
    state: String(formData.get("state") || "").trim() || null,
    industry: String(formData.get("industry") || "").trim() || null,
    first_contacted_at:
      String(formData.get("first_contacted_at") || "").trim() || null,
    status: (String(formData.get("status") || "lead") as ClientStatus) || "lead",
    notes: String(formData.get("notes") || "").trim() || null,
  };

  if (!raw.name || !raw.business_name) {
    throw new Error("Name and business name are required.");
  }

  const { data, error } = await supabase
    .from("clients")
    .insert(raw)
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/admin/clients");
  redirect(`/admin/clients/${data.id}`);
}

export async function updateClientAction(id: string, formData: FormData) {
  const supabase = await createClient();

  const raw = {
    name: String(formData.get("name") || "").trim(),
    business_name: String(formData.get("business_name") || "").trim(),
    email: String(formData.get("email") || "").trim() || null,
    phone: String(formData.get("phone") || "").trim() || null,
    city: String(formData.get("city") || "").trim() || null,
    state: String(formData.get("state") || "").trim() || null,
    industry: String(formData.get("industry") || "").trim() || null,
    first_contacted_at:
      String(formData.get("first_contacted_at") || "").trim() || null,
    status: (String(formData.get("status") || "lead") as ClientStatus) || "lead",
    notes: String(formData.get("notes") || "").trim() || null,
  };

  if (!raw.name || !raw.business_name) {
    throw new Error("Name and business name are required.");
  }

  const { error } = await supabase.from("clients").update(raw).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/admin/clients");
  revalidatePath(`/admin/clients/${id}`);
}

export async function deleteClientAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("clients").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/admin/clients");
  redirect("/admin/clients");
}

// ─── Interactions ────────────────────────────────────────────────────────────

export async function addInteractionAction(
  clientId: string,
  formData: FormData
) {
  const supabase = await createClient();

  const occurredAtRaw = String(formData.get("occurred_at") || "").trim();

  const raw = {
    client_id: clientId,
    type: String(formData.get("type") || "note") as InteractionType,
    occurred_at: occurredAtRaw ? new Date(occurredAtRaw).toISOString() : new Date().toISOString(),
    summary: String(formData.get("summary") || "").trim(),
    notes: String(formData.get("notes") || "").trim() || null,
  };

  if (!raw.summary) {
    throw new Error("Summary is required.");
  }

  const { error } = await supabase.from("interactions").insert(raw);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath(`/admin/clients/${clientId}`);
}

export async function updateInteractionAction(
  id: string,
  clientId: string,
  formData: FormData
) {
  const supabase = await createClient();

  const occurredAtRaw = String(formData.get("occurred_at") || "").trim();

  const raw = {
    type: String(formData.get("type") || "note") as InteractionType,
    occurred_at: occurredAtRaw
      ? new Date(occurredAtRaw).toISOString()
      : new Date().toISOString(),
    summary: String(formData.get("summary") || "").trim(),
    notes: String(formData.get("notes") || "").trim() || null,
  };

  if (!raw.summary) {
    throw new Error("Summary is required.");
  }

  const { error } = await supabase
    .from("interactions")
    .update(raw)
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath(`/admin/clients/${clientId}`);
}

export async function deleteInteractionAction(
  id: string,
  clientId: string
) {
  const supabase = await createClient();
  const { error } = await supabase.from("interactions").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath(`/admin/clients/${clientId}`);
}
