import {useHistory} from 'react-router-dom'
import {Button} from '@material-ui/core'
const VerifyMessage = () => {
    const history = useHistory()
    return (
        <div>
            <div className="head verifiedText">Your account has been successfully verified. Please click <Button onClick={()=>history.push('/login')}>here</Button> to login into your account</div>
        </div>
    )
}

export default VerifyMessage
