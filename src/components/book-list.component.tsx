import { Component, ChangeEvent } from "react";
import BookDataService from "../services/book.service";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IBookData from '../types/book.type';
import nobooks from '../assets/nobooks.png';

type Props = {};

type State = {
  books: Array<IBookData>,
  currentBook: IBookData | null,
  currentIndex: number,
  searchTitle: string
};

export default class BookList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveBooks = this.retrieveBooks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBook = this.setActiveBook.bind(this);
    this.removeAllBooks = this.removeAllBooks.bind(this);
    this.searchByTitle = this.searchByTitle.bind(this);

    this.state = {
      books: [],
      currentBook: null,
      currentIndex: 0,
      searchTitle: ''
    };
  }

  componentDidMount() {
    this.retrieveBooks();
  }

  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveBooks() {
    BookDataService.getAll()
      .then((response: any) => {
        this.setState({
          books: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveBooks();
    this.setState({
      currentBook: null,
      currentIndex: -1
    });
  }

  setActiveBook(book: IBookData, index: number) {
    this.setState({
      currentBook: book,
      currentIndex: index
    });
  }

  removeAllBooks() {
    BookDataService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        toast.success("All books removed!");
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  searchByTitle() {
    this.setState({
      currentBook: null,
      currentIndex: -1
    });

    BookDataService.findByTitle(this.state.searchTitle)
      .then((response: any) => {
        this.setState({
          books: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, books, currentBook, currentIndex } = this.state;

    return (
      <div className="list">
        <div className="list-header">
          <h4>Book Library</h4>
          <div className="search-container">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search books by title..."
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

        {currentBook && (
          <div className="book-detail">
            <div className="book-detail-content">
              <div className="book-cover">
                <div className="cover-placeholder">
                  <i className="fas fa-book"></i>
                </div>
              </div>
              <div className="book-info">
                <h4>{currentBook.title}</h4>
                <div className="info-group">
                  <label>Description:</label>
                  <p>{currentBook.description}</p>
                </div>
                <div className="info-group">
                  <label>Status:</label>
                  <span className={`status-badge ${currentBook.available ? 'available' : 'lent'}`}>
                    {currentBook.available ? 'Available' : 'Lent'}
                  </span>
                </div>
                <Link to={"/books/" + currentBook.id} className="edit-btn">
                  <i className="fas fa-edit"></i> Edit Book
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="book-list">
          {books.length > 0 ? (
            <div className="book-grid">
              {books.map((book: IBookData, index: number) => (
                <div
                  className={`book-card ${index === currentIndex ? "active" : ""}`}
                  onClick={() => this.setActiveBook(book, index)}
                  key={index}
                >
                  <div className="book-card-cover">
                    <div className="cover-placeholder">
                      <i className="fas fa-book"></i>
                    </div>
                  </div>
                  <div className="book-card-content">
                    <h5>{book.title}</h5>
                    <span className={`status-badge ${book.available ? 'available' : 'lent'}`}>
                      {book.available ? 'Available' : 'Lent'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="nobooks-wrap">
              <img src={nobooks} alt="No books available" />
              <p>No books found in the library</p>
            </div>
          )}
        </div>

        <div className="list-actions">
          <Link to={"/books/add"} className="add-book-link">
            <i className="fas fa-plus"></i> Add New Book
          </Link>
          {books.length > 0 && (
            <button
              className="btn-danger"
              onClick={this.removeAllBooks}
            >
              <i className="fas fa-trash"></i> Remove All Books
            </button>
          )}
        </div>
      </div>
    );
  }
}
