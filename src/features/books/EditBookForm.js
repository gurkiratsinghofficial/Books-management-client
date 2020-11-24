import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editBook, fetchBooks, selectBookById } from "./booksSlice";
import { unwrapResult } from "@reduxjs/toolkit";

/**
 * Component for editing a book entry
 * @param {object} params
 */
export const EditBookForm = ({ match }) => {
  const bookId = match.params;
  const book = useSelector((state) => selectBookById(state, bookId.bookId));
  const dispatch = useDispatch();
  const history = useHistory();
  const bookStatus = useSelector((state) => state.books.status);
  /**API is called and data is fetched when status==='idle' */
  useEffect(() => {
    if (bookStatus === "idle") {
      dispatch(fetchBooks());
    }
  }, [bookStatus, dispatch]);
  return (
    <div>
      {book ? (
        <Formik
          enableReinitialize="true"
          //** Initial form values set to previous book data */
          initialValues={{
            id: bookId,
            title: book.title,
            author: book.author,
            description: book.description,
            pages: book.pages,
            price: book.price,
            isbn: book.isbn,
          }}
          validationSchema={Yup.object({
            title: Yup.string().required(),
            author: Yup.string().required(),
            description: Yup.string().required(),
            pages: Yup.string().required(),
            price: Yup.string().required(),
          })}
          //**Submit handler */
          onSubmit={async (values, { setSubmitting }) => {
            try {
              /**dispatch action to edit the book entry */
              const resultAction = await dispatch(editBook(values));
              unwrapResult(resultAction);
            } catch (err) {
              console.log("unable to save", err);
            }
            /**Redirect to dashboard again */
            history.push({
              pathname: "/dashboard",
              state: {
                refresh: "true",
              },
            });
          }}
        >
          <Form>
            <div className="editBookDiv">
              <table>
                <thead>
                  <tr>
                    <th>
                      <h2>Edit Book</h2>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="display-block">
                      <label>Title</label>
                      <Field placeholder="title" name="title" type="text" />
                      <span>
                        <ErrorMessage name="title" />
                      </span>
                    </td>
                    <td>
                      <label>Author</label>
                      <Field placeholder="author" name="author" type="text" />
                      <span>
                        <ErrorMessage name="author" />
                      </span>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td className="display-block">
                      <label>description</label>
                      <Field
                        placeholder="description"
                        name="description"
                        type="text"
                      />
                      <span>
                        <ErrorMessage name="description" />
                      </span>
                    </td>
                    <td>
                      <label>pages</label>
                      <Field placeholder="pages" name="pages" type="text" />
                      <span>
                        <ErrorMessage name="pages" />
                      </span>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td className="display-block">
                      <label>price (in rupees)</label>
                      <Field placeholder="price" name="price" type="text" />
                      <span>
                        <ErrorMessage name="price" />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="submit" type="submit">
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      ) : null}
    </div>
  );
};
