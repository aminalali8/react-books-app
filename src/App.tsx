import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookAdd from "./components/book-add.component";
import Book from "./components/book.component";
import BookList from "./components/book-list.component";
import ArticleAdd from "./components/article-add.component";
import Article from "./components/article.component";
import ArticleList from "./components/article-list.component";
import logo from '../src/assets/logo.png'

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        
        <nav className="navbar">
          <div className="container">
            <Link to={"/"} className="navbar-brand">
              <img src={logo} alt="Bunnyshell" />
            </Link>
            
            <div className="navbar-nav">
              <Link to={"/books"} className="nav-link">
                <i className="fas fa-book"></i> Books
              </Link>
              <Link to={"/articles"} className="nav-link">
                <i className="fas fa-newspaper"></i> Articles
              </Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <div className="container">
            <Switch>
              <Route exact path={["/", "/books"]} component={BookList} />
              <Route exact path="/books/add" component={BookAdd} />
              <Route path="/books/:id" component={Book} />
              <Route exact path="/articles" component={ArticleList} />
              <Route exact path="/articles/add" component={ArticleAdd} />
              <Route path="/articles/:id" component={Article} />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
