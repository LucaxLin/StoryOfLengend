import { PersistData } from './../Types/PersistData'
import { CharacterData } from './../Types/Character'

export function createDefaultData(characterData: CharacterData): PersistData {
  return {
    ...characterData,
    curHp: characterData.maxHp,
    curEnergy: characterData.maxEnergy,
    lastScene: 'AdventureMap',
    createTime: Date.now(),
    updateTime: Date.now(),
    level: 1
  }
}
