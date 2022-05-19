import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import App from './App';
import Login from './Login';
import axios from 'axios';

function Auth() {

  const auth = getAuth();

  const baseURL = "http://localhost:5300";

  const [response, setResponse] = useState(<p>loading...</p>);

  const [User, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("logado");
      
      //criando usuário se ele não existir
      axios.post(baseURL+"/users/create", {UID: user.uid, Email: user.email, PhotoURL: user.photoURL}).then((response) => {
        console.log(response.data);
        setUser(user);
      });

    } else {

      setUser(null);
      
    }
  });

  useEffect(()=>{
    if(User)
      setResponse(<App user={User}/>);
    else
      setResponse(<Login/>);
  }, [User]);

  return response;
}

export default Auth;
