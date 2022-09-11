// @flow
import React from 'react';
import './index.scss';
import * as ReactBootStrap from 'react-bootstrap';
import MyNavBar from '../../components/navBar';

const title = 'titleStock';

/**
 * @function Stock
 * @description Tela do estoque
 * @return {html} Retorna a tela do estoque.
 */
export default function Stock(): any {
  const itemList = [
    { nome: 'Pão', preco: 2.0, quantidade: 5 },
    { nome: 'Batata', preco: 3.0, quantidade: 15 },
    { nome: 'Queijo', preco: 2.5, quantidade: 10 },
    { nome: 'Tomate', preco: 1.5, quantidade: 20 },
  ];

  return (
    <div className="stock">
      <MyNavBar />
      <div className="stock-title">
        <span className="stock-title__span" role={title}>
          Estoque
        </span>
      </div>
      <div className="stock-table">
        <ReactBootStrap.Table
          striped
          boardered
          hover
          className="stock-table-striped"
        >
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Preço (R$)</th>
              <th scope="col">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((i) => (
              <tr>
                <td>{i.nome}</td>
                <td>{i.preco.toFixed(2)}</td>
                <td>{i.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </ReactBootStrap.Table>
      </div>
    </div>
  );
}
