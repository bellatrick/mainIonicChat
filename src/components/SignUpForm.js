import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cookies from 'js-cookie'
import './SignUpForm.css'
import {  useHistory } from 'react-router-dom'
import axios from 'axios'
// const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

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
    )
});

const initialValues = {
    name: "",
    password: "",
    confirmPassword: "",
    phoneNumber: ""
};

const SignUpForm = () => {
 const history =useHistory()
 
    const submitHandler = async (name, password, phoneNumber)=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username:name, phoneNumber,password})
        }
       try{
        // const {data} = await axios.post('https://anter-chat-app.herokuapp.com/api/v1/users/signup', 
        //     {
        //         "username": name,
        //         "phoneNumber": phoneNumber,
        //         "password": password
        //     }
        // )
        //  data && Cookies.set('userInfo', data.user);
        history.replace('/chats')
         // const verification = await axios.post('https://anter-chat-app.herokuapp.com/api/v1/users/verify/2791')
        //  console.log(data.data)
         // console.log(verification)
       }
      catch(err){
          console.log(err)
      }
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={signInSchema}
            onSubmit={(values) => {
                submitHandler(values.name,values.phoneNumber,values.password)
                console.log(values.name, values.password, values.phoneNumber);
            }}
        >
            {(formik) => {
                const { errors, touched, isValid, dirty } = formik;
                return (
                    <div className="formSec">
                        <h1>Create an account</h1>
                        <Form className="signUp">
                            <div className="form-row">
                                <label htmlFor="fullName">Name</label>
                                <Field
                                    type="text"
                                    PlaceHolder='Full Name'
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
                                    PlaceHolder='Phone Number'
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
                                    PlaceHolder='Password'
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
                                    PlaceHolder='Confirm Password'
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
                                disabled={!(dirty && isValid)}
                            >
                                Register
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

