"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface DrawerProps extends React.ComponentProps<typeof Dialog> {
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

const Drawer = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  DrawerProps
>(({ className, side = "right", children, ...props }, ref) => {
  return (
    <Dialog {...props}>
      <DialogContent
        ref={ref}
        className={cn(
          "fixed inset-0 z-50",
          side === "top" && "top-0 left-0 right-0",
          side === "right" && "right-0 top-0 bottom-0",
          side === "bottom" && "bottom-0 left-0 right-0",
          side === "left" && "left-0 top-0 bottom-0",
          className
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
});
Drawer.displayName = "Drawer";

const DrawerTrigger = DialogTrigger;
const DrawerClose = DialogClose;

export { Drawer, DrawerTrigger, DrawerClose };
