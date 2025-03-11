import http from "../http-common";
import IArticleData from "../types/article.type";

class ArticleDataService {
  getAll() {
    return http.get<Array<IArticleData>>("/articles");
  }

  get(id: string) {
    return http.get<IArticleData>(`/articles/${id}`);
  }

  create(data: IArticleData) {
    return http.post<IArticleData>("/articles", data);
  }

  update(id: string, data: IArticleData) {
    return http.put<IArticleData>(`/articles/${id}`, data);
  }

  delete(id: string) {
    return http.delete<any>(`/articles/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/articles`);
  }

  findByTitle(title: string) {
    return http.get<Array<IArticleData>>(`/articles?title=${title}`);
  }
}

export default new ArticleDataService(); 