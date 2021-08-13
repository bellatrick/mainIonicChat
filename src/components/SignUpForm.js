import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { IonSpinner } from "@ionic/react";
import "./SignUpForm.css";
import { useHistory } from "react-router-dom";

const signInSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(4, "Name is too short - should be 4 chars min"),

  phoneNumber: Yup.string()
    .min(10, "Digits too short - should be 10 digits min")
    .max(14, "Digits should not be greater than 14"),

  password: Yup.string()
    .required("Password is required")
    .min(4, "Password is too short - should be 4 chars min"),

  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const initialValues = {
  name: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
};

const SignUpForm = () => {
  let errorMessage;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  // {
  //   "username": "Busayo",
  //   "phoneNumber": "+2348108932666",
  //   "password": "123456"
  // }
  const [error, setError] = useState("");
  const submitHandler = (name, phoneNumber, password) => {
    setLoading(true);
    setError("");
    fetch("https://anter-chat-app.herokuapp.com/api/v1/user/signup", {
      method: "POST",
      body: JSON.stringify({
        username: name,
        phoneNumber: phoneNumber,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data.message);
                 if(data.message){
                   throw new Error(data.message)
                   setError(data.message)
                 }else setError("Server Error! Please wait a moment and try again");

           
          });
        }
      })
      .then((data) => {
        console.log(data);
        history.replace("/verify");
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message)
       setLoading(false)
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={(values) => {
        submitHandler(values.name, values.phoneNumber, values.password);
        console.log(values.name, values.password, values.phoneNumber);
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="formSec">
            <h1>Create an account</h1>
            {<h3>{error}</h3>}
            <Form className="signUp">
              <div className="form-row">
                <label htmlFor="fullName">Name</label>
                <Field
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  id="fullName"
                  className={errors.name && touched.name ? "input-error" : null}
                />
                <ErrorMessage name="name" component="span" className="error" />
              </div>

              <div className="form-row">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  className={
                    errors.phoneNumber && touched.phoneNumber
                      ? "input-error"
                      : null
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
                    errors.password && touched.password ? ["input-error"] : null
                  }
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
              </div>

              <div className="form-row">
                <label htmlFor="confirmPassword">Verify Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? "input-error"
                      : null
                  }
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="span"
                  className="error"
                />
              </div>

              <button
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn btn" : "btn"}
                // disabled={!(dirty && isValid)}
              >
                Register {loading && <IonSpinner name="bubbles" />}
              </button>
            </Form>
            {/* <p class="option-text">
                            Already have an account? <Link class="option-text__link" to="/login"><i>Sign In</i></Link>
                        </p> */}
          </div>
        );
      }}
    </Formik>
  );
};

export default SignUpForm;
