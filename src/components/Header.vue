<template>
  <div id="header-wrapper">
    <div id="header-text">
      <h1>Knowledge base doesn't have to be boring</h1>
      <h3>Everything you need to manage your messaging</h3>
      <input type="text" v-model="searchQuery" @input="updateSearch" placeholder="Search..." />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const searchQuery = ref('');
const emit = defineEmits(['search-update']);

function updateSearch() {
  emit('search-update', searchQuery.value);
}
</script>

<style lang="scss">

#header-text {
  text-align: center;
  font-family: $font-family;
  color: $text-black;
  padding: 20px;

  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 34px;
    line-height: 41px;
  }

  h3 {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
  }
}
</style>
