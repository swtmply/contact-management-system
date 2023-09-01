"use client";

import { useState } from "react";
import { EditContactForm } from "./forms/edit-contact-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Contact } from "@/lib/types";
import { Pencil1Icon } from "@radix-ui/react-icons";

interface EditContactFormDialogProps {
  contact: Contact;
}

const EditContactFormDialog = ({ contact }: EditContactFormDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full text-slate-500 bg-slate-100 hover:bg-slate-200 shadow-none aspect-square p-0">
          <Pencil1Icon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
        </DialogHeader>
        <EditContactForm closeDialog={() => setOpen(false)} contact={contact} />
      </DialogContent>
    </Dialog>
  );
};

export default EditContactFormDialog;
