import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AuthComponent from "./app/AuthComponent";
import { AddBookForm } from "./features/books/AddBookForm";
import { BooksList } from "./features/books/BooksList";
import { EditBookForm } from "./features/books/EditBookForm";
import { EditUserForm } from "./features/user/EditUserForm";
import Login from "./features/user/Login";
import Profile from "./features/user/Profile";
import Signup from "./features/user/Signup";
import Header from "./UI/Header";
function App() {
  return (
    <Router>
      <Header />
      <div className="login-page">
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route exact path="/login" component={Login} />
          <AuthComponent>
            <Route exact path="/editBook/:bookId" component={EditBookForm} />
            <Route exact path="/dashboard" component={BooksList} />
            <Route exact path="/editUser" component={EditUserForm} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/AddBook" component={AddBookForm} />
          </AuthComponent>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
