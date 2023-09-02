"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Contact } from "@/lib/types";
import EditContactFormDialog from "../edit-contact-form-dialog";
import ConfirmDeleteDialog from "../confirm-delete-dialog";

export const contactColumns: ColumnDef<Contact>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center space-x-1">
        <EditContactFormDialog contact={row.original} />
        <ConfirmDeleteDialog id={row.original.id} />
      </div>
    ),
  },
];
