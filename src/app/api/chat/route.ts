import { convertToModelMessages, streamText, type UIMessage } from "ai"
import { computeMessageCostUSD, normalizeTokenUsage } from "@/lib/usage"
import type { MessageMetadata } from "@/types/message"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, modelId }: { messages: UIMessage[]; modelId: string } = await req.json()

  const result = streamText({
    model: modelId,
    messages: convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse({
    messageMetadata: ({ part }) => {
      if (part.type === "finish") {
        return {
          modelId,
          usage: {
            tokens: normalizeTokenUsage(part.totalUsage),
            cost: computeMessageCostUSD(modelId, part.totalUsage),
          },
        } as MessageMetadata
      }
    },
  })
}
