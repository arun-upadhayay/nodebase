import Ky, { type Options as KyOptions } from "ky";

import { NodeExecutor } from "@/features/executions/types";

import { NonRetriableError } from "inngest";

type HttpRequestData = {
  variableName?: string;
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
};

export const HttpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
  data,
  nodeId,
  context,
  step,
}) => {
  // TODO publishp "loading" state for http trigger

  if (!data.endpoint) {
    // TODO: Publish "error" state for http request
    throw new NonRetriableError("HTTP request node: No endpoint configured");
  }
  if (!data.variableName) {
    // TODO: Publish "error" state for http request
    throw new NonRetriableError("Variable name not configured");
  }

  const result = await step.run("http-request", async () => {
    const endpoint = data.endpoint!;
    const method = data.method || "GET";
    const options: KyOptions = {
      method,
    };

    if (["POST", "PUT", "PATCH"].includes(method)) {
      //   if (data.body) {
      //     options.body = data.body;
      //   }
      options.body = data.body;
      options.headers = {
        "Content-Type": "application/json",
      };
    }
    const response = await Ky(endpoint, options);
    const contentType = response.headers.get("content-type");
    const responseData = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    const responsePayload = {
      httpResponse: {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
      },
    };

    if (data.variableName) {
      return {
        ...context,
        [data.variableName]: responsePayload,
      };
    }
    // Fallback to direct http response fpr backward compatibility
    return {
      ...context,
      ...responsePayload,
    };
  });

  //TODO: Publish "success" state for http trigger

  return result;
};
