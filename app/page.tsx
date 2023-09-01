import { Button } from "@/components/ui/button";
import Link from "next/link";

import { DataTable } from "@/components/data-table/data-table";
import { contactColumns } from "@/components/data-table/colums";

export default async function Home() {
  // Fetch the contacts data from the API
  const contacts = await fetch("http://localhost:3000/api/contact", {
    cache: "no-store",
  }).then((res) => res.json());

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
        <DataTable columns={contactColumns} data={contacts} />
      </div>
    </main>
  );
}
