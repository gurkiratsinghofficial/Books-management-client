import React, { useEffect } from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { editUser, fetchUser, selectUser } from "./userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import errorStrings from "../../constants/constants";

/**
 * Component for editing user details
 * @param {object} params
 */
export const EditUserForm = (props) => {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  /**API is called and user is fetched when status==='idle' */
  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUser());
    }
  }, [userStatus, dispatch]);
  const user = useSelector((state) => selectUser(state));
  const userinfo = user[0] ? user[0].userinfo : [];
  return (
    //*Formik Form
    <div>
      {userinfo.length !== 0 ? (
        <Formik
          initialValues={{
            firstname: userinfo.firstname,
            lastname: userinfo.lastname,
            gender: userinfo.gender,
            birthday: userinfo.birthday,
            profession: userinfo.profession,
          }}
          /**Formik form Validations */
          validationSchema={Yup.object({
            firstname: Yup.string().required(errorStrings.FIRSTNAME),
            lastname: Yup.string().required(errorStrings.LASTNAME),
            birthday: Yup.string().required(),
            profession: Yup.string().required(errorStrings.PROFESSION),
            gender: Yup.string().required(errorStrings.GENDER),
          })}
          /**submit handler */
          onSubmit={async (values, { setSubmitting }) => {
            try {
              /**dispatch action to edit user details*/
              const resultAction = await dispatch(editUser(values));
              unwrapResult(resultAction);
              props.history.push({
                pathname: "/profile",
                state: {
                  refresh: "true",
                },
              });
            } catch (err) {
              console.log("unable to save changes", err);
            }
            /**Redirect to dashboard again */
          }}
        >
          <div className="form">
            <Form>
              <table>
                <thead>
                  <tr>
                    <th>
                      <h2>Edit User</h2>
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
                      <Field
                        placeholder="Last name"
                        name="lastname"
                        type="text"
                      />
                      <span>
                        <ErrorMessage name="lastname" />
                      </span>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6>Date of birth</h6>
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
            </Form>
          </div>
        </Formik>
      ) : (
        console.log("hey")
      )}
    </div>
  );
};
