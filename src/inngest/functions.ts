import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import * as Sentry from "@sentry/nextjs";


import { generateText } from "ai";

const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();

export const executeAi = inngest.createFunction(

  { id: "execute-ai" },
  { event: "execute/ai" },

  async ({ step }: any ) => {
    
    await step.sleep("Wait for 5 seconds", "5s");

    Sentry.logger.info("this is an info message", {log_source: "sentry_test"})
    console.warn("something is missing")
    console.log("this is an error i want to test ")
    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "You are a helpful assistant.",
        prompt: "Write a short story about a robot that loves cats.",
      experimental_telemetry:{
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      }
      
      }
    );

    const { steps: openaiSteps } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        model: openai("gpt-4"),
        system: "You are a helpful assistant.",
        prompt: "Write a short story about a robot that loves cats.",
              experimental_telemetry:{
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      }
      }
    );
    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        model: anthropic("claude-3-7-sonnet-latest"),
        system: "You are a helpful assistant.",
        prompt: "Write a short story about a robot that loves cats.",
            experimental_telemetry:{
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      }
      }
    );
    return {
      geminiSteps,
      openaiSteps,
      anthropicSteps,
    };
  }
);
