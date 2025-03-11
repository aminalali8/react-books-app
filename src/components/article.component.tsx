import { Component } from "react";
import ArticleDataService from "../services/article.service";
import { toast } from 'react-toastify';
import IArticleData from "../types/article.type";

type Props = {
  match: {
    params: { id: string }
  }
};

type State = {
  currentArticle: IArticleData;
  message: string;
};

export default class Article extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getArticle = this.getArticle.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);

    this.state = {
      currentArticle: {
        id: null,
        title: "",
        content: "",
        author: "",
        publishedAt: new Date(),
        category: "",
        tags: [],
        status: "draft"
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getArticle(this.props.match.params.id);
  }

  getArticle(id: string) {
    ArticleDataService.get(id)
      .then((response: any) => {
        this.setState({
          currentArticle: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
        toast.error("Error retrieving article!");
      });
  }

  updateArticle() {
    ArticleDataService.update(
      this.state.currentArticle.id,
      this.state.currentArticle
    )
      .then((response: any) => {
        console.log(response.data);
        this.setState({ message: "Article updated successfully!" });
        toast.success("Article updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
        toast.error("Error updating article!");
      });
  }

  deleteArticle() {
    ArticleDataService.delete(this.state.currentArticle.id)
      .then((response: any) => {
        console.log(response.data);
        this.setState({ message: "Article deleted successfully!" });
        toast.success("Article deleted successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
        toast.error("Error deleting article!");
      });
  }

  render() {
    const { currentArticle } = this.state;

    return (
      <div>
        {currentArticle ? (
          <div className="edit-form">
            <h4>Article</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentArticle.title}
                  onChange={(e) => this.setState({ currentArticle: { ...currentArticle, title: e.target.value } })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  className="form-control"
                  id="content"
                  value={currentArticle.content}
                  onChange={(e) => this.setState({ currentArticle: { ...currentArticle, content: e.target.value } })}
                  rows={5}
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  value={currentArticle.author}
                  onChange={(e) => this.setState({ currentArticle: { ...currentArticle, author: e.target.value } })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  value={currentArticle.category}
                  onChange={(e) => this.setState({ currentArticle: { ...currentArticle, category: e.target.value } })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tags">Tags (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  id="tags"
                  value={currentArticle.tags.join(", ")}
                  onChange={(e) => this.setState({ 
                    currentArticle: { 
                      ...currentArticle, 
                      tags: e.target.value.split(",").map(tag => tag.trim()).filter(tag => tag)
                    } 
                  })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  className="form-control"
                  id="status"
                  value={currentArticle.status}
                  onChange={(e) => this.setState({ currentArticle: { ...currentArticle, status: e.target.value as 'draft' | 'published' } })}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </form>

            <div className="edit-actions">
              <button
                type="submit"
                className="btn btn-success"
                onClick={this.updateArticle}
              >
                Update
              </button>
              <button
                className="btn btn-danger"
                onClick={this.deleteArticle}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Article...</p>
          </div>
        )}
      </div>
    );
  }
} 