import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./VerifyUser.css";
import { IonSpinner } from "@ionic/react";
import {Button} from '@material-ui/core'
function VerifyUser() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false)
  const [verificationCode, setVerificationCode] = useState({
    firstCode: "",
    secondCode: "",
    thirdCode: "",
    fourthCode: "",
  });
  const [error, setError] = useState('');
  const handleVerify = async (e) => {
     
      setError('');
      setLoading(true);
      e.preventDefault();
      const { firstCode, secondCode, thirdCode, fourthCode } = verificationCode;
      const code = +`${firstCode}${secondCode}${thirdCode}${fourthCode}`;
      console.log(code);
      fetch(`https://anter-chat-app.herokuapp.com/api/v1/user/verify/${code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(res);
          setLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              setError('Invalid code');
              throw new Error(error);
            });
          }
        })
        .then((data) => {
          console.log(data);        
          history.replace("/verifySuccess");
        })
        .catch((err) => {
          console.log(err);
          setError('Network failure')
          setLoading(false);
        });
  
  };
  
  return (
    <div className="head">
      <h1 className="head__header">OTP Verification</h1>
      <small className="head__verification-text">
        Enter the code sent to your sms
      </small>
      { <h3>{error}</h3>}

      <form className="verification-input" onSubmit={handleVerify}>
        <div className="verification-input-container">
          <input
            type="text"
            className="code"
            required
            maxLength="1"
            value={verificationCode.firstCode}
            onChange={(e) =>
              setVerificationCode({
                ...verificationCode,
                firstCode: e.target.value,
              })
            }
          />
          <input
            type="text"
            className="code"
            maxLength="1"
            required
            value={verificationCode.secondCode}
            onChange={(e) =>
              setVerificationCode({
                ...verificationCode,
                secondCode: e.target.value,
              })
            }
          />
          <input
            type="text"
            className="code"
            maxLength="1"
            required
            value={verificationCode.thirdCode}
            onChange={(e) =>
              setVerificationCode({
                ...verificationCode,
                thirdCode: e.target.value,
              })
            }
          />
          <input
            type="text"
            className="code"
            maxLength="1"
            required
            value={verificationCode.fourthCode}
            onChange={(e) =>
              setVerificationCode({
                ...verificationCode,
                fourthCode: e.target.value,
              })
            }
          />
        </div>
        {/* <p>Didn't receive a code? <Link href="#" className="option-text__link">Resend</Link></p> */}

        <button type="submit" className="btn verification-input__btn">
          {" "}
          Verify {loading && <IonSpinner name="bubbles" />}
        </button>
      </form>
    </div>
  );
}

export default VerifyUser;
