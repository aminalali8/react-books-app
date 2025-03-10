export default interface IArticleData {
  id?: number;
  title: string;
  content: string;
  author: string;
  publishedAt: Date;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
} 