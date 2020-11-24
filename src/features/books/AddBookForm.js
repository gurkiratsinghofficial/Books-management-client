import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { addNewBook } from "./booksSlice";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
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
        price: Yup.number().required("Required"),
        isbn: Yup.string().required("Required"),
      })}
      /**Submit handler */
      onSubmit={async (values, { resetForm }) => {
        try {
          /**dispatch action to add new book*/
          const resultAction = await dispatch(addNewBook(values));
          unwrapResult(resultAction);
          resetForm();
          history.push("/dashboard");
        } catch (err) {
          console.log("unable to save", err);
        }
      }}
    >
      {/**Add book form JSX */}
      <Form>
        <MyTextInput
          label="Title"
          name="title"
          type="text"
          placeholder="title"
        />
        <MyTextInput
          label="Author"
          name="author"
          type="text"
          placeholder="author"
        />
        <MyTextInput
          label="Description"
          name="description"
          type="text"
          placeholder="description"
        />
        <MyTextInput
          label="Pages"
          name="pages"
          type="text"
          placeholder="pages"
        />
        <MyTextInput
          label="Price"
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
