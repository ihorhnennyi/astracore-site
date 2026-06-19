export const SERVICE_IDS = [
  'web',
  'ai',
  'telegram',
  'support',
  'consulting',
  'crm',
  'cloud',
  'security',
  'microgrid',
] as const

export const BENEFIT_IDS = [
  'automate',
  'reduceCosts',
  'productivity',
  'digitalServices',
  'ai',
  'infrastructure',
] as const

export const AUDIENCE_IDS = [
  'smb',
  'startups',
  'manufacturing',
  'education',
  'agencies',
  'ecommerce',
] as const

export const VALUE_IDS = ['innovation', 'results', 'partnership', 'security'] as const

export const STAT_IDS = ['projects', 'expertise', 'clients', 'uptime'] as const

export type ServiceId = (typeof SERVICE_IDS)[number]
export type BenefitId = (typeof BENEFIT_IDS)[number]
export type AudienceId = (typeof AUDIENCE_IDS)[number]
export type ValueId = (typeof VALUE_IDS)[number]
export type StatId = (typeof STAT_IDS)[number]
