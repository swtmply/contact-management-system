import EditContactFormDialog from "@/components/edit-contact-form-dialog";
import { Button } from "@/components/ui/button";

export default async function ContactPage({
  params,
}: {
  params: { id: string };
}) {
  const contact = await fetch(
    `http://localhost:3000/api/contact/${params.id}`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full">
        <div className="flex justify-between mb-4">
          <p className="text-xl font-bold">{contact.name}</p>
          <EditContactFormDialog
            contact={contact}
            trigger={<Button>Edit Contact</Button>}
          />
        </div>
        <div className="space-y-4">
          {Object.keys(contact)
            .slice(2, Object.keys(contact).length)
            .map((key) => (
              <div className="flex mb-2 items-center" key={key}>
                <p className="w-1/3 font-medium capitalize">{key}</p>
                <p className="w-2/3 text-slate-500 border border-slate-200 rounded-md py-2 px-4 text-sm">
                  {contact[key]}
                </p>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
