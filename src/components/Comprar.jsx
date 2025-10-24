import React from "react";

function Comprar({ produtos, adicionarAoCarrinho }) {
  return (
    <div className="lista-produtos">
      {produtos.map((produto) => (
        <div className="produto" key={produto.id}>
          <img src={produto.imagem} alt={produto.nome} />
          <h3>{produto.nome}</h3>
          <p>R$ {produto.preco}</p>
          <button onClick={() => adicionarAoCarrinho(produto)}>
            Adicionar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Comprar;
