import '../assets/styles/GamesLists.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function GamesLists({setGameId, setInRoom}){
    console.log("atualizando GamesLists");

    const baseURL = "http://localhost:5300";
    const [gameList, setGameList] = useState([]);
    
    useEffect(()=>{
        axios.get(baseURL+"/games/getGames").then((response)=>{
            setGameList(response.data);
        });
    }, []);

    return(

        <div className="GamesLists">

            <center><p className="Genero">Tiro</p></center>
            <div className="GamesList">
                {gameList.map(game=>{
                    return(
                        <article className="jogo" key={game.GameId} onClick={()=>{setInRoom(true); setGameId(game.GameId);}}>
                            <p>{game.Name}</p>
                            <img src="" alt={game.Name}/>
                            <p>Dificuldade</p>
                            <p>{game.Difficullty}</p>
                            <p className="Descricao">Descrição: {game.Description}</p>
                        </article>
                    )
                })}
            </div>

            <center><p className="Genero">Aventura</p></center>
            <div className="GamesList">
                <article className="jogo" id=""  onClick={()=>setGameId(1)}>
                    <p>Jogo 1</p>
                    <img src="" alt='jogo1'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(2)}>
                    <p>Jogo 2</p>
                    <img src="" alt='jogo2'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(3)}>
                    <p>Jogo 3</p>
                    <img src="" alt='jogo3'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(4)}>
                    <p>Jogo 4</p>
                    <img src="" alt='jogo4'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(5)}>
                    <p>Jogo 5</p>
                    <img src="" alt='jogo5'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
            </div>

            <center><p className="Genero">Genero</p></center>
            <div className="GamesList">
                <article className="jogo" id=""  onClick={()=>setGameId(1)}>
                    <p>Jogo 1</p>
                    <img src="" alt='jogo1'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(2)}>
                    <p>Jogo 2</p>
                    <img src="" alt='jogo2'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(3)}>
                    <p>Jogo 3</p>
                    <img src="" alt='jogo3'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(4)}>
                    <p>Jogo 4</p>
                    <img src="" alt='jogo4'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(5)}>
                    <p>Jogo 5</p>
                    <img src="" alt='jogo5'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
            </div>

            <center><p className="Genero">Genero</p></center>
            <div className="GamesList">
                <article className="jogo" id=""  onClick={()=>setGameId(1)}>
                    <p>Jogo 1</p>
                    <img src="" alt='jogo1'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(2)}>
                    <p>Jogo 2</p>
                    <img src="" alt='jogo2'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(3)}>
                    <p>Jogo 3</p>
                    <img src="" alt='jogo3'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(4)}>
                    <p>Jogo 4</p>
                    <img src="" alt='jogo4'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(5)}>
                    <p>Jogo 5</p>
                    <img src="" alt='jogo5'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
            </div>

            <center><p className="Genero">Genero</p></center>
            <div className="GamesList">
                <article className="jogo" id=""  onClick={()=>setGameId(1)}>
                    <p>Jogo 1</p>
                    <img src="" alt='jogo1'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(2)}>
                    <p>Jogo 2</p>
                    <img src="" alt='jogo2'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(3)}>
                    <p>Jogo 3</p>
                    <img src="" alt='jogo3'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(4)}>
                    <p>Jogo 4</p>
                    <img src="" alt='jogo4'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(5)}>
                    <p>Jogo 5</p>
                    <img src="" alt='jogo5'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
            </div>

            <center><p className="Genero">Genero</p></center>
            <div className="GamesList">
                <article className="jogo" id=""  onClick={()=>setGameId(1)}>
                    <p>Jogo 1</p>
                    <img src="" alt='jogo1'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(2)}>
                    <p>Jogo 2</p>
                    <img src="" alt='jogo2'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(3)}>
                    <p>Jogo 3</p>
                    <img src="" alt='jogo3'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(4)}>
                    <p>Jogo 4</p>
                    <img src="" alt='jogo4'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(5)}>
                    <p>Jogo 5</p>
                    <img src="" alt='jogo5'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
            </div>

            <center><p className="Genero">Genero</p></center>
            <div className="GamesList">
                <article className="jogo" id=""  onClick={()=>setGameId(1)}>
                    <p>Jogo 1</p>
                    <img src="" alt='jogo1'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(2)}>
                    <p>Jogo 2</p>
                    <img src="" alt='jogo2'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(3)}>
                    <p>Jogo 3</p>
                    <img src="" alt='jogo3'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(4)}>
                    <p>Jogo 4</p>
                    <img src="" alt='jogo4'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(5)}>
                    <p>Jogo 5</p>
                    <img src="" alt='jogo5'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
            </div>

            <center><p className="Genero">Genero</p></center>
            <div className="GamesList">
                <article className="jogo" id=""  onClick={()=>setGameId(1)}>
                    <p>Jogo 1</p>
                    <img src="" alt='jogo1'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(2)}>
                    <p>Jogo 2</p>
                    <img src="" alt='jogo2'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(3)}>
                    <p>Jogo 3</p>
                    <img src="" alt='jogo3'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(4)}>
                    <p>Jogo 4</p>
                    <img src="" alt='jogo4'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
                <article className="jogo" onClick={()=>setGameId(5)}>
                    <p>Jogo 5</p>
                    <img src="" alt='jogo5'/>
                    <p>Dificuldade</p>
                    <p className="Descricao">Descrição: blablablabla</p>
                </article>
            </div>

        </div>

    )

}


export default GamesLists;