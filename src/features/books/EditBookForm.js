import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editBook, selectBookById } from "./booksSlice";
import { unwrapResult } from "@reduxjs/toolkit";

/**Custom input field with error display */
const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};
/**
 * Component for editing a book entry
 * @param {object} params
 */
export const EditBookForm = ({ match }) => {
  const bookId = match.params;
  console.log(bookId);
  const book = useSelector((state) => selectBookById(state, bookId.bookId));
  console.log(book);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    //*Formik Form
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
        title: Yup.string(),
        author: Yup.string(),
        description: Yup.string(),
        pages: Yup.string(),
        price: Yup.string(),
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
        <MyTextInput
          label="title"
          name="title"
          type="text"
          placeholder="title"
        />
        <MyTextInput
          label="author"
          name="author"
          type="text"
          placeholder="author"
        />
        <MyTextInput
          label="description"
          name="description"
          type="text"
          placeholder="description"
        />
        <MyTextInput
          label="pages"
          name="pages"
          type="text"
          placeholder="pages"
        />
        <MyTextInput
          label="price"
          name="price"
          type="text"
          placeholder="price"
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
