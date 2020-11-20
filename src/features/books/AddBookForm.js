import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { addNewBook } from "./booksSlice";

/**Custom input field */
const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
/**
 * Form component for adding new book
 */
export const AddBookForm = () => {
  const dispatch = useDispatch();
  return (
    /**Formik form */
    <Formik
      /**Initial values of form */
      enableReinitialize
      initialValues={{
        id: "",
        title: "",
        author: "",
        description: "",
        pages: "",
        price: "",
        isbn: "",
      }}
      /**Validations for input fields */
      validationSchema={Yup.object({
        title: Yup.string().required("Required"),
        author: Yup.string().required("Required"),
        description: Yup.string().required(),
        pages: Yup.string().required("Required"),
        price: Yup.string().required("Required"),
        isbn: Yup.string().required("Required"),
      })}
      /**Submit handler */
      onSubmit={async (values, { setSubmitting }) => {
        try {
          /**dispatch action to add new book*/
          const resultAction = await dispatch(addNewBook(values));
          unwrapResult(resultAction);
        } catch (err) {
          console.log("unable to save", err);
        }
      }}
    >
      {/**Add book form JSX */}
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
        <MyTextInput label="isbn" name="isbn" type="text" placeholder="isbn" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
