<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const router = useRouter();

// const emit = defineEmits(['search-update']);

async function updateSearch() {
  // emit('search-update', searchQuery.value);
}

async function navigateToSearch() {
  router.push({ path: '/search', query: {q : searchQuery.value} })
}

</script>

<template>
  <div id="header-wrapper">
    <div id="header-text">
      <h1>Knowledge base doesn't have to be boring</h1>
      <h3>Everything you need to manage your messaging</h3>
          <div class="search-box">
            <input type="text" v-model="searchQuery" @input="updateSearch" placeholder="Search for answers" class="search-input"/>
            <fa :icon="['fas', 'magnifying-glass']" class="search-icon" @click="navigateToSearch"/>
          </div>
    </div>
  </div>
</template>

<style lang="scss">

.search-box {
  display: flex;
  align-items: center;
  justify-items: center;
  margin-bottom: 20px;
}

.search-input {
  flex-grow: 1;
  height: 60px;
  background: #FFFFFF;
  border: 1px solid #EEEEEE;
  border-radius: 4px;
  padding-left: 10px;
  color: #333333;
  font-size: 16px;
  font-style: normal; 
}

.search-input::placeholder {
  color: #AAAAAA;
  font-size: 16px;
  font-style: normal;
}

.search-input:focus {
  border-color: #CCCCCC; 
  outline: none;
}

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
