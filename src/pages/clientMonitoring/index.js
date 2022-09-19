/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
// @flow
import React, { Fragment, useContext, useEffect, useState } from 'react';
import './index.scss';
import * as ReactBootStrap from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MyNavBar from '../../components/navBar';
import restaurantApi from '../../api';
import UserContext from '../../context/user.context';

// Para Testes
const title = 'titleMonitor';
const subtitle = 'subtitleMonitor';
const collumName = 'collumNameMonitor';
const buttonAdd = 'buttonNameMonitor';

// Nome das colunas da tabela
const columm1Name = 'Cliente';
const columm2Name = 'Mesa';
const columm3Name = 'Status';

const data = [];

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
  const [itens, setItens] = useState(data);
  const [newChange, setNewChange] = useState();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [addFormData, setAddFormData] = useState({
    id: '',
    table: '',
    status: '',
  });

  const [editFormData, setEditFormData] = useState({
    id: '',
    table: '',
    status: '',
  });

  const [editItemId, setEditItemId] = useState(null);

  if (!user) navigate('/');

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

    const newTable = {
      table: parseInt(addFormData.table, 10),
    };

    restaurantApi
      .post(`/costumer/create`, newTable)
      .then(() => {
        setNewChange(newTable);
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
      id: editFormData.id,
      table: parseInt(editFormData.table, 10),
      status: editFormData.status,
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
      table: item.table,
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
      .delete(`/costumer/delete/${itemId}`)
      .then((response) => {
        setNewChange(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /**
   * @function handleEdit
   * @description Altera o número da mesa do cliente selecionado.
   * @param {number} costumerId - Id do cliente que será editado.
   */
  const handleEdit = (costumerId: number) => {
    const newTable = {
      table: parseInt(editFormData.table, 10),
    };

    restaurantApi
      .patch(`/costumer/update/${costumerId}`, newTable)
      .then((response) => {
        setNewChange(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /**
   * @function handleEditStatus
   * @description Altera o status do pedido do cliente selecionado.
   * @param {number} costumerId - Id do cliente que será editado.
   * @param {string} stat - novo status que será recebido.
   */
  const handleEditStatus = (costumerId: number, stat: string) => {
    const newStatus = {
      status: stat,
    };

    restaurantApi
      .get(`/order/get`)
      .then((response) => {
        const orderList = response.data;
        orderList.map((user2) => {
          if (costumerId === user2.users_id)
            restaurantApi
              .patch(`/order/update/${user2.id}`, newStatus)
              .then((response2) => {
                console.log(stat);
                setNewChange(response2);
              })
              .catch((e) => {
                console.log(e);
              });
        });
      })

      .catch((e) => {
        console.log(e);
      });
  };

  const [query, setQuery] = useState('');

  useEffect(() => {
    restaurantApi
      .get(`/costumer/get`)
      .then((response) => {
        restaurantApi
          .get(`/order/get`)
          .then((response2) => {
            const orderList = response2.data;
            response.data.map((item) => {
              orderList.map((user2) => {
                if (item.id === user2.users_id && user2.status.data[0] === 1)
                  item.status = 'Finalizado';
                else if (
                  item.id === user2.users_id &&
                  user2.status.data[0] === 0
                )
                  item.status = 'Em andamento';
                else item.status = 'Aguardando atendimento';
              });
            });
            setItens(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [newChange]);

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
              type="number"
              name="table"
              required="required"
              placeholder="Número da mesa..."
              onChange={handleAddFormChange}
            />
            <button
              className="monitor-preface-search-button"
              type="submit"
              role={buttonAdd}
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
              {itens
                .filter((item) =>
                  item.table.toString().toLowerCase().includes(query)
                )
                .map((item) => (
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  <>
                    {editItemId === item.id ? (
                      <tr className="monitor-table-striped-editable">
                        <td>
                          <input
                            readOnly
                            name="id"
                            required="required"
                            placeholder="Id"
                            value={item.id}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="table"
                            required="required"
                            placeholder="Número da mesa..."
                            value={editFormData.table}
                            onChange={handleEditFormChange}
                          />
                        </td>
                        <td>
                          <button
                            className="monitor-table-button"
                            type="submit"
                            onClick={() => handleEditStatus(item.id, 0)}
                          >
                            Em andamento
                          </button>
                          <button
                            className="monitor-table-button"
                            type="submit"
                            onClick={() => handleEditStatus(item.id, 1)}
                          >
                            Finalizar
                          </button>
                        </td>
                        <td>
                          <button
                            className="monitor-table-button"
                            type="submit"
                            onClick={() => handleEdit(item.id)}
                          >
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
                        <td>{item.id}</td>
                        <td>{item.table}</td>
                        <td>{item.status}</td>
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
