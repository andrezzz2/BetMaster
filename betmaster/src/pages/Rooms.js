import '../assets/styles/Rooms.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Rooms ({gameId, user}) {
    console.log("atualizando Rooms");
    const baseURL = "http://localhost:5300";
    const [interval, set_Interval] = useState();

    const [roomId, setRoomId] = useState(null);
    const [roomList, setRoomList] = useState(null);
    const [gameName, setGameName] = useState("");
    const [gameLink, setGameLink] = useState("");

    useEffect(()=>{
        axios.post(baseURL+"/games/getGame",{GameId: gameId}).then((response)=>{
            setGameName(response.data.Name);
            setGameLink(response.data.EmbedLink);
        });
        axios.post(baseURL+"/rooms/getAllRooms", {GameId: gameId}).then((response)=>{
            if(response.data)
                setRoomList(response.data);
        });
    }, [gameId]);


    function atualizarLista (){

        axios.post(baseURL+"/rooms/getAllRooms", {GameId: gameId}).then((response)=>{
            if(response.data)
                setRoomList(response.data);
        });
        
    }
    
    function criarSala (){

        const name = prompt("digite um nome para a sala");

        axios.post(baseURL+"/rooms/createRoom",{Name: name, GameId: gameId}).then((response)=>{
            console.log(response.data);
            roomSelect(name);
        });
        
    }


    function digitandoSala (){

        const name = document.getElementById("sala-requisitada").value;

        if(name){
            axios.post(baseURL+"/rooms/getRooms", {Name: name, GameId: gameId}).then((response)=>{
                setRoomList(response.data);                    
            });
        }else{
            atualizarLista();
        }
    }

    function roomSelect (name){

        axios.post(baseURL+"/rooms/joinRoom",{Name: name, GameId: gameId, Player: user.uid}).then((response)=>{
            console.log(response.data);
            setRoomId(name);
        });
         
    }

    function backToList(){

        axios.post(baseURL+"/rooms/leaveRoom",{Name: roomId, GameId: gameId, Player: user.uid}).then((response)=>{
            console.log(response.data);
            setRoomId(null);
        });

    }

    function roomStillExists(){

        console.log("checando se sala ainda existe");
        if(roomId){
            axios.post(baseURL+"/rooms/exists",{Name: roomId, GameId: gameId}).then((response)=>{
                if (!response.data.exists)
                    setRoomId(null);
            });
        }

    }

    useEffect(()=>{
        if(roomId)
            set_Interval(setInterval(roomStillExists, 1000)); //checar a cada segundo se a sala ainda existe
        else{
            clearInterval(interval);
            atualizarLista();
        }
    }, [roomId])

    

    

    return (

        <div className="Rooms">

            <aside className="Sidebar">
                <div className="Sidebar-options" onClick={atualizarLista}>Atualizar</div>
                <div className="Sidebar-options" onClick={criarSala}>Criar sala</div>
                <label>Buscar sala:</label>
                <input id="sala-requisitada" type="text" onInput={digitandoSala}></input>

            </aside>

            {roomId?(
                <div className="Room">
                    <div className="Game">
                        <iframe title={gameName} src={gameLink}  width="100%" height="100%" frameBorder="no" allowFullScreen={true} scrolling="no"></iframe>
                    </div>
                    <div className="Saguao">
                        <div className="Saguao-info">
                            <span id="Sala-sair" onClick={backToList}>sair</span>
                            <span>{gameName} - Sala {roomId}</span>
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
                    <span id="gameName">{gameName}</span>
                    <ul id="salasAtivas">
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