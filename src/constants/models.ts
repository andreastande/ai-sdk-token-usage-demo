import type { Model } from "../types/model"

export const models: Model[] = [
  {
    id: "openai/gpt-5",
    name: "GPT-5",
    price: {
      inputTokens: 1.25,
      outputTokens: 10,
      cachedInputTokens: 0.125,
    },
    tokenLimits: {
      context: 400000,
      output: 128000,
    },
  },
  {
    id: "openai/gpt-5-mini",
    name: "GPT-5 mini",
    price: {
      inputTokens: 0.25,
      outputTokens: 2,
      cachedInputTokens: 0.025,
    },
    tokenLimits: {
      context: 400000,
      output: 128000,
    },
  },
  {
    id: "openai/gpt-5-nano",
    name: "GPT-5 nano",
    price: {
      inputTokens: 0.05,
      outputTokens: 0.4,
      cachedInputTokens: 0.005,
    },
    tokenLimits: {
      context: 400000,
      output: 128000,
    },
  },
]
