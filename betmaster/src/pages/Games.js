import GamesLists from './GamesLists';
import Rooms from './Rooms';
import { useState } from 'react';

function Games({inRoom, setInRoom}){
    
    console.log("atualizando Games");
    const [gameId, setGameId] = useState(0);

    if(inRoom)
        return <Rooms gameId={gameId}/>
    else
        return <GamesLists setGameId={setGameId} setInRoom={setInRoom}/>

}


export default Games;