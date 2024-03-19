import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// TODOs
/* 
  - add safety nets for HP (max hp so can't heal over)
  - add armor class field in the objects
  - clean up IniativeOrder by componentizing it
*/
export const useCombatantStore = defineStore('combatants', () => {
  const combatants =[
    {
      id: 0,
      name: 'Monster 1',
      initiativeRoll: 10,
      initiativeModifier: 1,
      healthPoints: 27,
      condition: ["Blinded"],
      armorClass: 12,
      player: false
    }
  ]
  const players = [
    {
      id: 0,
      name: 'Jimblo',
      initiativeRoll: 0,
      initiativeModifier: 1,
      healthPoints: -1,
      condition: [],
      armorClass: 12, 
      player: true
    },
    {
      id: 1,
      name: 'Crankle',
      initiativeRoll: 0,
      initiativeModifier: 3,
      healthPoints: -1,
      condition: [],
      armorClass: 15, 
      player: true
    }
  ]
  function changeInitiativeRoll(roll, player) {
    this.players[player].initiativeRoll = roll.value
  }
  function addPlayer(obj){
    this.players.push(obj)
    this.players.forEach((player, index) => {
      player.id = index;
    });
  }
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
    this.combatants.forEach((combatant, index) => {
      combatant.id = index;
    });
  }
  function removeCombatant(obj){
    this.combatants.splice(obj.id, 1)

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
    if(!this.combatants[combatant].condition.includes(condition)){
      this.combatants[combatant].condition.push(condition)
    }
  }

  function deleteCondition(condition, combatant){
    let targetIndex = combatants[combatant].condition.findIndex(existingCondition => existingCondition === condition);

    this.combatants[combatant].condition.splice(targetIndex, 1)
  }


  return { combatants, players, addCombatant, removeCombatant, addPlayer, reduceHP, increaseHP, addCondition, deleteCondition, changeInitiativeRoll }
})
