<script setup>
import InitiativeOrder from '@/components/InitiativeOrder.vue';
import PlayerList from '@/components/PlayerList.vue'
</script>

<template>
  <main>
    <PlayerList />
    <InitiativeOrder />
  </main>
</template>

<style scoped>
main{
  border: solid white;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
