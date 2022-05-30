import '../assets/styles/Home.css';


function Home(){

    console.log("Component - atualizando Home");

    return(

        <div className="Home">
            
            <div className="section">
                <h1>Versão 0.1</h1>
                <ul>
                    <li>LogIn e LogOut</li>
                    <li>Criação de salas</li>
                    <li>Participar de uma sala</li>
                    <li>Lista de jogos</li>
                </ul>
            </div>

            <div className="section">
                <h1>Versão 0.2</h1>
                <ul>
                    <li>2 primeiros jogos</li>
                    <li>Listas por genero</li>
                </ul>
            </div>

            <div className="section">
                <h1>Versão 0.3</h1>
                <ul>
                    <li>Controle de entrada e saida dos jogadores nas salas</li>
                    <li>Mudança na estrutura da pagina inicial</li>
                    <li>Footer adicionado</li>
                    <li>Estrutura melhor na sidebar da lista de salas</li>
                </ul>
            </div>
        
        </div>

    )

}


export default Home;