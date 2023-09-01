"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Contact } from "@/lib/types";
import { TrashIcon } from "@radix-ui/react-icons";
import EditContactFormDialog from "../edit-contact-form-dialog";

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

        <Button className="rounded-full text-red-500 bg-red-100 hover:bg-red-200 shadow-none aspect-square p-0">
          <TrashIcon />
        </Button>
      </div>
    ),
  },
];
