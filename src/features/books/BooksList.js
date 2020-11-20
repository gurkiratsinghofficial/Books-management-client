import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllBooks,
  fetchBooks,
  refreshBooks,
  deleteBook,
} from "./booksSlice";
import { AddBookForm } from "./AddBookForm";
import { unwrapResult } from "@reduxjs/toolkit";

/**
 * @description:Component to display Books of logged in user
 * @param {object} props
 */
export const BooksList = (props) => {
  const books = useSelector(selectAllBooks);
  const dispatch = useDispatch();
  const bookStatus = useSelector((state) => state.books.status);
  /**API is called and data is fetched when status==='idle */
  useEffect(() => {
    if (bookStatus === "idle") {
      dispatch(fetchBooks());
    }
  }, [bookStatus, dispatch]);
  console.log(bookStatus);
  /**table data is refreshed upon editing */
  useEffect(() => {
    if (props.location.state && props.location.state.refresh) {
      dispatch(refreshBooks());
    }
  }, [props.location.state]);

  if (bookStatus === "succeeded") {
    console.log(books);
  } else if (bookStatus === "failed") {
    console.log("error fetching");
  }
  const deleteThisBook = (isbn) => {
    try {
      /**dispatch action to add new book*/
      const resultAction = dispatch(deleteBook(isbn));
      unwrapResult(resultAction);
      props.history.push({
        pathname: "/dashboard",
        state: {
          refresh: "true",
        },
      });
    } catch (err) {
      console.log("unable to save", err);
    }
  };
  return (
    <div>
      {/**Edit form JSX */}
      <Link to="/editUser">Edit USer</Link>
      <AddBookForm />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Pages</th>
            <th>Price</th>
            <th>ISbn</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.description}</td>
              <td>{book.pages}</td>
              <td>{book.price}</td>
              <td>{book.isbn}</td>
              <td>
                <Link to={`/editBook/${book.id}`}>Edit</Link>{" "}
              </td>
              <td>
                <button onClick={() => deleteThisBook(book.isbn)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
