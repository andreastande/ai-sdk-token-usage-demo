import type { LanguageModelV2Usage } from "@ai-sdk/provider"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Model, UsageCostBreakdown } from "@/types/model"
import { models } from "./models"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getModelById(id: string) {
  return models.find((model) => model.id === id)!
}

export function getModelByName(name: string) {
  return models.find((model) => model.name === name)!
}

export function calculateCostUSD({
  model,
  totalUsage,
}: {
  model: Model
  totalUsage: LanguageModelV2Usage
}): UsageCostBreakdown {
  const costBreakdown = {
    inputTokens: 0,
    outputTokens: 0,
    reasoningTokens: 0,
    cachedInputTokens: 0,
  }

  for (const [tokenType, amount] of Object.entries(totalUsage) as [keyof LanguageModelV2Usage, number | undefined][]) {
    if (!amount) continue

    if (tokenType === "inputTokens") {
      costBreakdown.inputTokens = amount * model.price.input
    } else if (tokenType === "outputTokens") {
      costBreakdown.outputTokens = amount * model.price.output
    } else if (tokenType === "reasoningTokens") {
      costBreakdown.reasoningTokens = amount * model.price.output
    } else if (tokenType === "cachedInputTokens") {
      costBreakdown.cachedInputTokens = amount * model.price.cachedRead
    }
  }

  return costBreakdown
}

export function getTotalCostUSD(usageCost: UsageCostBreakdown) {
  return Object.values(usageCost).reduce((sum, cost) => sum + cost, 0)
}
