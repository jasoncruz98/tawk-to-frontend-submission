import { http, HttpResponse } from 'msw';

import { categories, articles } from '../../data/data.json' 

export const handlers = [
    //Request list of categories
  http.get('/api/categories', () => {
      return HttpResponse.json(categories)
  }),
    //Request a single category by id
    http.get('/api/category/:id', ({params}) => {
        return HttpResponse.json(categories.find(category => category.id === params.id))
    }),
    //Request list of articles by category id
    http.get('/api/category/:id/articles', () => {
        return HttpResponse.json(articles)
    }),
    //Request info of an author
    http.get('api/author/:id', ({ params }) => {
        return HttpResponse.json(articles.filter(article => article.authorId === params.id))
    }),
    http.get('/api/search', () => {
        return HttpResponse.json(articles)
    })
];