"use client";

import { useState } from "react";
import { AddContactForm } from "./forms/add-contact-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const AddContactFormDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Contact</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Contact</DialogTitle>
        </DialogHeader>
        <AddContactForm closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddContactFormDialog;
