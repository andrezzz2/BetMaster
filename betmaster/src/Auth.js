import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import App from './App';
import Login from './pages/Login';
import axios from 'axios';

function Auth() {
  console.log("Component - atualizando Auth");
  
  const baseURL = "http://localhost:5300";

  const auth = getAuth();


  const [response, setResponse] = useState(<p>loading...</p>);

  const [User, setUser] = useState(null);
  

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  
  useEffect(()=>{

    if(User){

      axios.post(baseURL+"/users/create", {UID: User.uid, Email: User.email, PhotoURL: User.photoURL}).then((response) => {
        
        if(response.data.accepted){
          console.log(response.data.log);
        } else {
          console.error(response.data.error);
        }

      });
      setResponse(<App user={User}/>);

    }
    else
      setResponse(<Login/>);

  }, [User]);

  return response;

}

export default Auth;
