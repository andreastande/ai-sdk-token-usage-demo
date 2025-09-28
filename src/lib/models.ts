import type { Model } from "../types/model"

export const models: Model[] = [
  {
    id: "openai/gpt-5",
    name: "GPT-5",
    price: {
      input: 1.25,
      output: 10,
      cachedRead: 0.125,
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
      input: 0.25,
      output: 2,
      cachedRead: 0.025,
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
      input: 0.05,
      output: 0.4,
      cachedRead: 0.005,
    },
    tokenLimits: {
      context: 400000,
      output: 128000,
    },
  },
]
