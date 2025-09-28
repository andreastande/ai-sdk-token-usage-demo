import { convertToModelMessages, streamText, type UIMessage } from "ai"
import { calculateCostUSD, getModelById } from "@/lib/utils"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, model }: { messages: UIMessage[]; model: string } = await req.json()

  const result = streamText({
    model,
    messages: convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse({
    messageMetadata: ({ part }) => {
      if (part.type === "finish") {
        return {
          usage: part.totalUsage,
          cost: calculateCostUSD({ model: getModelById(model), totalUsage: part.totalUsage }),
        }
      }
    },
  })
}
