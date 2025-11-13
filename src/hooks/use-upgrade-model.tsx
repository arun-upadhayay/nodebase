
"use client";
import { UpgradeModel } from "@/components/upgrade-model";
import { TRPCClientError } from "@trpc/client";
import { useState } from "react";


export const useUpgradeModel = () => {
  const [open, setOpen] = useState(false);

  const handleError = (e: unknown) => {
if(e instanceof TRPCClientError) {
    if (e.data?.code === "FORBIDDEN") {
      setOpen(true);
      return true
    }

    return false
}

  };

  const model = <UpgradeModel open={open} setOpen={setOpen} />;
  return { model, handleError };
};