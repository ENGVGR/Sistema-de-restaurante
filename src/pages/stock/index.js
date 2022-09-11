// @flow
import React, { useState } from 'react';
import './index.scss';
import * as ReactBootStrap from 'react-bootstrap';
import MyNavBar from '../../components/navBar';

const title = 'titleStock';

const data = [
  { nome: 'Pão', preco: 2.0, quantidade: 5 },
  { nome: 'Batata', preco: 3.0, quantidade: 15 },
  { nome: 'Queijo', preco: 2.5, quantidade: 10 },
  { nome: 'Tomate', preco: 1.5, quantidade: 20 },
];

/**
 * @function Stock
 * @description Tela do estoque
 * @return {html} Retorna a tela do estoque.
 */
export default function Stock(): any {
  const [items, setItems] = useState(data);
  const [addFormData, setAddFormData] = useState({
    nome: '',
    preco: '',
    quantidade: '',
  });

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      nome: addFormData.nome,
      preco: parseFloat(addFormData.preco),
      quantidade: parseInt(addFormData.quantidade, 10),
    };

    const newItems = [...items, newItem];
    setItems(newItems);
  };

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
            {items.map((item) => (
              <tr>
                <td>{item.nome}</td>
                <td>{item.preco.toFixed(2)}</td>
                <td>{item.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </ReactBootStrap.Table>
      </div>
      <div className="stock-subtitle">
        <span className="stock-subtitle__span">Adicionar novo item</span>
      </div>
      <div className="stock-form">
        <form onSubmit={handleAddFormSubmit}>
          <input
            type="text"
            name="nome"
            required="required"
            placeholder="Insira um nome..."
            onChange={handleAddFormChange}
          />
          <input
            type="number"
            step="0.01"
            name="preco"
            required="required"
            placeholder="Insira um preço..."
            onChange={handleAddFormChange}
          />
          <input
            type="number"
            name="quantidade"
            required="required"
            placeholder="Insira uma quantidade..."
            onChange={handleAddFormChange}
          />
          <button type="submit">Adicionar</button>
        </form>
      </div>
    </div>
  );
}
