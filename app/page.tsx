import { Button } from "@/components/ui/button";
import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { Contact } from "@/lib/types";
import { DataTable } from "@/components/data-table/data-table";

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
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full">
        <div className="flex justify-between mb-4">
          <Link href="/" className="text-xl font-bold">
            Contacts
          </Link>
          <Button>Add New Contact</Button>
        </div>

        {/* Render table using data table component and contact columns */}
        <DataTable columns={contactColumns} data={[]} />
      </div>
    </main>
  );
}
