import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import DeleteModal from "../../UI/DeleteModal";
import {
  selectAllBooks,
  fetchBooks,
  refreshBooks,
  deleteBook,
} from "./booksSlice";
import { fetchUser } from "../user/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

/**
 * @description:Component to display Books of logged in user
 * @param {object} props
 */
export const BooksList = (props) => {
  const { location, history } = props;
  const [isbn, setIsbn] = useState("");
  const [deleteShow, setDeleteShow] = useState(false);
  const books = useSelector(selectAllBooks);
  const dispatch = useDispatch();
  const bookStatus = useSelector((state) => state.books.status);
  const userStatus = useSelector((state) => state.user.status);
  /**API is called and data is fetched when status==='idle' */
  useEffect(() => {
    if (bookStatus === "idle" && userStatus === "succeeded") {
      dispatch(fetchBooks());
    }
  }, [userStatus, bookStatus, dispatch]);
  /**API is called and user is fetched when status==='idle' */
  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUser());
    }
  }, [dispatch, userStatus]);
  /**table data is refreshed upon editing */
  useEffect(() => {
    if (location.state && location.state.refresh) {
      dispatch(refreshBooks());
    }
  }, [dispatch, location.state]);

  if (bookStatus === "succeeded") {
  } else if (bookStatus === "failed") {
    console.log("error fetching");
  }
  /**method to display delete modal */
  const openModal = (isbn) => {
    setDeleteShow(true);
    setIsbn(isbn);
  };
  /**method to dispatch action delete book */
  const deleteThisBook = (isbn) => {
    try {
      /**dispatch action to add new book*/
      const resultAction = dispatch(deleteBook(isbn));
      unwrapResult(resultAction);
      setDeleteShow(false);
      history.push({
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
      <div>
        <h2>My Books</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Pages</th>
              <th>Price</th>
              <th>ISbn</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          {books.length !== 0 ? (
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
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
                    {/* <button onClick={() => deleteThisBook(book.isbn)}>
                      Delete
                    </button> */}
                    <button onClick={() => openModal(book.isbn)}>delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </Table>
      </div>
      <DeleteModal
        show={deleteShow}
        setDeleteShow={setDeleteShow}
        deleteThisBook={deleteThisBook}
        isbn={isbn}
      />
    </div>
  );
};
