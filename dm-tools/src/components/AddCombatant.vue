<script setup>
import { ref } from 'vue'
import { useCombatantStore } from '@/stores/combatants'

const combatantStore = useCombatantStore()

const formData = ref({
  id: 0,
  name: '',
  initiativeRoll: 0,
  initiativeModifier: 0,
  healthPoints: -1,
});

const submitted = ref(false);
const idTracker = 0;
const submitForm = () => {
  const submittedData = {
    id: idTracker + 1,
    name: formData.value.name,
    initiativeRoll: formData.value.initiativeRoll,
    initiativeModifier: formData.value.initiativeModifier,
    healthPoints: formData.value.healthPoints,
    condition: []
  };

  console.log('Submitted Data:', submittedData);

  
  formData.name = '';
  formData.initiativeModifier = 0;
  formData.initiativeRoll = 0;
  formData.healthPoints = 0;

  combatantStore.addCombatant(submittedData)
  submitted.value = true;
};
</script>

<template>
    <div class="form-container">
        <form @submit.prevent="submitForm">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="formData.name" required />

            <label for="initiativeRoll">Initiative Roll:</label>
            <input type="number" id="initiativeRoll" v-model="formData.initiativeRoll" required />

            <label for="initiativeModifier">Initiative Modifier:</label>
            <input type="number" id="initiativeModifier" v-model="formData.initiativeModifier" required />


            <label for="healthPoints">Health Points:</label>
            <input type="number" id="healthPoints" v-model="formData.healthPoints"/>

            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<style scoped>
.form-container{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border: solid black;
}
form{
    display: flex;
    flex-direction: column;
}
</style>