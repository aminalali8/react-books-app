import { Component, ChangeEvent } from "react";
import ArticleDataService from "../services/article.service";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IArticleData from '../types/article.type';

type Props = {};

type State = {
  articles: Array<IArticleData>,
  currentArticle: IArticleData | null,
  currentIndex: number,
  searchTitle: string
};

export default class ArticleList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveArticles = this.retrieveArticles.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveArticle = this.setActiveArticle.bind(this);
    this.removeAllArticles = this.removeAllArticles.bind(this);
    this.searchByTitle = this.searchByTitle.bind(this);

    this.state = {
      articles: [],
      currentArticle: null,
      currentIndex: 0,
      searchTitle: ''
    };
  }

  componentDidMount() {
    this.retrieveArticles();
  }

  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveArticles() {
    ArticleDataService.getAll()
      .then((response: any) => {
        this.setState({
          articles: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveArticles();
    this.setState({
      currentArticle: null,
      currentIndex: -1
    });
  }

  setActiveArticle(article: IArticleData, index: number) {
    this.setState({
      currentArticle: article,
      currentIndex: index
    });
  }

  removeAllArticles() {
    ArticleDataService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        toast.success("All articles removed!");
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  searchByTitle() {
    this.setState({
      currentArticle: null,
      currentIndex: -1
    });

    ArticleDataService.findByTitle(this.state.searchTitle)
      .then((response: any) => {
        this.setState({
          articles: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, articles, currentArticle, currentIndex } = this.state;

    return (
      <div className="list">
        <div className="list-header">
          <h4>Articles</h4>
          <div className="search-container">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search articles by title..."
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
              />
              <button
                className="search-btn"
                type="button"
                onClick={this.searchByTitle}
              >
                <i className="fas fa-search"></i> Search
              </button>
            </div>
          </div>
        </div>

        {currentArticle && (
          <div className="article-detail">
            <div className="article-detail-content">
              <div className="article-info">
                <h4>{currentArticle.title}</h4>
                <div className="info-group">
                  <label>Author:</label>
                  <p>{currentArticle.author}</p>
                </div>
                <div className="info-group">
                  <label>Category:</label>
                  <p>{currentArticle.category}</p>
                </div>
                <div className="info-group">
                  <label>Content:</label>
                  <p>{currentArticle.content}</p>
                </div>
                <div className="info-group">
                  <label>Tags:</label>
                  <div className="tags">
                    {currentArticle.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="info-group">
                  <label>Status:</label>
                  <span className={`status-badge ${currentArticle.status}`}>
                    {currentArticle.status}
                  </span>
                </div>
                <div className="info-group">
                  <label>Published At:</label>
                  <p>{new Date(currentArticle.publishedAt).toLocaleDateString()}</p>
                </div>
                <Link to={"/articles/" + currentArticle.id} className="edit-btn">
                  <i className="fas fa-edit"></i> Edit Article
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="article-list">
          {articles.length > 0 ? (
            <div className="article-grid">
              {articles.map((article: IArticleData, index: number) => (
                <div
                  className={`article-card ${index === currentIndex ? "active" : ""}`}
                  onClick={() => this.setActiveArticle(article, index)}
                  key={index}
                >
                  <div className="article-card-content">
                    <h5>{article.title}</h5>
                    <div className="article-meta">
                      <span className="author">
                        <i className="fas fa-user"></i> {article.author}
                      </span>
                      <span className="category">
                        <i className="fas fa-folder"></i> {article.category}
                      </span>
                    </div>
                    <div className="tags">
                      {article.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                      ))}
                    </div>
                    <span className={`status-badge ${article.status}`}>
                      {article.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-articles-wrap">
              <i className="fas fa-newspaper"></i>
              <p>No articles found</p>
            </div>
          )}
        </div>

        <div className="list-actions">
          <Link to={"/articles/add"} className="add-button">
            <i className="fas fa-plus"></i> Add New Article
          </Link>
          {articles.length > 0 && (
            <button
              className="btn-danger"
              onClick={this.removeAllArticles}
            >
              <i className="fas fa-trash"></i> Remove All Articles
            </button>
          )}
        </div>
      </div>
    );
  }
} 