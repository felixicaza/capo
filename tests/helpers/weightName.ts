import { ElementWeights } from '../../src/capo/rules'

export function weightName(weight: number) {
  for (const key of Object.keys(ElementWeights)) {
    if (isNaN(Number(key)) && (ElementWeights as any)[key] === weight) return key
  }
  return `UNKNOWN(${weight})`
}
