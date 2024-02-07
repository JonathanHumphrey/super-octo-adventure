<script setup>
import AddCombatant from './AddCombatant.vue';
import { useCombatantStore } from '@/stores/combatants'

const combatantStore = useCombatantStore()


</script>

<template>  
    <div class="initiative-list">
        <AddCombatant />
        <div v-for="item in combatantStore.combatants">
            <h2>{{ item.name }}</h2>
            <p>{{ item.initiativeModifier }}</p>
        </div>
    </div>
    
</template>

<style scoped>
.initiative-list{
    background: white;
    color: black;
    padding: 2rem;
    height: 20rem;
    width: 25rem;
    display: flex;
    flex-direction: column;
}
</style>