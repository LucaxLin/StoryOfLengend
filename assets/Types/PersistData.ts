import { CharacterData } from './Character'
export interface PersistData extends CharacterData {
  // Add any additional properties that need to be persisted here
  curHp: number
  curEnergy: number
  lastScene: string
  createTime: number
  updateTime: number
  level: number
}
