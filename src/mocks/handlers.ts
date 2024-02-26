import { http, HttpResponse } from 'msw';

import { categories, articles } from '../../data/data.json' 

export const handlers = [
    //Request list of categories
  http.get('/api/categories', () => {
      return HttpResponse.json(categories)
  }),
    //Request articles for a category
    http.get('/api/category/:id', () => {
        return HttpResponse.json(articles)
    }),
    //Request info of an author
    http.get('api/author/:id', ({ params }) => {
        return HttpResponse.json(articles.filter(article => article.authorId === params.id))
    }),
    http.get('/api/search/*', () => {
        return HttpResponse.json(articles)
    })
];