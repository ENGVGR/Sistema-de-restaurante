// @flow
import React, { Fragment, useState } from 'react';
import './index.scss';
import * as ReactBootStrap from 'react-bootstrap';
import MyNavBar from '../../components/navBar';

const title = 'titleStock';
const subtitle = 'subtitleStock';
const collumName = 'collumNameStock';
const buttonName = 'buttonNameStock';

const data = [
  { id: 1, nome: 'Pão', preco: 2.0, quantidade: 5 },
  { id: 2, nome: 'Batata', preco: 3.0, quantidade: 15 },
  { id: 3, nome: 'Queijo', preco: 2.5, quantidade: 10 },
  { id: 4, nome: 'Tomate', preco: 1.5, quantidade: 20 },
];

let newId = 5;

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

  const [editFormData, setEditFormData] = useState({
    nome: '',
    preco: '',
    quantidade: '',
  });

  const [editItemId, setEditItemId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      id: newId,
      nome: addFormData.nome,
      preco: parseFloat(addFormData.preco),
      quantidade: parseInt(addFormData.quantidade, 10),
    };
    newId += 1;

    const newItems = [...items, newItem];
    setItems(newItems);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedItem = {
      id: editItemId,
      nome: editFormData.nome,
      preco: parseFloat(editFormData.preco),
      quantidade: parseInt(editFormData.quantidade, 10),
    };

    const newItems = [...items];
    const index = items.findIndex((item) => item.id === editItemId);
    newItems[index] = editedItem;
    setItems(newItems);
    setEditItemId(null);
  };

  const handleEditClick = (event, item) => {
    event.preventDefault();
    setEditItemId(item.id);

    const formValues = {
      nome: item.nome,
      preco: item.preco,
      quantidade: item.quantidade,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditItemId(null);
  };

  const handleDeleteClick = (itemId) => {
    const newItems = [...items];

    const index = items.findIndex((item) => item.id === itemId);

    newItems.splice(index, 1);

    setItems(newItems);
  };

  const [query, setQuery] = useState('');

  return (
    <div className="stock">
      <MyNavBar />
      <div className="stock-title">
        <span className="stock-title__span" role={title}>
          Estoque
        </span>
      </div>
      <div>
        <input
          className="stock-search"
          type="text"
          placeholder="Buscar..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="stock-table">
        <form onSubmit={handleEditFormSubmit}>
          <ReactBootStrap.Table
            striped
            boardered
            hover
            className="stock-table-striped"
          >
            <thead role={collumName}>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Preço (R$)</th>
                <th scope="col">Quantidade</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items
                .filter((item) => item.nome.toLowerCase().includes(query))
                .map((item) => (
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  <>
                    {editItemId === item.id ? (
                      <tr className="stock-table-striped-editable">
                        <td>
                          <input
                            type="text"
                            name="nome"
                            required="required"
                            placeholder="Insira um nome..."
                            value={editFormData.nome}
                            onChange={handleEditFormChange}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            step="0.01"
                            name="preco"
                            required="required"
                            placeholder="Insira um preço..."
                            value={editFormData.preco}
                            onChange={handleEditFormChange}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="quantidade"
                            required="required"
                            placeholder="Insira uma quantidade..."
                            value={editFormData.quantidade}
                            onChange={handleEditFormChange}
                          />
                        </td>
                        <td>
                          <button className="stock-table-button" type="submit">
                            Atualizar
                          </button>
                          <button
                            className="stock-table-button"
                            type="button"
                            onClick={handleCancelClick}
                          >
                            Cancelar
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr className="stock-table-striped-readOnly">
                        <td>{item.nome}</td>
                        <td>{item.preco.toFixed(2)}</td>
                        <td>{item.quantidade}</td>
                        <td>
                          <button
                            className="stock-table-button"
                            type="button"
                            onClick={(event) => handleEditClick(event, item)}
                          >
                            Editar
                          </button>
                          <button
                            className="stock-table-button"
                            type="button"
                            onClick={() => handleDeleteClick(item.id)}
                          >
                            Apagar
                          </button>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
            </tbody>
          </ReactBootStrap.Table>
        </form>
      </div>
      <div className="stock-subtitle" role={subtitle}>
        <span className="stock-subtitle__span">Adicionar novo item</span>
      </div>
      <div className="stock-form">
        <form onSubmit={handleAddFormSubmit}>
          <input
            className="stock-input"
            type="text"
            name="nome"
            required="required"
            placeholder="Insira um nome..."
            onChange={handleAddFormChange}
          />
          <input
            className="stock-input"
            type="number"
            step="0.01"
            name="preco"
            required="required"
            placeholder="Insira um preço..."
            onChange={handleAddFormChange}
          />
          <input
            className="stock-input"
            type="number"
            name="quantidade"
            required="required"
            placeholder="Insira uma quantidade..."
            onChange={handleAddFormChange}
          />
          <button className="stock-button" type="submit" role={buttonName}>
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
}
