

import { NodeExecutor } from "@/features/executions/types";
import { NodeType } from "@/generated/prisma";


type ManualTriggerData = Record<string, unknown>;

export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({
    nodeId,
    context,
    step
}) => {
   // TODO publishp "loading" state for manual trigger

   const result = await step.run("manual-trigger", async () => context);
   
   //TODO: Publish "success" state for manual trigger

   return result;
};        