import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCombatantStore = defineStore('combatants', () => {
  const combatants =[]
  function addCombatant(obj) {
    
    combatants.push(obj)
    console.log(combatants)
  }

  return { combatants, addCombatant }
})
