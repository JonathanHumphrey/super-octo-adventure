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
  armorClass: 0,
  player: false
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
    condition: [],
    armorClass: formData.value.armorClass,
    player: formData.value.player
  };

  console.log('Submitted Data:', submittedData.player);

  
  formData.name = '';
  formData.initiativeModifier = 0;
  formData.initiativeRoll = 0;
  formData.healthPoints = 0;

  if(submittedData.player){
    combatantStore.addPlayer(submittedData)
  }
  else{
    combatantStore.addCombatant(submittedData)
  }
  submitted.value = true;
};

const checkboxChecked = ref(false);

const handleCheckedStatusChange = (isChecked) => {
  checkboxChecked.value = isChecked;
};
</script>

<template>
    <div class="form-container">
        <form @submit.prevent="submitForm">
            <label for="name">Name: </label>
            <input type="text" id="name" v-model="formData.name" required />

            <label for="initiativeRoll">Initiative Roll:</label>
            <input type="number" id="initiativeRoll" v-model="formData.initiativeRoll" required />

            <label for="initiativeModifier">Initiative Modifier:</label>
            <input type="number" id="initiativeModifier" v-model="formData.initiativeModifier" required />

            <label for="healthPoints">Health Points:</label>
            <input type="number" id="healthPoints" v-model="formData.healthPoints"/>

            <label for="armorClass">Armor Class:</label>
            <input type="number" id="armorClass" v-model="formData.armorClass"/>
            
            <h3>{{ formData.player ? "Player" : "Monster" }}</h3>
            <label class="slider-container" id="sliderLabel">
              <input id="myCheckbox" type="checkbox" v-model="formData.player">
              <span class="slider"></span>
            </label>
            
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
.slider-container {
        position: relative;
        display: flex;
        justify-content: space-between;
        width: 60px;
        height: 34px;
    }

    .slider {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        border-radius: 34px;
        cursor: pointer;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        border-radius: 50%;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #2196F3;
    }

    input:checked + .slider:before {
        transform: translateX(26px);
    }

    /* Hide the default checkbox */
    input[type="checkbox"] {
        display: none;
    }
</style>