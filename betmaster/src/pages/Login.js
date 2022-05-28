import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import '../assets/styles/Login.css';
import moeda from '../assets/imgs/moeda.png';

function Login (){
    
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    function signIn () {
        signInWithPopup(auth, provider).then((result) =>{
            //const credential = GoogleAuthProvider.credentialFromResult(result);
            //const token = credential.accessToken;
            //const user = result.user;
        }).catch(alert);
    }
    
    return(
        <div className="Login">
            <img id="Login-moeda" src={moeda} alt='Login-moeda'></img>
            <div id="Login-button" onClick={signIn}>Login com google</div>
        </div>
    )
}

export default Login;