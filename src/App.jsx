import { useState } from "react";
import Comprar from "./components/Comprar";
import Registrar from "./components/Registrar";
import logo from "./assets/logo.png";
import picanhaImg from "./assets/picanha.png";
import alcatraImg from "./assets/alcatra.png";
import frangoImg from "./assets/frango.png";
import "./App.css";

function App() {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: "Picanha", preco: 69.99, imagem: picanhaImg },
    { id: 2, nome: "Alcatra", preco: 49.99, imagem: alcatraImg },
    { id: 3, nome: "Frango Assado", preco: 40.0, imagem: frangoImg },
  ]);

  const [tela, setTela] = useState("comprar");
  const [usuario, setUsuario] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [loginData, setLoginData] = useState({ nome: "", senha: "" });
  const [carrinho, setCarrinho] = useState([]);

  // Login
  const usuariosValidos = ["marcia", "kellisson","Marica","Kellisson"];
  const handleLogin = () => {
    const nomeValido = usuariosValidos.includes(loginData.nome.toLowerCase());
    const senhaValida = loginData.senha === "123";

    if (nomeValido && senhaValida) {
      setUsuario(loginData.nome);
      setMostrarLogin(false);
      setLoginData({ nome: "", senha: "" });
      alert("Login realizado com sucesso!");
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  // Logout
  const handleLogout = () => {
    setUsuario(null);
    setTela("comprar");
  };

  // Adicionar ao carrinho
  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

  // Finalizar compra
  const finalizarCompra = () => {
    if (carrinho.length === 0) return;
    alert("Compra finalizada com sucesso! Obrigado pela preferência 😄");
    setCarrinho([]);
  };

  return (
    <div className="app">
      <header>
        <img src={logo} alt="Logo Açougue" className="logo" />

        <nav>
          {usuario && (
            <>
              <button
                className={tela === "comprar" ? "active" : ""}
                onClick={() => setTela("comprar")}
              >
                Comprar
              </button>
              <button
                className={tela === "registrar" ? "active" : ""}
                onClick={() => setTela("registrar")}
              >
                Registrar Produto
              </button>
            </>
          )}
        </nav>
      </header>

      <main>
        <div className="container">
          {tela === "comprar" && (
            <Comprar produtos={produtos} adicionarAoCarrinho={adicionarAoCarrinho} />
          )}

          {tela === "registrar" && usuario && (
            <Registrar produtos={produtos} setProdutos={setProdutos} setTela={setTela} />
          )}

          {carrinho.length > 0 && tela === "comprar" && (
            <div className="carrinho">
              <h3>Carrinho</h3>
              {carrinho.map((item, index) => (
                <div className="carrinho-item" key={index}>
                  <img src={item.imagem} alt={item.nome} />
                  <div className="carrinho-info">
                    <h4>{item.nome}</h4>
                    <p>R$ {item.preco}</p>
                  </div>
                </div>
              ))}

              <div className="carrinho-total">Total: R$ {total.toFixed(2)}</div>

              <button className="btn-finalizar" onClick={finalizarCompra}>
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      </main>

      {carrinho.length > 0 && tela === "comprar" && (
        <button
          className="btn-carrinho"
          onClick={() =>
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
          }
        >
          Ir ao Carrinho ({carrinho.length})
        </button>
      )}

      <footer>
        <div className="info-contato">
          <p>Av Nossa Senhora de Fátima, 1467</p>
          <p>Delivery: 3295-5938 | (19) 99958-0095</p>
        </div>

        {!usuario ? (
          <p className="login-text" onClick={() => setMostrarLogin(true)}>
            Login
          </p>
        ) : (
          <p className="login-text" onClick={handleLogout}>
            Sair ({usuario})
          </p>
        )}
      </footer>

      {mostrarLogin && (
        <div className="modal-fundo" onClick={() => setMostrarLogin(false)}>
          <div className="modal-login" onClick={(e) => e.stopPropagation()}>
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Usuário"
              value={loginData.nome}
              onChange={(e) =>
                setLoginData({ ...loginData, nome: e.target.value })
              }
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <input
              type="password"
              placeholder="Senha"
              value={loginData.senha}
              onChange={(e) =>
                setLoginData({ ...loginData, senha: e.target.value })
              }
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <button onClick={handleLogin}>Entrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
