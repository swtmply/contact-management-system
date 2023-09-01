import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { Contact } from "@/lib/types";
import { revalidatePath } from "next/cache";

// Create an API for GET
export async function GET() {
  const data = await fs.readFile("./lib/contacts.json");
  const contacts = JSON.parse(data.toString());

  return NextResponse.json(contacts);
}

// Create an API for POST
export async function POST(request: Request) {
  const body = await request.json();
  const data = await fs.readFile("./lib/contacts.json");
  const contacts = JSON.parse(data.toString());

  contacts.push({ id: contacts.length + 1, ...body });

  await fs.writeFile("./lib/contacts.json", JSON.stringify(contacts));

  revalidatePath("/");
  return NextResponse.json({ message: "Contact added successfully" });
}

// Create an API for PUT
export async function PUT(request: Request) {
  const body = await request.json();
  const data = await fs.readFile("./lib/contacts.json");
  const contacts: Contact[] = JSON.parse(data.toString());

  const index = contacts.findIndex((c: Contact) => c.id === body.id);

  contacts[index] = body;

  await fs.writeFile("./lib/contacts.json", JSON.stringify(contacts));

  revalidatePath("/");
  return NextResponse.json({ message: "Contact updated successfully" });
}

// Create an API for DELETE
export async function DELETE(request: Request) {
  const body = await request.json();
  const data = await fs.readFile("./lib/contacts.json");
  const contacts: Contact[] = JSON.parse(data.toString());

  const index = contacts.findIndex((c: Contact) => c.id === body.id);

  contacts.splice(index, 1);

  await fs.writeFile("./lib/contacts.json", JSON.stringify(contacts));

  revalidatePath("/");
  return NextResponse.json({ message: "Contact deleted successfully" });
}
