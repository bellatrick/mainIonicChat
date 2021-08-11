import React from 'react'
import { Link } from 'react-router-dom';
import './VerifyUser.css'

function VerifyUser() {
    return (
        <div className="head">
            <h1 className="head__header">OTP Verification</h1>
            <small className="head__verification-text">Enter the code sent to your sms</small>


            <form className="verification-input">
                <div className="verification-input-container">
                    <input type="text" className="code" maxlength="1" />
                    <input type="text" className="code" maxlength="1" />
                    <input type="text" className="code" maxlength="1" />
                    <input type="text" className="code" maxlength="1" />
                </div>
                {/* <p>Didn't receive a code? <Link href="#" className="option-text__link">Resend</Link></p> */}

                <button type="submit" className="btn verification-input__btn"> Verify</button>
            </form>
        </div>
    )
}

export default VerifyUser
