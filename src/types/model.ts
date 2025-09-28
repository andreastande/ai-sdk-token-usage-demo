import type { LanguageModelV2Usage } from "@ai-sdk/provider"

export interface Model {
  id: string
  name: string
  tokenLimits: {
    context: number
    output: number
  }
  price: {
    input: number
    output: number
    cachedRead: number
  }
}

export type UsageCostBreakdown = Omit<
  { [K in keyof LanguageModelV2Usage as Exclude<K, "totalTokens">]-?: number },
  never
>
