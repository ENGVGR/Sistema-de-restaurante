// @flow
import React, { Fragment, useState } from 'react';
import './index.scss';
import * as ReactBootStrap from 'react-bootstrap';
import MyNavBar from '../../components/navBar';

// Para Testes
const title = 'titleStock';
const subtitle = 'subtitleStock';
const collumName = 'collumNameStock';
const buttonName = 'buttonNameStock';

// Nome das colunas da tabela
const columm1Name = 'Nome';
const columm2Name = 'Preço (R$)';
const columm3Name = 'Quantidade';
const columm4Name = 'Ações';

const data = [];
let newId = 1;

/**
 * @function Stock
 * @description Tela do estoque.
 *  Possui as funcionalidades de:
 *  - Adicionar novas linhas a partir de um formulário e um botão;
 *  - Editar linhas já existentes a partir de uma coluna de ações;
 *  - Filtrar os resultados com um bloco de texto
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

  const [query, setQuery] = useState('');

  /**
   * @function handleAddFormChange
   * @description Recebe no formulário de adição de linha nova
   * as informações digitadas.
   */
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  /**
   * @function handleEditFormChange
   * @description Recebe no formulário de edição de linha da tabela existente
   * as informações digitadas.
   */
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  /**
   * @function handleAddFormSubmit
   * @description Recebe um comando de adição de nova linha da tabela
   * e adiciona as informações informadas à tabela.
   */
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

  /**
   * @function handleEditFormSubmit
   * @description Recebe um comando de confirmação de edição de linha da tabela existente
   * e sobreescreve a linha da tabela com as informações informadas.
   */
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

  /**
   * @function handleEditClick
   * @description Recebe um comando de edição de linha da tabela existente
   * e modifica a linha da tabela para receber um formulário.
   */
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

  /**
   * @function handleCancelClick
   * @description Recebe um comando para cancelar a edição de linha da tabela existente.
   */
  const handleCancelClick = () => {
    setEditItemId(null);
  };

  /**
   * @function handleDeleteClick
   * @description Recebe um comando para apagar uma linha da tabela existente.
   */
  const handleDeleteClick = (itemId) => {
    const newItems = [...items];

    const index = items.findIndex((item) => item.id === itemId);

    newItems.splice(index, 1);

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
      <div className="stock-subtitle" role={subtitle}>
        <span className="stock-subtitle__span">Adicionar novo item</span>
      </div>
      <div className="stock-preface">
        <div className="stock-preface-search">
          <input
            className="stock-preface-search-input"
            type="text"
            placeholder="Buscar..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="stock-preface-form">
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
            <button
              className="stock-preface-search-button"
              type="submit"
              role={buttonName}
            >
              Adicionar
            </button>
          </form>
        </div>
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
                <th scope="col">{columm1Name}</th>
                <th scope="col">{columm2Name}</th>
                <th scope="col">{columm3Name}</th>
                <th scope="col">{columm4Name}</th>
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
    </div>
  );
}
