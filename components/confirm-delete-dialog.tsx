"use client";

import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { TrashIcon } from "@radix-ui/react-icons";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { deleteContact } from "@/app/_actions/contacts";

interface ConfirmDeleteDialogProps {
  id: number;
}

const ConfirmDeleteDialog = ({ id }: ConfirmDeleteDialogProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function onDelete() {
    // delete contact and create a toast message
    startTransition(async () => {
      try {
        await deleteContact(id);

        setOpen(false);

        toast({
          title: "Contact deleted",
          description: "Contact has been deleted successfully.",
        });
        router.refresh();
      } catch (error) {
        toast({
          title: "An error occurred",
          description: "Unable to delete contact. Please try again.",
        });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full text-red-500 bg-red-100 hover:bg-red-200 shadow-none aspect-square p-0">
          <TrashIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-red-500 hover:bg-red-600"
            onClick={() => onDelete()}
            disabled={isPending}
          >
            Delete Record
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
