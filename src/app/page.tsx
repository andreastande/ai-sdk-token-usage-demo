"use client"

import { useChat } from "@ai-sdk/react"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getModelById, getModelByName, getModels } from "@/lib/model"
import type { UIMessage } from "@/types/message"

export default function Chat() {
  const [selectedModel, setSelectedModel] = useState(getModelById("openai/gpt-5"))
  const [input, setInput] = useState("")

  const { messages, sendMessage, status } = useChat<UIMessage>()

  useEffect(() => {
    if (status === "ready" && messages.length) {
      const lastAssistantResponse = messages.findLast((msg) => msg.role === "assistant")
      if (lastAssistantResponse) {
        console.log("metadata for last message: ", lastAssistantResponse.metadata)
      }
    }
  }, [status, messages])

  return (
    <div className="flex flex-col w-full max-w-2xl py-24 mx-auto stretch space-y-14">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return <div key={`${message.id}-${i}`}>{part.text}</div>
            }
          })}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage({ text: input }, { body: { modelId: selectedModel.id } })
          setInput("")
        }}
        className="fixed bottom-0 w-full max-w-2xl px-2 mb-8"
      >
        <div className="flex items-center space-x-2">
          <Select
            defaultValue="GPT-5"
            value={selectedModel.name}
            onValueChange={(value) => setSelectedModel(getModelByName(value))}
          >
            <SelectTrigger className="w-[130px] bg-background">
              <SelectValue>{selectedModel.name}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {getModels().map((model) => (
                <SelectItem key={model.id} value={model.name}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Say something..."
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            className="flex-1 bg-background"
          />
        </div>
      </form>
    </div>
  )
}
