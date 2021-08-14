import { useContext, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IonSpinner } from "@ionic/react";
import { Storage } from "@capacitor/storage";
import axios from 'axios'
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
  useEffect(() => {
    if (state.user) {
      history.push('/chats');
    }
  }, [])
  const submitForm = async (phoneNumber, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post("https://anter-chat-app.herokuapp.com/api/v1/user/login", {    
        phoneNumber,
        password,
      });
      dispatch({ type: 'LOGIN', payload: data.data.user });
      localStorage.setItem('user', JSON.stringify(data.data.user));
      history.push('/chats')
      setLoading(false)
    } catch (err) {
      if(err.message) setError(err.message)
      setError('Invalid credentials')
      setLoading(false)
    }
  }

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
