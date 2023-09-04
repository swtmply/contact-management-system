"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useTransition } from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Contact } from "@prisma/client";
import { updateContact } from "@/app/_actions/contacts";

export const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[a-z]+$/, {
      message: "Email is not valid",
    }),
  phone: z
    .string({ required_error: "Phone is required" })
    .regex(/^\d+$/, { message: "Phone should not have alphabet characters." })
    .min(11, { message: "Phone must be at least 11 characters" }),
});

interface EditContactFormProps {
  closeDialog: () => void;
  contact: Contact;
}

export function EditContactForm({
  closeDialog,
  contact,
}: EditContactFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: contact,
  });

  function onSubmit(values: z.infer<typeof contactSchema>) {
    startTransition(async () => {
      try {
        await updateContact(contact.id, values);

        closeDialog();
        router.refresh();

        toast({
          title: "Contact added successfully",
          description: "Contact has been added successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone" {...field} maxLength={11} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
