/* eslint-disable prettier/prettier */

// @flow
import React, { Fragment, useState } from 'react';
import './index.scss';
import * as ReactBootStrap from 'react-bootstrap';
import MyNavBar from '../../components/navBar';

// Para Testes
const title = 'titleMonitor';
const subtitle = 'subtitleMonitor';
const collumName = 'collumNameMonitor';
const buttonName = 'buttonNameMonitor';

// Nome das colunas da tabela
const columm1Name = 'Cliente';
const columm2Name = 'Mesa';
const columm3Name = 'Status';

const data = [];
let newId = 1;

/**
 * @function Monitor
 * @description Tela de monitoramento e edição de clientes.
 *  Possui as funcionalidades de:
 *  - Adicionar novas linhas a partir de um formulário e um botão;
 *  - Editar linhas já existentes a partir de uma coluna de ações;
 *  - Filtrar os resultados com um bloco de texto
 * @return {html} Retorna a tela de monitoramento e edição de clientes.
 */
export default function Monitor(): any {
  const [items, setItems] = useState(data);

  const [addFormData, setAddFormData] = useState({
    nome: '',
    mesa: '',
    estatus: '',
  });

  const [editFormData, setEditFormData] = useState({
    nome: '',
    mesa: '',
    estatus: '',
  });

  const [editItemId, setEditItemId] = useState(null);

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
      mesa: parseInt(addFormData.mesa, 10),
      estatus: addFormData.estatus,
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
      mesa: parseInt(editFormData.mesa, 10),
      estatus: editFormData.estatus,
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
      mesa: item.mesa,
      estatus: item.estatus,
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

  const [query, setQuery] = useState('');

  return (
    <div className="monitor">
      <MyNavBar />
      <div className="monitor-title">
        <span className="monitor-title__span" role={title}>
          Acompanhamento de Clientes
        </span>
      </div>
      <div className="monitor-subtitle" role={subtitle}>
        <span className="monitor-subtitle__span">Adicionar novo cliente</span>
      </div>
      <div className="monitor-preface">
        <div className="monitor-preface-search">
          <input
            className="monitor-preface-search-input"
            type="text"
            placeholder="Buscar..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="monitor-preface-form">
          <form onSubmit={handleAddFormSubmit}>
            <input
              className="monitor-input"
              type="text"
              name="nome"
              required="required"
              placeholder="Insira um nome..."
              onChange={handleAddFormChange}
            />
            <input
              className="monitor-input"
              type="number"
              name="mesa"
              required="required"
              placeholder="Número da mesa:"
              onChange={handleAddFormChange}
            />
            <input
              className="monitor-input"
              type="text"
              name="estatus"
              required="required"
              placeholder="Status do pedido:"
              onChange={handleAddFormChange}
            />
            <button
              className="monitor-preface-search-button"
              type="submit"
              role={buttonName}
            >
              Adicionar
            </button>
          </form>
        </div>
      </div>
      <div className="monitor-table">
        <form onSubmit={handleEditFormSubmit}>
          <ReactBootStrap.Table
            striped
            boardered
            hover
            className="monitor-table-striped"
          >
            <thead role={collumName}>
              <tr>
                <th scope="col">{columm1Name}</th>
                <th scope="col">{columm2Name}</th>
                <th scope="col">{columm3Name}</th>
              </tr>
            </thead>
            <tbody>
              {items
                .filter((item) => item.nome.toLowerCase().includes(query))
                .map((item) => (
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  <>
                    {editItemId === item.id ? (
                      <tr className="monitor-table-striped-editable">
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
                            name="mesa"
                            required="required"
                            placeholder="Insira um preço..."
                            value={editFormData.mesa}
                            onChange={handleEditFormChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="estatus"
                            required="required"
                            placeholder="Status do pedido:"
                            value={editFormData.estatus}
                            onChange={handleEditFormChange}
                          />
                        </td>
                        <td>
                          <button className="monitor-table-button" type="submit">
                            Atualizar
                          </button>
                          <button
                            className="monitor-table-button"
                            type="button"
                            onClick={handleCancelClick}
                          >
                            Cancelar
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr className="monitor-table-striped-readOnly">
                        <td>{item.nome}</td>
                        <td>{item.mesa}</td>
                        <td>{item.estatus}</td>
                        <td>
                          <button
                            className="monitor-table-button"
                            type="button"
                            onClick={(event) => handleEditClick(event, item)}
                          >
                            Editar
                          </button>
                          <button
                            className="monitor-table-button"
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