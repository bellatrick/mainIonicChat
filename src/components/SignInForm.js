import { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IonSpinner } from "@ionic/react";
import { Storage } from "@capacitor/storage";

import "./SignInForm.css";
import { Store } from "../utils/Store";
import { useHistory, Link } from "react-router-dom";
// import Cookies from 'js-cookie'
// const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
const USER_DETAILS='user'
const signInSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(10, "Digits too short - should be 10 digits min")
    .max(14, "Digits should not be greater than 14"),

  password: Yup.string()
    .required("Password is required")
    .min(4, "Password is too short - should be 4 chars min"),
});

const initialValues = {
  phoneNumber: "",
  password: "",
};

const SignInForm = () => {
  const history = useHistory();
  const [user, setUser] = useState({})
  const { state, dispatch } = useContext(Store);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const submitForm = (phoneNumber, password) => {
    setLoading(true);
    setError("");
    fetch("https://anter-chat-app.herokuapp.com/api/v1/user/login", {
      method: "POST",
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.statusText === "Unauthorized") {
          setError("Your account has not been verified");
        }
        console.log(res);
        setLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            data.message && setError(data.message);
            throw new Error(error);
          });
        }
      })
      .then((data) => {
       // Storage.set({ key: USER_DETAILS, value: JSON.stringify(data.data.user) });
        console.log(data.data.user);  
        setUser(data.data.user)
       // dispatch({ type: "LOGIN", payload: user.username });
        localStorage.setItem('user', JSON.stringify(data.data.user))
        console.log(user)
        history.push("/chats");
      })
      .catch((err) => {
        console.log(err);
        setError("Server Error! Please wait a moment and try again");
        setLoading(false);
      });

       localStorage.setItem('user', JSON.stringify(user))
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={(values) => {
        submitForm(values.phoneNumber, values.password);
        console.log(values.password, values.phoneNumber);
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="formSec">
            <h1>Sign in to continue</h1>
            <h3>{error}</h3>

            <Form className="signUp signIn">
              <div className="form-row">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field
                  type="phoneNumber"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  className={
                    errors.phoneNumber && touched.phoneNumber
                      ? "input-error"
                      : ""
                  }
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="span"
                  className="error"
                />
              </div>

              <div className="form-row">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className={
                    errors.password && touched.password ? "input-error" : ""
                  }
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
              </div>

              <button
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn btn" : "btn"}
                // disabled={!(dirty && isValid)}
              >
                Sign In
                {loading && <IonSpinner name="bubbles" />}
              </button>

              <p className="option-text">
                Don't have an account?{" "}
                <Link className="option-text__link" to="/register">
                  <i>Sign up</i>
                </Link>
              </p>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default SignInForm;
