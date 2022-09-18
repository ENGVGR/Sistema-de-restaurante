// @flow
import React, { Fragment, useEffect, useState } from 'react';
import './index.scss';
import * as ReactBootStrap from 'react-bootstrap';
import MyNavBar from '../../components/navBar';
import restaurantApi from '../../api';

// Para Testes
const title = 'titleEmployee';
const subtitle = 'subtitleEmployee';
const collumName = 'collumNameEmployee';
const buttonName = 'buttonNameEmployee';

// Nome das colunas da tabela
const columm1Name = 'Nome';
const columm2Name = 'Email';
const columm3Name = 'Cargo';
const columm4Name = 'Ações';

const data = [];

/**
 * @function EmployeeMonitoring
 * @description Tela de monitoramento dos funcionários.
 *  Possui as funcionalidades de:
 *  - Adicionar novas linhas a partir de um formulário e um botão;
 *  - Editar linhas já existentes a partir de uma coluna de ações;
 *  - Filtrar os resultados com um bloco de texto
 * @return {html} Retorna a tela de monitoramento dos funcionários.
 */
export default function EmployeeMonitoring(): any {
  const [itens, setItens] = useState(data);
  const [newChange, setNewChange] = useState(data);

  const [addFormData, setAddFormData] = useState({
    title: '',
    email: '',
    role: '',
  });

  const [editFormData, setEditFormData] = useState({
    title: '',
    email: '',
    role: '',
  });

  const [editItemId, setEditItemId] = useState(null);

  const [query, setQuery] = useState('');

  /**
   * @function handleAddFormChange
   * @description Recebe no formulário de adição de linha nova
   * as informações digitadas.
   * @param {React.ChangeEventHandler<HTMLInputElement>} event - Evento de editar os dados de um formulário
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
   * @param {React.ChangeEventHandler<HTMLInputElement>} event - Evento de editar os dados de um formulário
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
   * @param {React.FormEventHandler<HTMLFormElement>} event - Evento de submeter um formulário
   */
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      title: addFormData.title,
      email: addFormData.email,
      role: addFormData.role,
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
   * @description Recebe um comando de confirmação de edição de linha da tabela existente
   * e sobreescreve a linha da tabela com as informações informadas.
   * @param {React.FormEventHandler<HTMLFormElement>} event - Evento de submeter um formulário
   */
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedItem = {
      title: editFormData.title,
      email: editFormData.email,
      role: editFormData.role,
    };

    const newItens = [...itens];
    const index = itens.findIndex((item) => item.id === editItemId);
    newItens[index] = editedItem;
    setItens(newItens);
    setEditItemId(null);
  };

  /**
   * @function handleEditClick
   * @description Recebe um comando de edição de linha da tabela existente
   * e modifica a linha da tabela para receber um formulário.
   * @param {React.MouseEventHandler<HTMLButtonElement>} event - Evento de receber um clique no Botão
   * @param {Object} item - Objeto que possui os atributos de um item da tabela
   */
  const handleEditClick = (event, item) => {
    event.preventDefault();
    setEditItemId(item.id);

    const formValues = {
      title: item.title,
      email: item.email,
      role: item.role,
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
   * @param {number} itemId - Id do item que será apoagado.
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
   * @description Altera as informações do item selecionado.
   * @param {number} itemId - Id do item que será editado.
   */
  const handleEdit = (itemId: number) => {
    const newItem = {
      title: editFormData.title,
      email: editFormData.email,
      role: editFormData.role,
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
    <div className="employee">
      <MyNavBar />
      <div className="employee-title">
        <span className="employee-title__span" role={title}>
          Funcionários
        </span>
      </div>
      <div className="employee-subtitle" role={subtitle}>
        <span className="employee-subtitle__span">Adicionar novo item</span>
      </div>
      <div className="employee-preface">
        <div className="employee-preface-search">
          <input
            className="employee-preface-search-input"
            type="text"
            placeholder="Buscar..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="employee-preface-form">
          <form onSubmit={handleAddFormSubmit}>
            <input
              className="employee-input"
              type="text"
              name="title"
              required="required"
              placeholder="Insira um nome..."
              onChange={handleAddFormChange}
            />
            <input
              className="employee-input"
              type="email"
              name="email"
              required="required"
              placeholder="Insira um email..."
              onChange={handleAddFormChange}
            />
            <input
              className="employee-input"
              type="text"
              name="role"
              required="required"
              placeholder="Insira um cargo..."
              onChange={handleAddFormChange}
            />
            <button
              className="employee-preface-search-button"
              type="submit"
              role={buttonName}
            >
              Adicionar
            </button>
          </form>
        </div>
      </div>
      <div className="employee-table">
        <form onSubmit={handleEditFormSubmit}>
          <ReactBootStrap.Table
            striped
            boardered
            hover
            className="employee-table-striped"
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
              {itens
                .filter((item) => item.title.toLowerCase().includes(query))
                .map((item) => (
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  <>
                    {editItemId === item.id ? (
                      <tr className="employee-table-striped-editable">
                        <td>
                          <input
                            type="text"
                            name="title"
                            required="required"
                            placeholder="Insira um nome..."
                            value={editFormData.title}
                            onChange={handleEditFormChange}
                          />
                        </td>
                        <td>
                          <input
                            type="email"
                            name="email"
                            required="required"
                            placeholder="Insira um email..."
                            value={editFormData.email}
                            onChange={handleEditFormChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="role"
                            required="required"
                            placeholder="Insira um cargo..."
                            value={editFormData.role}
                            onChange={handleEditFormChange}
                          />
                        </td>
                        <td>
                          <button
                            className="employee-table-button"
                            type="submit"
                            onClick={() => handleEdit(item.id)}
                          >
                            Atualizar
                          </button>
                          <button
                            className="employee-table-button"
                            type="button"
                            onClick={handleCancelClick}
                          >
                            Cancelar
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr className="employee-table-striped-readOnly">
                        <td>{item.title}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td>
                          <button
                            className="employee-table-button"
                            type="button"
                            onClick={(event) => handleEditClick(event, item)}
                          >
                            Editar
                          </button>
                          <button
                            className="employee-table-button"
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
