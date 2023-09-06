"use server";

// Create CRUD server actions for the Contact model from prisma
import { prisma } from "@/lib/db";
import { Contact, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type ContactInput = Pick<
  Contact,
  "name" | "email" | "phone" | "address"
>;

export const createContact = async (contact: ContactInput) => {
  try {
    await prisma.contact.create({ data: contact });

    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
};

export const getContacts = async () => {
  return await prisma.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getContact = async (id: number) => {
  const contact = await prisma.contact.findUnique({ where: { id } });
  if (!contact) {
    throw new Error(`Contact with ID ${id} does not exist in the database`);
  }
  return contact;
};

export const updateContact = async (id: number, contact: ContactInput) => {
  try {
    await prisma.contact.update({ where: { id }, data: contact });

    revalidatePath("/");
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        // handle case where the contact was not found
        console.error(`Contact with ID ${id} does not exist in the database`);
      }
    }
    throw error;
  }
};

export const deleteContact = async (id: number) => {
  try {
    await prisma.contact.delete({ where: { id } });

    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
};
