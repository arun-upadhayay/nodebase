import { NodeType } from "@/generated/prisma";
import { NodeExecutor } from "../types";
import { manualTriggerExecutor } from "@/features/triggers/components/manual-trigger/executor";
import { HttpRequestExecutor } from "../components/http-request/executor";
import { GoogleFormTriggerExecutor } from "@/features/triggers/components/google-form-trigger/executor";

export const executorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: HttpRequestExecutor, // TODO: fix types
  [NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTriggerExecutor,
  [NodeType.STRIPE_TRIGGER]: GoogleFormTriggerExecutor
};


export const getExecutor = (type: NodeType): NodeExecutor => {
    const executor = executorRegistry[type];

    if (!executor) {
      throw new Error(`No executor found for type ${type}`);
    }

    return executor;
}