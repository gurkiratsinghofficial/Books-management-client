import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { AddBookForm } from "./features/books/AddBookForm";
import { BooksList } from "./features/books/BooksList";
import { EditBookForm } from "./features/books/EditBookForm";
import { EditUserForm } from "./features/user/EditUserForm";
import Login from "./features/user/Login";
import Signup from "./features/user/Signup";
function App() {
  return (
    <Router>
      <div className="login-page">
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route path="/login" component={Login} />
          <Route exact path="/editBook/:bookId" component={EditBookForm} />
          <Route path="/dashboard" component={BooksList} />
          <Route path="/editUser" component={EditUserForm} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
