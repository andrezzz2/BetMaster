import '../assets/styles/Rooms.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Rooms ({gameId, user}) {
    console.log("Component - atualizando Rooms");
    const baseURL = "http://localhost:5300";

    const [roomId, setRoomId] = useState(null);
    const [roomList, setRoomList] = useState(null);
    const [gameName, setGameName] = useState("");
    const [gameLink, setGameLink] = useState("");
    const [showCreateRoomForm, setShowCreateRoomForm] = useState(false);
    const [interval, SetInterval] = useState();

    useEffect(()=>{

        axios.post(baseURL+"/games/getGame",{GameId: gameId}).then((response)=>{
            
            if(response.data.accepted){
                setGameName(response.data.game.Name);
                setGameLink(response.data.game.EmbedLink);
            } else {
                console.error(response.data.error);
            }
            
        });

    }, [gameId]);

    useEffect(()=>{

        if(roomId)
            SetInterval(setInterval(connectingRoom, 1000)); //checar a cada segundo se a sala ainda existe
        else{
            clearInterval(interval);
            atualizarLista();
        }

    }, [roomId]);


    function atualizarLista (){

        axios.post(baseURL+"/rooms/getAllRooms", {GameId: gameId}).then((response)=>{
            if(response.data.accepted){
                setRoomList(response.data.List);
                console.log(response.data.log);
            }
            else
                console.error(response.data.error);
        });
        
    }

    function criarSalaFormHandler (){
        if(showCreateRoomForm===false)
            setShowCreateRoomForm(true);
        else
            setShowCreateRoomForm(false);
    }
    
    function criarSala (){

        const nameInput = document.getElementById("nomeSalaCriar");

        const name = nameInput.value;
        if(name.length>0)
            axios.post(baseURL+"/rooms/createRoom",{Name: name, GameId: gameId}).then((response)=>{
                
                if(response.data.accepted){
                    console.log(response.data.log);
                    nameInput.value = "";
                    setShowCreateRoomForm(false);

                    console.log("Entrando na sala ", name);
                    roomSelect(name);
                } else {
                    console.error(response.data.error);
                    alert(response.data.error);
                }
                    
            });
        else
            alert("É preciso digitar algum nome para a sala.");

    }


    function digitandoSala (){

        const name = document.getElementById("sala-requisitada").value;

        if(name){

            axios.post(baseURL+"/rooms/getRooms", {Name: name, GameId: gameId}).then((response)=>{
                
                if(response.data.accepted)
                    setRoomList(response.data.List);
                else  
                    console.error(response.data.error);  

            });

        } else {
            //nome zerado, então só atualizar a lista
            atualizarLista();

        }
    }

    function roomSelect (name){

        axios.post(baseURL+"/rooms/joinRoom",{Name: name, GameId: gameId, Player: user.uid}).then((response)=>{
            
            if(response.data.accepted){
                setRoomId(name);
                console.log(response.data.log);
            } else {
                console.error(response.data.error);
                atualizarLista();
            }
            
        });
         
    }

    function backToList(){

        setRoomId(null);

    }

    function connectingRoom(){
        //roomId podia ainda nao estar pronto
        if(roomId){

            axios.post(baseURL+"/rooms/connectRoom",{Name: roomId, GameId: gameId, UID: user.uid}).then((response)=>{
                
                if(response.data.accepted)
                    console.log(response.data.log);
                else{
                    console.error(response.data.error);
                    backToList();
                }
                    

            });

        }

    }
    

    

    return (

        <div className="Rooms">

            <aside className="Sidebar">
                <div className="Sidebar-options" onClick={atualizarLista}>Atualizar</div>
                <div className="Sidebar-options" onClick={criarSalaFormHandler}>Criar sala</div>
                {showCreateRoomForm?(
                    <div className='CriarSala'>
                        <label id="nomeSalaCriar-label">Nome:</label>
                        <input id="nomeSalaCriar" type="text"></input>
                        <button id="botaoCriarSala"onClick={criarSala}>Criar</button>
                    </div> 
                ):(<></>)}
                <label id="buscarSala">Buscar sala:</label>
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
                    <hr style={{"width":"80%"}}/>
                    <ul id="salasAtivas">
                        {roomList?.map((room)=>{
                            if(room.Name)
                                return  <li className="SalaAtiva" key={room.Name} onClick={()=>roomSelect(room.Name)}>
                                            <span className='SalaAtivaName'>{room.Name}</span>
                                            {room.Player2?<span className='SalaAtivaDisponibilidade' style={{color:"red"}}>2/2</span>:
                                                          <span className='SalaAtivaDisponibilidade' style={{color:"green"}}>1/2</span>
                                                          }
                                        </li>
                            else
                                return <></>
                        })}
                    </ul>
                </div>
            )}

        </div>

    )

}

export default Rooms