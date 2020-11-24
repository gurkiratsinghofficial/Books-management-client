import React, { useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik, Form } from "formik";
import errorStrings from "../../constants/constants";
// import {addUser,selectUser} from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { signupUser } from "./userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
// import {signup} from './userSlice'

/**Signup form component */
function Signup(props) {
  const history = useHistory();
  const [error, setError] = useState("");
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.books.status);

  const togglePassword = () => {
    if (toggle) setToggle(false);
    else setToggle(true);
  };
  if (userStatus === "succeeded") props.history.push("/login");
  return (
    /**Formik form */
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        gender: "",
        password: "",
        confirmPassword: "",
        birthday: "",
        profession: "",
      }}
      /**Formik form Validations */
      validationSchema={Yup.object({
        firstname: Yup.string().required(errorStrings.FIRSTNAME),
        lastname: Yup.string().required(errorStrings.LASTNAME),
        email: Yup.string()
          .email(errorStrings.INVALID_EMAIL)
          .required(errorStrings.EMAIL_REQUIRED),
        birthday: Yup.string().required(),
        profession: Yup.string().required(errorStrings.PROFESSION),
        password: Yup.string()
          .min(8, errorStrings.PASSWORD_SHORT)
          .required(errorStrings.PASSWORD_REQUIRED),
        confirmPassword: Yup.string().test(
          "",
          errorStrings.PASSWORD_NOT_MATCH,
          function (value) {
            return this.parent.password === value;
          }
        ),
        gender: Yup.string().required(errorStrings.GENDER),
      })}
      /**submit handler */
      onSubmit={async (values) => {
        try {
          const resultAction = await dispatch(signupUser(values));
          if (resultAction.payload.success === "false") {
            setError(resultAction.payload.message);
          } else {
            unwrapResult(resultAction);
            props.history.push("/login");
          }
        } catch (err) {
          console.log("unable to signup", err);
        }
      }}
    >
      <div className="form">
        <Form>
          <table>
            <thead>
              <tr>
                <th>
                  <h2>Sign up</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="display-block">
                  <Field
                    placeholder="First name"
                    name="firstname"
                    type="text"
                  />
                  <span>
                    <ErrorMessage name="firstname" />
                  </span>
                </td>
                <td>
                  <Field placeholder="Last name" name="lastname" type="text" />
                  <span>
                    <ErrorMessage name="lastname" />
                  </span>
                  <br />
                </td>
              </tr>
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
                    type={toggle ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                  />
                  <br />
                  <span>
                    <ErrorMessage name="password" />
                  </span>
                  <br />
                </td>
                <td className="display-block">
                  <Field
                    type={toggle ? "text" : "password"}
                    placeholder="Confirm password"
                    name="confirmPassword"
                  />
                  <br />
                  <span>
                    <ErrorMessage name="confirmPassword" />
                  </span>
                  <br />
                </td>
              </tr>
              <tr>
                <td>
                  <h6>Date of birth</h6>
                </td>
                <td>
                  <div className="password-toggle">
                    <input onClick={togglePassword} type="checkbox" />
                    <h6>Show password</h6>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <Field type="date" name="birthday" />
                  <span>
                    <ErrorMessage name="birthday" />
                  </span>
                  <br />
                </td>
                <td className="display-block">
                  <Field as="select" name="profession">
                    <option disabled value="">
                      Profession
                    </option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                  </Field>
                  <br />
                  <span>
                    <ErrorMessage name="profession" />
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <Field
                      className="radio-input"
                      type="radio"
                      name="gender"
                      value="male"
                    />
                    MALE
                    <Field
                      className="radio-input"
                      type="radio"
                      name="gender"
                      value="female"
                    />
                    FEMALE
                  </div>
                  <span>
                    <ErrorMessage name="gender" />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <button className="submit" type="submit">
            Submit
          </button>
          {error ? <label>{error}</label> : ""}
          <label>
            <small>
              Already have an account?
              <b
                onClick={() => {
                  history.push("/login");
                }}
              >
                {" "}
                sign in
              </b>{" "}
              instead
            </small>
          </label>
        </Form>
      </div>
    </Formik>
  );
}

export default Signup;
