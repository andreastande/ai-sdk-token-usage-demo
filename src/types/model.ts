export interface Model {
  id: string
  name: string
  price: {
    inputTokens: number
    outputTokens: number
    cachedInputTokens: number
  }
  tokenLimits: {
    context: number
    output: number
  }
}
