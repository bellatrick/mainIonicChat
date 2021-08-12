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
const SignInForm = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(Store);
  // const { userInfo } = state;
  const [loading, setLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState({passwordErr:'', phoneNoErr:'', GeneralErr:''})
  const [error, setError] = useState(false);
  const submitForm = async (phoneNumber, password) => {
    try {
    if(password===''){
      setErrorMessage({...errorMessage, passwordErr:'Password must not be empty'})
    }
    else if(phoneNumber===''){
      setErrorMessage({...errorMessage, passwordErr:'Phone number must not be empty'})
    }
    else{
      setErrorMessage({...errorMessage, GeneralErr:'Invalid credentials'})
    }
    setLoading(true);
       const data = {
         phoneNumber, password
       }
       dispatch({ action: "LOGIN", payload: data });
      setErrorMessage(null)
      // const { data } = await axios.post(
      //   "https://anter-chat-app.herokuapp.com/api/v1/users/login",
      //   {
      //     "phoneNumber": phoneNumber,
      //     "password": password
      //   }
      // );
      // if (data.user) {
      //   history.push('/chats')
      //   //  data && Cookies.set('userInfo', data.user);
      // 
      // }

      // console.log(data.user);
    } catch (err) {
      setError(true);
      setLoading(false);
      console.log(err.message);
    }
    setLoading(false);
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
            {error &&  <h3>Invalid credentials</h3>}

            {/* {error && Object.keys(errorMessage).length > 0 &&<div className=" error-message">
          <ul className="list">
          {Object.keys(errorMessage).length > 0 &&
            Object.values(errorMessage).map((value) =>(
                <li key={value}>{value}</li>
            )
            )}
        </ul>
      </div>} */}
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
                    errors.password && touched.password ? "input-error" : null
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
                disabled={!(dirty && isValid)}
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
