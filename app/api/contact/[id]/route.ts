import { Contact } from "@/lib/types";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";

// Create an API for GET by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await fs.readFile("./lib/contacts.json");
  const contacts: Contact[] = JSON.parse(data.toString());

  const contact = contacts.find((c: Contact) => c.id === parseInt(params.id));

  return NextResponse.json(contact);
}
