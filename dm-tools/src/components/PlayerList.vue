<script setup>
// Theory: This will be a component that grabs the player objects from local storage and allows you to 
// enter the player's initiative rolls and pop them into the combatants list
import { useCombatantStore } from '@/stores/combatants'
import { ref } from 'vue';

const combatantStore = useCombatantStore()
const playerList = ref(combatantStore.players)
const initRoll = ref(0)


const changeInitiative = (player) => {
    console.log(player)
    let targetInput = document.getElementById(player.id)
    console.log(targetInput)
    initRoll.value = parseInt(targetInput.value, 10)
    combatantStore.changeInitiativeRoll(initRoll, player.id)
    targetInput.value = ''
}

const addPlayerTofight = (player) => {
    combatantStore.addCombatant(player)
}
</script>

<template>
    <div class="container">
        <h1>Players</h1>
        <div class="item" v-for="player in playerList">
            <div class="name">
                <h2>{{ player.name }}</h2>
            </div>
                <p>Initiative Roll: {{ player.initiativeRoll }}</p>
                <input type="number" :id="player.id"/>
                <div>
                    <button @click="changeInitiative(player)">+</button>
                </div>
                <button @click="addPlayerTofight(player)">Add to fight</button>
        </div>
    </div>
</template>

<style scoped>
    .container{
        background-color: white;
    }
</style>