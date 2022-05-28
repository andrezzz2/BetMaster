import GamesLists from './GamesLists';
import Rooms from './Rooms';
import { useEffect, useState } from 'react';

function Games({gameId, setGameId}){

    return gameId? <Rooms gameId={gameId}/> : <GamesLists setGameId={setGameId}/>

}


export default Games;