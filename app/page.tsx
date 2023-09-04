import Link from "next/link";
import { DataTable } from "@/components/data-table/data-table";
import { contactColumns } from "@/components/data-table/colums";
import { getContacts } from "./_actions/contacts";

export default async function Home() {
  // Fetch the contacts data from the server actions
  const contacts = await getContacts();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full">
        <div className="flex justify-between mb-4">
          <Link href="/" className="text-xl font-bold">
            Contacts
          </Link>
        </div>

        <DataTable columns={contactColumns} data={contacts} />
      </div>
    </main>
  );
}
