"use client";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { useTRPC } from "@/trpc/client";
import { caller } from "@/trpc/server";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const page =   () => {
  // await requireAuth();
  const trpc = useTRPC()

  // const data = await caller.getUsers();
  const testAi = useMutation(trpc.testAI.mutationOptions({
onSuccess: () => {
   toast.success("job queued");
}
  }));
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
    proctected server component
    {/* {JSON.stringify(data)} */}
      <Button variant={"destructive"} onClick={() => testAi}>test ai</Button>
    </div>
  );
};

export default page;
