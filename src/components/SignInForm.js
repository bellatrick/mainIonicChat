import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./SignInForm.css";
import { Store } from "../utils/Store";
import { useHistory } from "react-router-dom";
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
  const submitForm = async (values) => {
   try{
    const {data} = await axios.post('https://anter-chat-app.herokuapp.com/api/v1/users/login', 
            {
            
                "phoneNumber": values.phoneNumber,
                "password": values.password
            }
        )
      dispatch({ action: "LOGIN", payload: data });
     
      console.log(data.data);
   }
   catch(err){
       console.log(err.message);
   }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={(values) => {
        submitForm(values);
        console.log(
          `Name: ${values.name} Phone Number: ${values.phoneNumber} Password: ${values.password}`
        );
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="formSec">
            <h1>Sign in to continue</h1>
            <Form className="signUp signIn">
              <div className="form-row">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field
                  type="phoneNumber"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeHolder='Phone Number'
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
                  placeHolder= 'Password'
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
              </button>
            </Form>
            {/* <p class="option-text">
                            Don't have an account? <Link className={classes["option-text__link"]} to="/register"><i>Sign up</i></Link>
                        </p> */}
          </div>
        );
      }}
    </Formik>
  );
};

export default SignInForm;
