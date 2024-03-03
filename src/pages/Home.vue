<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import { Category } from '@/interfaces';
import { daysAgo, noOfArticles } from '@/utils';
import { useRouter } from 'vue-router';

const isLoading = ref(true);
const isError = ref(false);
const searchQuery = ref('');
const categories = ref<Category[]>([]);

const router = useRouter();

const emit = defineEmits(['search-update']);

async function updateSearch() {
  emit('search-update', searchQuery.value);
}

async function fetchCategories() {
  try {
    const response = await axios.get<Category[]>('/api/categories');
    categories.value = response.data.filter(category => category.enabled);
  } catch (error) {
    isError.value = true;
    console.error('Failed to fetch categories:', error);
  } finally {
    isLoading.value = false;
  }
}

async function navigateToCategory(categoryId: string) {
  await router.push({
    path: `/category/${categoryId}`,
  });
}

onMounted(fetchCategories);

// Filter categories based on the search query
const filteredData = computed(() => categories.value.filter(category =>
  searchQuery.value === '' ||
  category.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
  category.description.toLowerCase().includes(searchQuery.value.toLowerCase())
));
</script>

<template>
  <div>
    <div class="search-box">
      <input type="text" v-model="searchQuery" @input="updateSearch" placeholder="Search for answers" class="search-input"/>
      <fa :icon="['fas', 'magnifying-glass']" class="search-icon"/>
    </div>
    <div v-if="isLoading"></div>
    <div v-else-if="isError">An error occurred while fetching categories.</div>
    <div v-else class="category-list">
      <div id="category" v-for="category in filteredData" :key="category.id" @click="navigateToCategory(category.id)">
        <fa :icon="['fas', 'diamond']" class="category-icon"/>
        <h1>{{ category.title }}</h1>
        <h2>{{ noOfArticles(category.totalArticle) }}</h2>
        <h3>{{ daysAgo(category.updatedOn) }}</h3>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.category-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

#category {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #CCCCCC;
  padding: 20px;
  margin-bottom: 10px;
  cursor: pointer;
  font-family: $font-family;
  min-width: 320px;

  h1 {
    font-size: 20px;
    color: $text-black;
  }

  h2 {
    font-size: 13px;
    color: $green;

  }

  h3 {
    font-size: 11px;
    color: $text-gray;
  }

  .category-icon {
    width: 44px;
    height: 55px;

  }
}

.search-icon {
  color: white;
  background: $green;
  width: 18px;
  height: 18px;
  padding-top: 21px;
  padding-bottom: 21px;
  padding-left: 31px;
  padding-right: 31px;
  border-radius: 4px;
  border: 1px solid $green;
}

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
</style>
