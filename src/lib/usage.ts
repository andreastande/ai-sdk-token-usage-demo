import type { LanguageModelUsage } from "ai"
import { BILLABLE_KEYS, type BillableToken, type NormalizedUsage } from "@/types/message"
import { getModelById } from "./model"

export function computeMessageCostUSD(modelId: string, totalUsage: LanguageModelUsage): NormalizedUsage {
  const model = getModelById(modelId)
  const usage = normalizeTokenUsage(totalUsage)

  const priceFor = {
    inputTokens: model.price.inputTokens,
    outputTokens: model.price.outputTokens,
    reasoningTokens: model.price.outputTokens,
    cachedInputTokens: model.price.cachedInputTokens,
  }

  const costs: NormalizedUsage = {}

  for (const [kind, amount] of Object.entries(usage) as [BillableToken, number][]) {
    costs[kind] = (amount / 1_000_000) * priceFor[kind]
  }

  return costs
}

export function normalizeTokenUsage(totalUsage: LanguageModelUsage): NormalizedUsage {
  const acc: NormalizedUsage = {}

  for (const k of BILLABLE_KEYS) {
    const v = totalUsage[k]
    if (typeof v === "number" && v !== 0) {
      acc[k] = v
    }
  }

  return acc
}
