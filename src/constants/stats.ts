import type { StatId } from './home'

export type StatConfig = {
  id: StatId
  value: number
  suffix: string
  decimals?: number
  progress: number
}

export const STATS: StatConfig[] = [
  { id: 'projects', value: 50, suffix: '+', progress: 0.88 },
  { id: 'expertise', value: 9, suffix: '+', progress: 0.72 },
  { id: 'clients', value: 30, suffix: '+', progress: 0.78 },
  { id: 'uptime', value: 99.9, suffix: '%', decimals: 1, progress: 0.999 },
]
