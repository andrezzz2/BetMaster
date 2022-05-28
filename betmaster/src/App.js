import './assets/styles/App.css';
import moeda from './assets/imgs/moeda.png';
import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Games from './pages/Games';
import axios from 'axios';

function App({user}) {
  
    const baseURL = "http://localhost:5300";

    const auth = getAuth();
    const [moedas, setMoedas] = useState(0);
    const [icon, setIcon] = useState("");
    const [page, setPage] = useState(<Home/>);
    const [gameId, setGameId] = useState(-1);

    function logOut (){
        signOut(auth).then(() => {

        }).catch((error) => {

        });
    }

    function comprarMoedas (){
        
    }

    function GamesPageHandle (){
        if(gameId === 0)
            setPage(<Games gameId={gameId} setGameId={setGameId}/>);
        else
            setGameId(0);
    }

    useEffect(()=>{
        axios.post(baseURL+"/users/getUser",{UID: user.uid}).then((response)=>{
            setIcon(response.data.PhotoURL);
            setMoedas(response.data.Moedas);
        });
    });
    

    useEffect(()=>{
        setPage(<Games gameId={gameId} setGameId={setGameId}/>);
    }, [gameId])

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
                    <div className="NavbarItem" onClick={()=>setPage(<Home/>)}>Inicio</div>
                    <div className="NavbarItem" onClick={GamesPageHandle}>Jogos</div>
                    <div className="NavbarItem">opção</div>
                    <div className="NavbarItem">opção</div>
                </div>
                <div className="Moedas" onClick={comprarMoedas}>
                    <img id="Moedas" src={moeda} alt='moeda'></img>
                    <p>{String(moedas)+"$"}</p>
                </div>
            </header>
            
            {page}

        </div>
    );
}

export default App;
