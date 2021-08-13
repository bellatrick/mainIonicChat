import { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IonSpinner } from "@ionic/react";
import axios from "axios";
import "./SignInForm.css";
import { Store } from "../utils/Store";
import { useHistory, Link } from "react-router-dom";
// import Cookies from 'js-cookie'
// const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

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
let errorMessage = "";
const SignInForm = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(Store);
  // const { userInfo } = state;
  const [loading, setLoading] = useState(false);
  //const [errorMessage, setErrorMessage] = useState({passwordErr:'', phoneNoErr:'', GeneralErr:''})
  const [error, setError] = useState("");
  const submitForm = async (phoneNumber, password) => {
    setLoading(true);
    setError("");
    // const data = {
    //   phoneNumber,
    //   password,
    // };
    fetch("https://anter-chat-app.herokuapp.com/api/v1/users/login", {
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
            setError(data.message);
            throw new Error(error);
          });
        }
      })
      .then((data) => {
        console.log(data);
        dispatch({ action: "LOGIN", payload: data });
        history.replace("/chats");
      })
      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
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
