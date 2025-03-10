import { Component } from "react";
import ArticleDataService from "../services/article.service";
import { toast } from 'react-toastify';
import IArticleData from "../types/article.type";

type Props = {};

type State = {
  article: IArticleData;
  submitted: boolean;
};

export default class ArticleAdd extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.saveArticle = this.saveArticle.bind(this);
    this.newArticle = this.newArticle.bind(this);

    this.state = {
      article: {
        title: "",
        content: "",
        author: "",
        publishedAt: new Date(),
        category: "",
        tags: [],
        status: "draft"
      },
      submitted: false
    };
  }

  saveArticle() {
    let data = {
      title: this.state.article.title,
      content: this.state.article.content,
      author: this.state.article.author,
      publishedAt: this.state.article.publishedAt,
      category: this.state.article.category,
      tags: this.state.article.tags,
      status: this.state.article.status
    };

    ArticleDataService.create(data)
      .then((response: any) => {
        this.setState({
          article: {
            id: response.data.id,
            title: response.data.title,
            content: response.data.content,
            author: response.data.author,
            publishedAt: response.data.publishedAt,
            category: response.data.category,
            tags: response.data.tags,
            status: response.data.status
          },
          submitted: true
        });
        toast.success("Article created successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
        toast.error("Error creating article!");
      });
  }

  newArticle() {
    this.setState({
      article: {
        title: "",
        content: "",
        author: "",
        publishedAt: new Date(),
        category: "",
        tags: [],
        status: "draft"
      },
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Article submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newArticle}>
              Add Another
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.article.title}
                onChange={(e) => this.setState({ article: { ...this.state.article, title: e.target.value } })}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                className="form-control"
                id="content"
                required
                value={this.state.article.content}
                onChange={(e) => this.setState({ article: { ...this.state.article, content: e.target.value } })}
                name="content"
                rows={5}
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                required
                value={this.state.article.author}
                onChange={(e) => this.setState({ article: { ...this.state.article, author: e.target.value } })}
                name="author"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                required
                value={this.state.article.category}
                onChange={(e) => this.setState({ article: { ...this.state.article, category: e.target.value } })}
                name="category"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags (comma-separated)</label>
              <input
                type="text"
                className="form-control"
                id="tags"
                required
                value={this.state.article.tags.join(", ")}
                onChange={(e) => this.setState({ 
                  article: { 
                    ...this.state.article, 
                    tags: e.target.value.split(",").map(tag => tag.trim()).filter(tag => tag)
                  } 
                })}
                name="tags"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                className="form-control"
                id="status"
                required
                value={this.state.article.status}
                onChange={(e) => this.setState({ article: { ...this.state.article, status: e.target.value as 'draft' | 'published' } })}
                name="status"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <button onClick={this.saveArticle} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
} 