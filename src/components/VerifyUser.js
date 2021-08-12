import {useState} from 'react'
import { useHistory } from 'react-router-dom';
import './VerifyUser.css'
import {IonSpinner} from '@ionic/react'
import axios from 'axios'
function VerifyUser() {
    const history= useHistory()
    const [loading, setLoading] = useState(false)
    const [verificationCode, setVerificationCode] = useState({
        firstCode:'',
        secondCode:'',
        thirdCode:'',
        fourthCode:''
    })
    const [error, setError] = useState(false)
    const handleVerify = async (e)=>{
        try{
        setError(false)
        setLoading(true)
        e.preventDefault()
       const  {firstCode,secondCode,thirdCode,fourthCode} = verificationCode
   const code =  +`${firstCode}${secondCode}${thirdCode}${fourthCode}`
      console.log(code);
  
        // const data = await axios.post(`https://anter-chat-app.herokuapp.com/api/v1/users/verify/${code}`)
        // console.log(data, code, 'hi')
        // if(isVerified){
        //    
        //     setLoading(false)
        // } else {
        //     setError(true)
        //     setLoading(false)
        // }
        history.push('/login')
      
     }
     catch(err){
        setError(true)
        setLoading(false)
    }
    }
    return (
        <div className="head">
            <h1 className="head__header">OTP Verification</h1>
            <small className="head__verification-text">Enter the code sent to your sms</small>
             {error &&  <h3>Invalid verification code</h3>}

            <form className="verification-input" onSubmit={handleVerify}>
                <div className="verification-input-container">
                    <input type="text" className="code" maxLength="1" value={verificationCode.firstCode} onChange={(e)=>setVerificationCode({...verificationCode, firstCode:e.target.value})} />
                    <input type="text" className="code" maxLength="1" value={verificationCode.secondCode} onChange={(e)=>setVerificationCode({...verificationCode,secondCode:e.target.value})} />
                    <input type="text" className="code" maxLength="1" value={verificationCode.thirdCode} onChange={(e)=>setVerificationCode({...verificationCode,thirdCode:e.target.value})} />
                    <input type="text" className="code" maxLength="1" value={verificationCode.fourthCode} onChange={(e)=>setVerificationCode({...verificationCode,fourthCode:e.target.value})}/>
                </div>
                {/* <p>Didn't receive a code? <Link href="#" className="option-text__link">Resend</Link></p> */}

                <button type="submit" className="btn verification-input__btn"> Verify {loading && <IonSpinner name='bubbles'/>}</button>
            </form>
        </div>
    )
}

export default VerifyUser
