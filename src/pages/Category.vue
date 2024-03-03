<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { Article, Category } from '@/interfaces';
import { useRoute } from 'vue-router';
import { formatDateToReadableString, weeksSince } from '@/utils';

const route = useRoute();
const categoryId = route.params.id;

const articles = ref<Article[]>([]);
const category = ref<Category | null>(null);
const isArticlesLoading = ref(true);
const isCategoryLoading = ref(true);
const isError = ref(false);

async function fetchArticles() {
  isArticlesLoading.value = true;
  try {
    const response = await axios.get<Article[]>(`/api/category/${categoryId}/articles`);
    articles.value = response.data;
  } catch (error) {
    isError.value = true;
    console.error(`Failed to fetch articles for category with id ${categoryId}:`, error);
  } finally {
    isArticlesLoading.value = false;
  }
}

async function fetchCategoryDetails() {
  isCategoryLoading.value = true;
  try {
    const response = await axios.get<Category>(`/api/category/${categoryId}`);
    category.value = response.data;
  } catch (error) {
    isError.value = true;
    console.error(`Failed to fetch details for category with id ${categoryId}:`, error);
  } finally {
    isCategoryLoading.value = false;
  }
}

onMounted(() => {
  fetchArticles();
  fetchCategoryDetails();
});
</script>

<template>
  <div>
    <div v-if="isCategoryLoading">Loading category details...</div>
    <div v-else-if="isError">An error occurred while fetching the category details.</div>
    <div v-else>
      <h3><router-link to="/" class="router-link">All categories</router-link> > {{ category?.title }}</h3>
      <p>Updated {{ weeksSince(category?.updatedOn) }}</p>
      <p>{{ category?.description }}</p>
    </div>
    <h4>Articles</h4>
    <div v-if="isArticlesLoading">Loading articles...</div>
    <div v-else-if="isError">An error occurred while fetching the articles.</div>
    <div v-else>
      <div v-for="article in articles" :key="article.id" class="article-card">
        <h5>{{ article.title }}</h5>
        <p>Updated {{ formatDateToReadableString(article.updatedOn) }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.router-link {
  color: green;
}

.article-card {
  border: 1px solid #CCCCCC;
  padding: 20px;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>

