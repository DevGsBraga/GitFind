import { useState } from "react";
import { Header } from "../../components/Header";
import background from '../../assets/background.png';
import ItemList from '../../components/ItemList';

// CSS
import './img.css';


const App = () => {
// ESTADOS
const [usuario, setUsuario] = useState('');

const [atualUsuario, setAtualUsuario] = useState(null); // mostra o usuário atual

const [repositorio, setRepositorio] = useState(null); // Busca os repositorios

  //SEMPRE QUE TRABALHAR COM API, USA FUNÇÃO ASYNC PARA AGUARDAR A RSPOSTA, POIS ESTÁ SENDO BUSCADO A INFORMAÇÃO EXTERNAMENTE.

const buscarUsuarios = async () => {
  const usuarioData = await fetch(`https://api.github.com/users/${usuario}`)

  const newUsuario = await usuarioData.json();

  if(newUsuario.name) {
    const {avatar_url, name, bio, login} = newUsuario;
    setAtualUsuario({avatar_url, name, bio, login});

    const reposiData = await fetch(`https://api.github.com/users/${usuario}/repos`)

    const newReposi = await reposiData.json();


    if(newReposi.length) {
      setRepositorio(newReposi);
    }
  }
}






  return (
    <div className="App">
     <Header />

     <div className="background">

      <img src={background} className="foto-de-fundo" alt="foto-do-site"></img>

      <div className="conteudo">
        <input name="usuario" value={usuario} onChange={Event => setUsuario(Event.target.value)} placeholder="@UserName" />
        <button onClick={buscarUsuarios}>Buscar</button>


        {atualUsuario?.name ? (
    <>
          <div className="photoPerfil">
            <img src={atualUsuario.avatar_url} className="profile" alt="Foto do Perfil"></img>

            <div className="profileName">
              <h2>{atualUsuario.name}</h2>
              <p>@{atualUsuario.login}</p>
              <div className="descricao">
                <p>{atualUsuario.bio}</p>
              </div>
            </div>
          </div>
          <hr />
    </>
        ) : null }


        {repositorio?.length ? (

          <div className="resultado-repositorio">
          <h1 className="titulo-repositorio">Repositórios</h1>

          {repositorio.map(podeSerQualquerNome => (

              <ItemList title={podeSerQualquerNome .name} description={podeSerQualquerNome .description} />

              ))}
          </div>

        ): null}
      </div>
     </div>

    </div>
  );
}

export default App;
