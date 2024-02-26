<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import TawkHeader from '@/components/Header.vue';
import { Category } from '@/interfaces';
import { daysAgo, noOfArticles } from '@/utils';

const isLoading = ref(true);
const isError = ref(false);
const searchQuery = ref('');
const categories = ref<Category[]>([]);

// In-memory cache
const cache = ref<{ [key: string]: Category[] }>({});

async function fetchCategories() {
  const cacheKey = 'categories';
  if (cache.value[cacheKey]) {
    categories.value = cache.value[cacheKey];
  } else {
    try {
      const response = await axios.get<Category[]>('/api/categories');
      categories.value = response.data.filter(category => category.enabled);
      cache.value[cacheKey] = response.data; // Update cache
    } catch (error) {
      isError.value = true;
      console.error('Failed to fetch categories:', error);
    } finally {
      isLoading.value = false;
    }
  }
}

onMounted(fetchCategories);

//filter categories based on the search query
const filteredData = computed(() => categories.value.filter(category =>
  searchQuery.value === '' ||
  category.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
  category.description.toLowerCase().includes(searchQuery.value.toLowerCase())
));
</script>

<template>
  <div>
    <TawkHeader @search-update="searchQuery = $event" />
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">An error occurred while fetching categories.</div>
    <div v-else>
      <div v-for="category in filteredData" :key="category.id" class="category-card">
        <h4>{{ category.title }}</h4>
        <p>{{ noOfArticles(category.totalArticle) }}</p>
        <p>{{ daysAgo(category.updatedOn) }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.category-card {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 10px;
}
</style>
