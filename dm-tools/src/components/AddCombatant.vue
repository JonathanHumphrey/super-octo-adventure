<script setup>
import { ref } from 'vue'
import { useCombatantStore } from '@/stores/combatants'

const combatantStore = useCombatantStore()

const formData = ref({
  name: '',
  initiativeModifier: 0,
});

const submitted = ref(false);

const submitForm = () => {
  // Assuming you want to store the form data in an object
  const submittedData = {
    name: formData.value.name,
    initiativeModifier: formData.value.initiativeModifier,
  };

  // You can perform further actions with the submittedData object if needed
  console.log('Submitted Data:', submittedData);

  // Optionally, reset the form after submission
  formData.name = '';
  formData.initiativeModifier = 0;

  combatantStore.addCombatant(submittedData)
  submitted.value = true;
};
</script>

<template>
    <div class="form-container">
        <form @submit.prevent="submitForm">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="formData.name" required />

            <label for="initiativeModifier">Initiative Modifier:</label>
            <input type="number" id="initiativeModifier" v-model="formData.initiativeModifier" required />

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