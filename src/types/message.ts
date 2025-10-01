import type { UIMessage as UIMessageAI } from "ai"

export const BILLABLE_KEYS = ["inputTokens", "outputTokens", "reasoningTokens", "cachedInputTokens"] as const
export type BillableToken = (typeof BILLABLE_KEYS)[number]

export type NormalizedUsage = Partial<Record<BillableToken, number>>

export type MessageMetadata = {
  modelId: string
  usage: {
    tokens: NormalizedUsage
    cost: NormalizedUsage
  }
}

export type UIMessage = UIMessageAI<MessageMetadata>
