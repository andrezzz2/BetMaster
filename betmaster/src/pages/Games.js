import GamesLists from './GamesLists';
import Rooms from './Rooms';
import { useState } from 'react';

function Games(){

    const [gameId, setGameId] =  useState(0);

    return gameId? <Rooms gameId={gameId}/> : <GamesLists setGameId={setGameId}/>

}


export default Games;