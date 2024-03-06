<script setup lang="ts">
import { Article } from '@/interfaces';
import { formatDateToReadableString } from '@/utils';
import axios from 'axios';
import { onMounted, ref } from 'vue';
// import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const q = route.query.q as string;

const articles = ref<Article[]>([]);

async function fetchArticles() {
    const response = await axios.get<Article[]>('/api/search');
    articles.value = response.data.filter(a => {
        if (q === "") {
            return true;
        }
        return a.title.toLowerCase().includes(q.toLowerCase())
    })
}


onMounted(fetchArticles);
</script>

<template>
  <div>
    <div v-for="article in articles" :key="article.id" class="article-card">
        <h5>{{ article.title }}</h5>
        <p>Updated {{ formatDateToReadableString(article.updatedOn) }}</p>
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

