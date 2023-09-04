import { ContactInput, getContact } from "@/app/_actions/contacts";
import EditContactFormDialog from "@/components/edit-contact-form-dialog";
import { Button } from "@/components/ui/button";

export default async function ContactPage({
  params,
}: {
  params: { id: string };
}) {
  // fetch contact by id using server actions
  const contact = await getContact(Number(params.id));

  if (contact === null) {
    return <div>Not found</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">{contact.name}</h1>
          <EditContactFormDialog
            contact={contact}
            trigger={<Button>Edit Contact</Button>}
          />
        </div>
        <div className="space-y-4">
          {Object.keys(contact)
            .slice(2, Object.keys(contact).length - 2)
            .map((key) => (
              <div className="flex mb-2 items-center" key={key}>
                <p className="w-1/3 font-medium capitalize">{key}</p>
                <p className="w-2/3 text-slate-500 border border-slate-200 rounded-md py-2 px-4 text-sm">
                  {contact[key as keyof ContactInput]}
                </p>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
