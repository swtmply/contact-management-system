"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Contact } from "@/lib/types";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

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
    cell: (row) => (
      <div className="flex items-center space-x-1">
        <Button className="rounded-full text-slate-500 bg-slate-100 hover:bg-slate-200 shadow-none aspect-square p-0">
          <Pencil1Icon />
        </Button>
        <Button className="rounded-full text-red-500 bg-red-100 hover:bg-red-200 shadow-none aspect-square p-0">
          <TrashIcon />
        </Button>
      </div>
    ),
  },
];
