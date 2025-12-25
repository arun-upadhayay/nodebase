import Handlebars from "handlebars";
import Ky, { type Options as KyOptions } from "ky";

import { NodeExecutor } from "@/features/executions/types";

import { NonRetriableError } from "inngest";
import { httpRequestChannel } from "@/inngest/channels/http-request";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

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
  publish,
}) => {
  await publish(
    httpRequestChannel().status({
      nodeId,
      status: "loading",
    })
  );

  try {
    const result = await step.run("http-request", async () => {
      if (!data.endpoint) {
        await publish(
          httpRequestChannel().status({
            nodeId,
            status: "error",
          })
        );

        throw new NonRetriableError(
          "HTTP request node: No endpoint configured"
        );
      }
      if (!data.variableName) {
        await publish(
          httpRequestChannel().status({
            nodeId,
            status: "error",
          })
        );
        throw new NonRetriableError("Variable name not configured");
      }

      if (!data.method) {
        await publish(
          httpRequestChannel().status({
            nodeId,
            status: "error",
          })
        );
        throw new NonRetriableError("HTTP method name not configured");
      }
      const endpoint = Handlebars.compile(data.endpoint)(context);
      const method = data.method;
      const options: KyOptions = { method };

      if (["POST", "PUT", "PATCH"].includes(method)) {
        //   if (data.body) {
        //     options.body = data.body;
        //   }
        const resolved = Handlebars.compile(data.body || "{}")(context);
        console.log("yaha h error", resolved);
        JSON.parse(resolved);

        options.body = resolved;
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

      return {
        ...context,
        [data.variableName]: responsePayload,
      };
    });

    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "success",
      })
    );

    return result;
  } catch (error) {
    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "error",
      })
    );
    throw error;
  }
};
