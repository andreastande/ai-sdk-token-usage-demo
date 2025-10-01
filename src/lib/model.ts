import { models } from "@/constants/models"

export function getModelById(id: string) {
  return models.find((model) => model.id === id)!
}

export function getModelByName(name: string) {
  return models.find((model) => model.name === name)!
}

export function getModels() {
  return models
}
