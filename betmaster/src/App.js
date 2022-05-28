import './assets/styles/App.css';
import moeda from './assets/imgs/moeda.png';
import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Games from './pages/Games';
import axios from 'axios';

function App({user}) {
    console.log("atualizando App");
  
    const baseURL = "http://localhost:5300";

    const auth = getAuth();
    const [moedas, setMoedas] = useState(0);
    const [icon, setIcon] = useState("");
    const [page, setPage] = useState(<Home/>);
    const [inRoom, setInRoom] = useState(false);
    
    useEffect(()=>{
        axios.post(baseURL+"/users/getUser",{UID: user.uid}).then((response)=>{
            setIcon(response.data.PhotoURL);
            setMoedas(response.data.Moedas);
        });
    }, [user]);

    useEffect(()=>{
        if(inRoom===true)
            setPage(<Games inRoom={true} setInRoom={setInRoom}/>);
    }, [inRoom]);

    function logOut (){
        signOut(auth).then(() => {

        }).catch((error) => {

        });
    }

    function comprarMoedas (){
        
    }
    
    return (
        <div className="App">

            <header className="Header">
                <div className="Perfil-icon" onClick={()=>setPage(<Profile/>)}>
                    <img id="Perfil-icon" src={icon} alt='perfil-icon'></img>
                    <div id="LogOut-container">
                        <p id="LogOut" onClick={logOut}>sair</p>
                        <hr></hr>
                    </div>
                </div>
                <div className="Navbar">
                    <div className="NavbarItem" onClick={()=>{setInRoom(false); setPage(<Home/>);}}>Inicio</div>
                    <div className="NavbarItem" onClick={()=>{setInRoom(false); setPage(<Games inRoom={false} setInRoom={setInRoom}/>);}}>Jogos</div>
                    <div className="NavbarItem">opção</div>
                    <div className="NavbarItem">opção</div>
                </div>
                <div className="Moedas" onClick={comprarMoedas}>
                    <img id="Moedas" src={moeda} alt='moeda'></img>
                    <p>{moedas+"$"}</p>
                </div>
            </header>
            
            {page}

        </div>
    );
}

export default App;
