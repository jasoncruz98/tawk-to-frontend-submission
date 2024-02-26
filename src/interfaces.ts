export interface Category {
  id: string;
  title: string;
  description: string;
  createdOn: string;
  updatedOn: string;
  enabled: boolean;
  order: number;
  icon: string;
  totalArticle: number;
}

type ArticleStatus = 'draft' | 'published' | 'archived';

export interface Article {
  id: string;
  title: string;
  createdOn: string;
  updatedOn: string;
  authorId: string;
  content: string;
  icon: string;
  status: ArticleStatus;
}

export interface Author {
  id: string;
  name: string;
}


