"use client";

import { useTransition } from "react";
import { deleteClientAction } from "../actions";

export default function DeleteClientButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [pending, startTransition] = useTransition();

  function onDelete() {
    if (
      !confirm(
        `Delete ${name} and all of their interactions? This cannot be undone.`
      )
    ) {
      return;
    }
    startTransition(async () => {
      await deleteClientAction(id);
    });
  }

  return (
    <button
      onClick={onDelete}
      disabled={pending}
      className="text-xs font-display font-medium disabled:opacity-50"
      style={{ color: "#c23030" }}
    >
      {pending ? "Deleting…" : `Delete ${name}`}
    </button>
  );
}
