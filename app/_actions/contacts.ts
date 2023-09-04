"use server";

// Create CRUD server actions for the Contact model from prisma
import { prisma } from "@/lib/db";
import { Contact } from "@prisma/client";

export type ContactInput = Pick<
  Contact,
  "name" | "email" | "phone" | "address"
>;

export const createContact = async (contact: ContactInput) => {
  return await prisma.contact.create({ data: contact });
};

export const getContacts = async () => {
  return await prisma.contact.findMany();
};

export const getContact = async (id: number) => {
  return await prisma.contact.findUnique({ where: { id } });
};

export const updateContact = async (id: number, contact: ContactInput) => {
  return await prisma.contact.update({ where: { id }, data: contact });
};

export const deleteContact = async (id: number) => {
  return await prisma.contact.delete({ where: { id } });
};
