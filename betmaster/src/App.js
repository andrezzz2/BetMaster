import './assets/styles/App.css';
import moeda from './assets/imgs/moeda.png';
import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';

function App({user}) {
  
    const baseURL = "http://localhost:5300";

    const auth = getAuth();
    const [moedas, setMoedas] = useState(0);
    const [icon, setIcon] = useState("");
    const [roomId, setRoomId] = useState(null);
    const [roomList, setRoomList] = useState(null);

    function logOut (){
        signOut(auth).then(() => {

        }).catch((error) => {

        });
    }

    function irParaPerfil (){

    }

    function comprarMoedas (){

    }

    function criarSala (){

        const name = prompt("digite um nome para a sala");

        axios.post(baseURL+"/rooms/createRoom",{Name: name}).then((response)=>{
            atualizarLista();
        });
        
    }

    function atualizarLista (){

        axios.get(baseURL+"/rooms/getRooms").then((response)=>{
            
            if(response.data)
                setRoomList(response.data);
                
        });
        
    }

    function buscarSala (){

    }

    function digitandoSala (){

        const name = document.getElementById("sala-requisitada").value;

        if(name){
            axios.post(baseURL+"/rooms/getRooms", {Name: name}).then((response)=>{
                setRoomList(response.data);                    
            });
        }else{
            atualizarLista();
        }
    }

    function roomSelect (name){
        setRoomId(name);
    }

    useEffect(()=>{
        axios.post(baseURL+"/users/getUser",{UID: user.uid}).then((response)=>{
            setIcon(response.data.PhotoURL);
            setMoedas(response.data.Moedas);
        });
        atualizarLista();
    });

    return (
        <div className="App">

            <header className="Header">
                <div className="Perfil-icon" onClick={irParaPerfil}>
                    <img id="Perfil-icon" src={icon} alt='perfil-icon'></img>
                    <p id="LogOut" onClick={logOut}>sair</p>
                </div>
                <div className="Navbar">
                    <div className="NavbarItem">Inicio</div>
                    <div className="NavbarItem">Jogo 1</div>
                    <div className="NavbarItem">Jogo 2</div>
                    <div className="NavbarItem">Jogo 3</div>
                    <div className="NavbarItem">Sair</div>
                </div>
                <div className="Moedas" onClick={comprarMoedas}>
                    <img id="Moedas" src={moeda} alt='moeda'></img>
                    <p>{String(moedas)}</p>
                </div>
            </header>

            {/* colocar prop com jogo selecionado, para as coisas irem de a cordo com o jogo certo */}
            <div className="Rooms">

                <div className="Sidebar">
                    <div className="Sidebar-options" onClick={atualizarLista}>Atualizar</div>
                    <div className="Sidebar-options" onClick={buscarSala}>Buscar sala</div>
                    <input id="sala-requisitada" onInput={digitandoSala}></input>
                    <div className="Sidebar-options" onClick={criarSala}>Criar sala</div>
                </div>

                {roomId?(
                    <div className="Room">
                        <div className="Room-id-container">
                            <p id="Room-sair">{"<"}</p>
                            <p id="Room-id">{roomId}</p> 
                            
                        </div>
                        <div className="Game">joguinho</div>
                        <div className="Saguao">Saguao</div>
                    </div>
                ):(
                    <div className="SalasAtivas">
                        <ul>
                            {roomList?.map((room)=>{
                                return <li className="SalaAtiva" key={room.Name} onClick={()=>roomSelect(room.Name)}>{room.Name}</li>
                            })}
                        </ul>
                    </div>
                )}

            </div>
        </div>
    );
}

export default App;
