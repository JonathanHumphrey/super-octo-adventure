<script setup>
import draggable from 'vuedraggable'
import { ref } from 'vue';

import AddCombatant from './AddCombatant.vue';
import { useCombatantStore } from '@/stores/combatants'

const combatantStore = useCombatantStore()
const combatantList = ref(combatantStore.combatants)
const hpChange = ref(0)

const dndConditions = [
  "Blinded",
  "Charmed",
  "Deafened",
  "Frightened",
  "Grappled",
  "Incapacitated",
  "Invisible",
  "Paralyzed",
  "Petrified",
  "Poisoned",
  "Prone",
  "Restrained",
  "Stunned",
  "Unconscious",
  "Concentrating"
];
const selectedCondition = ref(null)

const reduceHP = (element) => {
    let targetInput = document.getElementById(element.id)
    hpChange.value = parseInt(targetInput.value, 10)
    combatantStore.reduceHP(hpChange.value, element.id)
    targetInput.value = ''
}
const increaseHP = (element) => {
    let targetInput = document.getElementById(element.id)
    hpChange.value = parseInt(targetInput.value, 10)
    combatantStore.increaseHP(hpChange.value, element.id)
    targetInput.value = ''
    
}
const addCondition = (element) => {
    let targetSelect = document.getElementById(`conditionSelect_${element.id}`)
    selectedCondition.value = targetSelect.value
    combatantStore.addCondition(selectedCondition.value, element.id) 

}
const deleteCondition = (element, condition) => { 
    combatantStore.deleteCondition(condition, element.id)
}
const removeCombatant = (element) => {
    combatantStore.removeCombatant(element)
}

</script>

<template>  
    <div class="initiative-list">
        <AddCombatant />
        <draggable v-model="combatantList">
            <template #item="{ element }" itemKey="element.id">
                <div class="item">
                    <button class="del-btn" @click="removeCombatant(element)">x</button>
                    <div class="name">
                        <h2>{{ element.name }}</h2>
                    </div>
                   <div class="sub-group">
                        <div class="p-group">
                            <p>Roll: {{ element.initiativeRoll }}</p>
                            <p>Mod: {{ element.initiativeModifier }}</p>
                        </div>
                        <div class="p-group">
                            <p>AC: {{ element.armorClass }}</p>
                        </div>
                        <div class="p-group" v-show="element.healthPoints > 0">
                            <p>HP: {{ element.healthPoints }}</p>
                            <input type="number" :id="element.id"/>
                            <div>
                                <button @click="increaseHP(element)">+</button>
                                <button @click="reduceHP(element)">-</button>
                            </div>
                        </div>
                   </div>
                   <div class="sub-group">
                        <div class="p-group" >
                            <p>Add Condition</p>
                                
                                <select :id="'conditionSelect_' + element.id">
                                    <option v-for="condition in dndConditions" :key="condition" :value="condition">{{ condition }}</option>
                                </select> 
                                <button @click="addCondition(element)">Add</button>
                            </div>
                            <div class="p-group" >
                            <p>Conditions:</p>
                                <div>
                                    <ul>
                                        <li v-for="condition in element.condition" :key="condition">{{ condition }} <p class="deleteBtn" @click="deleteCondition(element, condition)">&#x2715</p></li>
                                    </ul>
                                </div>
                            </div>
                   </div>
                </div>
            </template>
        </draggable>
    </div>
</template>

<style scoped>
.name{
    border: solid black;
    width: 15rem
}
.sub-group{
    display: flex;
    justify-content: flex-start;
    margin-left: 2rem;
    margin-bottom: .25rem;
    flex-direction: row;
    flex-wrap: wrap;
    border: solid black;
    border-radius: 1.25rem;

}
.p-group{
    display: flex;
    width: fit-content;
    padding: .1rem;
    justify-content: space-evenly;
    align-items: center;
    margin: 1rem 0rem 1rem 0;
}
.initiative-list{
    background: white;
    color: black;
    padding: 2rem;
    height: auto;
    width: 40rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
.item{
    border: solid black;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: .5rem;
    position: relative;
}
.del-btn{
    position: absolute;
    right: 1rem;
}
input{
    width: 5rem;
}
ul{
    display: flex;
    flex-direction: column;
    width: 10rem;
    margin-left: 0;
    padding: 0;
}
li{
    display: flex;
    justify-content: space-between;align-items: center;
    width: 10rem;
}
p{
    margin: .25rem;
}
.deleteBtn{
    cursor: pointer;
}
button{
    height: 1.5rem;
    width: 2rem;

}

</style>