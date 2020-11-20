import React from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik, Form } from "formik";
import errorStrings from "../../constants/constants";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { loginUser } from "./userSlice";

/**Login form component */
function Login(props) {
  const dispatch = useDispatch();
  const userLoginStatus = useSelector((state) => state.books.status);
  return (
    /**Formik form */
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      /**Formik form Validations */
      validationSchema={Yup.object({
        email: Yup.string()
          .email(errorStrings.INVALID_EMAIL)
          .required(errorStrings.EMAIL_REQUIRED),
        password: Yup.string()
          .min(8, errorStrings.PASSWORD_SHORT)
          .required(errorStrings.PASSWORD_REQUIRED),
      })}
      /**submit handler */
      onSubmit={async (values, { setSubmitting }) => {
        try {
          /**dispatch action to  login the user */
          const resultAction = await dispatch(loginUser(values));
          unwrapResult(resultAction);
          /**Redirect to dashboard */
          props.history.push({
            pathname: "/dashboard",
            state: {
              refresh: "true",
            },
          });
        } catch (err) {
          console.log("unable to signup", err);
        }
      }}
    >
      <div className="form">
        <Form className="login-form">
          <table>
            <thead>
              <tr>
                <th>
                  <h2>Sign in</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="2">
                  <Field
                    placeholder="Email address"
                    name="email"
                    type="email"
                  />
                  <span>
                    <ErrorMessage name="email" />
                  </span>
                  <br />
                </td>
              </tr>
              <tr>
                <td>
                  <Field
                    placeholder="Password"
                    type="password"
                    name="password"
                  />
                  <br />
                  <span>
                    <ErrorMessage name="password" />
                  </span>
                  <br />
                </td>
              </tr>
            </tbody>
          </table>
          <button className="submit" type="submit">
            SUBMIT
          </button>
        </Form>
      </div>
    </Formik>
  );
}

export default Login;
