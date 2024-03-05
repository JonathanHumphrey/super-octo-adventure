import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCombatantStore = defineStore('combatants', () => {
  const combatants =[
    {
      id: 0,
      name: 'Monster 1',
      initiativeRoll: 10,
      initiativeModifier: +1,
      healthPoints: 27,
      condition: ["Blinded"]
  
    }
  ]
  function addCombatant(obj) {
    
    this.combatants.push(obj)
    
    this.combatants = this.combatants.sort((a, b) => {
      // First, compare initiativeRoll
      if (a.initiativeRoll !== b.initiativeRoll) {
        return b.initiativeRoll - a.initiativeRoll; // Higher initiativeRoll goes first
      }
    
      // If there is a tie in initiativeRoll, compare initiativeModifier
      return b.initiativeModifier - a.initiativeModifier; // Higher initiativeModifier goes first
    });
    console.log(combatants)
  }
  function reduceHP(amount, combatant){
    let target = combatants.find(obj => obj.id === combatant);
    this.combatants[combatant].healthPoints = target.healthPoints - amount
    
  }
  function increaseHP(amount, combatant){
    let target = combatants.find(obj => obj.id === combatant);
    this.combatants[combatant].healthPoints = target.healthPoints + amount
    
  }
  function addCondition(condition, combatant){
    
    //console.log()
    this.combatants[combatant].condition.push(condition)
    console.log(this.combatants[combatant])
  }
  function deleteCondition(condition, combatant){
    let targetIndex = combatants[combatant].condition.findIndex(existingCondition => existingCondition === condition);

    this.combatants[combatant].condition.splice(targetIndex, 1)
    //console.log(condition, combatant)
  }

  return { combatants, addCombatant, reduceHP, increaseHP, addCondition, deleteCondition }
})
