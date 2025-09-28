"use client"

import { useChat } from "@ai-sdk/react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getModelByName } from "@/lib/utils"

export default function Chat() {
  const [modelName, setModelName] = useState("GPT-5")
  const [input, setInput] = useState("")

  const { messages, sendMessage } = useChat()

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
          sendMessage({ text: input }, { body: { model: getModelByName(modelName).id } })
          setInput("")
        }}
        className="fixed bottom-0 w-full max-w-2xl px-2 mb-8"
      >
        <div className="flex items-center space-x-2">
          <Select defaultValue="GPT-5" value={modelName} onValueChange={setModelName}>
            <SelectTrigger className="w-[130px]">
              <SelectValue>{modelName}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GPT-5">GPT-5</SelectItem>
              <SelectItem value="GPT-5 mini">GPT-5 mini</SelectItem>
              <SelectItem value="GPT-5 nano">GPT-5 nano</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Say something..."
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            className="flex-1"
          />
        </div>
      </form>
    </div>
  )
}
