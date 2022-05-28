import '../assets/styles/Rooms.css';
import { useState } from 'react';
import axios from 'axios';

function Rooms () {

    const baseURL = "http://localhost:5300";

    const [roomId, setRoomId] = useState(null);
    const [roomList, setRoomList] = useState(null);

    
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

    function backToList(){
        setRoomId(null);
    }

    return (

        <div className="Rooms">

            <div className="Sidebar">
                <div className="Sidebar-options" onClick={atualizarLista}>Atualizar</div>
                <div className="Sidebar-options" onClick={buscarSala}>Buscar sala</div>
                <input id="sala-requisitada" onInput={digitandoSala}></input>
                <div className="Sidebar-options" onClick={criarSala}>Criar sala</div>
            </div>

            {roomId?(
                <div className="Room">
                    <div className="Game">joguinho</div>
                    <div className="Saguao">
                        <div className="Saguao-info">
                            <span id="Sala-sair" onClick={backToList}>sair</span>
                            <span>Sala {roomId}</span>
                        </div>
                        <div className="Player1">
                            <p>Player 1</p>
                            <div id="informaçao1"> blabla </div>
                            <div id="informaçao2"> blabla </div>
                            <div id="informaçao3"> blabla </div>
                        </div>
                        <div className="Player2">
                            <p>Player 2</p>
                            <div id="informaçao1"> blabla </div>
                            <div id="informaçao2"> blabla </div>
                            <div id="informaçao3"> blabla </div>
                        </div>
                    </div>
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

    )

}

export default Rooms