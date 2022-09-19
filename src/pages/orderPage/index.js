// @flow
import React, { Fragment, useEffect, useState } from 'react';
import './index.scss';
import * as ReactBootStrap from 'react-bootstrap';
import MyNavBar from '../../components/navBar';
import restaurantApi from '../../api';

// Para Testes
const order = 'titleStock';
const subtitle = 'subtitleStock';
const collumName = 'collumNameStock';
const buttonName = 'buttonNameStock';

// Nome das colunas da tabela
const columm1Name = 'Garçom';
const columm2Name = 'Mesa';
const columm3Name = 'Pedido';
const columm4Name = 'Status';
const columm5Name = 'ações';

const data = [];

/**
 * @function Stock
 * @description Tela de pedidos.
 *  Possui as funcionalidades de:
 *  - Adicionar novas linhas a partir de um formulário e um botão;
 *  - Editar linhas já existentes a partir de uma coluna de ações;
 *  - Filtrar os resultados com um bloco de texto
 * @return {html} Retorna a tela do estoque.
 */
export default function OrderPage(): any {
  const [itens, setItens] = useState(data);
  const [newChange, setNewChange] = useState(data);

  const [addFormData, setAddFormData] = useState({
    order: '',
    table: '',
    waiter: '',
  });

  const [editFormData, setEditFormData] = useState({
    order: '',
    table: '',
    waiter: '',
  });

  const [editItemId, setEditItemId] = useState(null);

  const [query, setQuery] = useState('');

  /**
   * @function handleAddFormChange
   * @waiter Recebe no formulário de adição de linha nova
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
   * @waiter Recebe no formulário de edição de linha da tabela existente
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
   * @waiter Recebe um comando de adição de nova linha da tabela
   * e adiciona as informações informadas à tabela.
   */
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      order: addFormData.order,
      table: addFormData.table,
      waiter: addFormData.waiter,
      menus_id: 1,
      users_id: 1,
    };

    restaurantApi
      .post(`/item/create`, newItem)
      .then((response) => {
        console.log(response);
        setNewChange(newItem);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /**
   * @function handleEditFormSubmit
   * @waiter Recebe um comando de confirmação de edição de linha da tabela existente
   * e sobreescreve a linha da tabela com as informações informadas.
   */
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedItem = {
      order: editFormData.order,
      table: editFormData.table,
      waiter: editFormData.waiter,
    };

    const newItens = [...itens];
    const index = itens.findIndex((item) => item.id === editItemId);
    newItens[index] = editedItem;
    setItens(newItens);
    setEditItemId(null);
  };

  /**
   * @function handleEditClick
   * @waiter Recebe um comando de edição de linha da tabela existente
   * e modifica a linha da tabela para receber um formulário.
   */
  const handleEditClick = (event, item) => {
    event.preventDefault();
    setEditItemId(item.id);

    const formValues = {
      order: item.order,
      table: item.table,
      waiter: item.waiter,
    };

    setEditFormData(formValues);
  };

  /**
   * @function handleCancelClick
   * @waiter Recebe um comando para cancelar a edição de linha da tabela existente.
   */
  const handleCancelClick = () => {
    setEditItemId(null);
  };

  /**
   * @function handleDeleteClick
   * @waiter Recebe um comando para apagar uma linha da tabela existente.
   */
  const handleDeleteClick = (itemId) => {
    restaurantApi
      .delete(`/item/delete/${itemId}`)
      .then((response) => {
        setNewChange(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /**
   * @function handleEdit
   * @waiter Altera as informações do item selecionado.
   * @param {number} itemId - Id do item que será editado.
   */
  const handleEdit = (itemId: number) => {
    const newItem = {
      order: editFormData.title,
      table: editFormData.table,
      waiter: editFormData.waiter,
    };

    restaurantApi
      .patch(`/item/update/${itemId}`, newItem)
      .then((response) => {
        setNewChange(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    restaurantApi
      .get(`/item/get`)
      .then((response) => {
        setItens(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [newChange]);

  return (
    <div className="stock">
      <MyNavBar />
      <div className="stock-title">
        <span className="stock-title__span" role={order}>
          Pedidos
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
              name="title"
              required="required"
              placeholder="Insira o pedido"
              onChange={handleAddFormChange}
            />
            <input
              className="stock-input"
              type="number"
              step="0.01"
              name="table"
              required="required"
              placeholder="Insira a mesa"
              onChange={handleAddFormChange}
            />
            <input
              className="stock-input"
              type="text"
              name="waiter"
              required="required"
              placeholder="Garçom"
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
                <th scope="col">{columm5Name}</th>
              </tr>
            </thead>
            <tbody>
              {itens
                .filter((item) => item.title.toLowerCase().includes(query))
                .map((item) => (
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  <>
                    {editItemId === item.id ? (
                      <tr className="stock-table-striped-editable">
                        <td>
                          <input
                            type="text"
                            name="title"
                            required="required"
                            placeholder="Garçom..."
                            value={editFormData.waiter}
                            onChange={handleEditFormChange}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            step="0.01"
                            name="table"
                            required="required"
                            placeholder="Insira a mesa..."
                            value={editFormData.table}
                            onChange={handleEditFormChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="waiter"
                            required="required"
                            placeholder="Insira o pedido..."
                            value={editFormData.order}
                            onChange={handleEditFormChange}
                          />
                        </td>
                        <td>
                          <button
                            className="stock-table-button"
                            type="submit"
                            onClick={() => handleEdit(item.id)}
                          >
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
                        <td>{item.waiter}</td>
                        <td>{item.table}</td>
                        <td className="waiter">{item.order}</td>
                        <td>{item.status}</td>
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
