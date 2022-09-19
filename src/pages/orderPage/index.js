/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
// @flow
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import * as ReactBootStrap from 'react-bootstrap';
import MyNavBar from '../../components/navBar';
import restaurantApi from '../../api';
import UserContext from '../../context/user.context';

// Para Testes
const title = 'titleOrder';
const subtitle = 'subtitleOrder';
const collumName = 'collumNameOrder';
const buttonName = 'buttonNameOrder';

// Nome das colunas da tabela
const columm1Name = 'Garçom';
const columm2Name = 'Mesa';
const columm3Name = 'Pedido';
const columm4Name = 'Valor';
const columm5Name = 'Status';
const columm6Name = 'ações';

const data = [];

/**
 * @function Stock
 * @description Tela de pedid.
 *  Possui as funcionalidades de:
 *  - Adicionar novas linhas a partir de um formulário e um botão;
 *  - Editar linhas já existentes a partir de uma coluna de ações;
 *  - Filtrar os resultados com um bloco de texto
 * @return {html} Retorna a tela do estoque.
 */
export default function OrderPage(): any {
  const [itens, setItens] = useState(data);
  const [newChange, setNewChange] = useState(data);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) navigate('/');

  const [addFormData, setAddFormData] = useState({
    mesa: '',
    order_id: '',
    pedido: '',
    pessoa: '',
    status: '',
    waiter: '',
    item_id: '',
    price: '',
  });

  const [editFormData, setEditFormData] = useState({
    mesa: '',
    order_id: '',
    pedido: '',
    pessoa: '',
    status: '',
    waiter: '',
    item_id: '',
    price: '',
  });

  const [editItemId, setEditItemId] = useState(null);

  /*  const [query, setQuery] = useState(''); */

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

    restaurantApi
      .get(`/costumer/get`)
      .then((response) => {
        let newCostumerId = '';
        response.data.map((i) => {
          if (i.table.toString() === addFormData.mesa) {
            newCostumerId = i.id;
          }
        });
        restaurantApi.get(`/users/get`).then((response2) => {
          let newUserId = '';
          response2.data.map((i) => {
            if (i.name === addFormData.waiter) {
              newUserId = i.id;
            }
          });
          restaurantApi.get(`/item/get`).then((response3) => {
            let newItemId = '';
            response3.data.map((i) => {
              if (i.title === addFormData.pedido) {
                newItemId = i.id;
              }
            });
            const newOrder = {
              users_id: newUserId,
              status: 0,
              customers_id: newCostumerId,
            };
            restaurantApi
              .post(`/order/create`, newOrder)
              .then(() => {})
              .catch((e) => {
                console.log(e);
              });
            restaurantApi
              .get(`/order/get`)
              .then((response4) => {
                let orderId = '';
                response4.data.map((i) => {
                  if (
                    i.customers_id === newCostumerId &&
                    i.users_id === newUserId
                  ) {
                    orderId = i.id;
                  }
                });
                const newOrderItem = {
                  orders_id: orderId,
                  items_id: newItemId,
                };
                restaurantApi
                  .post(`/orderItens/create`, newOrderItem)
                  .then(() => {
                    setNewChange(newOrderItem);
                  });
              })
              .catch((e) => {
                console.log(e);
              });
          });
        });
      })

      .catch((e) => {
        console.log(e);
      });
    setNewChange('response');
    setNewChange('response2');
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
      name: editFormData.name,
      price: editFormData.price,
      description: editFormData.description,
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
      mesa: item.mesa,
      order_id: item.order_id,
      pedido: item.pedido,
      pessoa: item.pessoa,
      status: item.status,
      waiter: item.waiter,
      item_id: item.item_id,
      price: item.price,
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
  const handleDeleteClick = (orderId, itemId) => {
    restaurantApi
      .delete(`/orderItens/delete/${orderId}/${itemId}`)
      .then((response) => {
        setNewChange(response);
      })
      .catch((e) => {
        console.log(e);
      });
    setNewChange('response');
  };

  /**
   * @function handleEdit
   * @description Altera as informações do item selecionado.
   * @param {number} itemId - Id do item que será editado.
   */
  const handleEdit = (itemId) => {
    const newItem = {
      name: editFormData.name,
      price: editFormData.price,
      description: editFormData.description,
    };

    restaurantApi
      .patch(`/item/update/${itemId}`, newItem)
      .then((response) => {
        setNewChange(response);
      })
      .catch((e) => {
        console.log(e);
      });
    setNewChange('response');
  };

  /**
   * @function handleEditStatus
   * @description Altera o status do pedido do cliente selecionado.
   * @param {number} costumerId - Id do cliente que será editado.
   * @param {string} stat - novo status que será recebido.
   */
  const handleEditStatus = (waiterId: number, custumersId, stat: string) => {
    const newStatus = {
      status: stat,
    };

    restaurantApi
      .get(`/order/get`)
      .then((response) => {
        const orderList = response.data;
        console.log(response);
        orderList.map((user2) => {
          if (waiterId === user2.users_id && custumersId === user2.customers_id)
            restaurantApi
              .patch(`/order/update/${user2.id}`, newStatus)
              .then((response2) => {
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
    setNewChange('response');
  };

  useEffect(() => {
    restaurantApi
      .get(`/costumer/getOrders`)
      .then((response) => {
        restaurantApi
          .get(`/order/get`)
          .then((response2) => {
            response.data.map((item) => {
              response2.data.map((order) => {
                if (order.customers_id === item.pessoa) {
                  item.waiter = order.users_id || item.waiter;
                  item.order_id = order.order_id || item.order_id;
                  if (order.status && order.status.data[0] === 1) {
                    item.status = 'Finalizado';
                  } else {
                    item.status = 'Em andamento';
                  }
                }
              });
            });

            restaurantApi
              .get(`/item/get`)
              .then((response3) => {
                response.data.map((item) => {
                  response3.data.map((i) => {
                    if (i.title === item.pedido) {
                      item.item_id = i.id || item.item_id;
                      item.price = i.price || item.price;
                    }
                  });
                });
                restaurantApi.get(`/users/get`).then((response5) => {
                  response.data.map((item) => {
                    response5.data.map((waiter) => {
                      if (waiter.id === item.waiter) {
                        item.waiterName = waiter.name || item.waiterName;
                      }
                    });
                  });
                  setItens(response.data);
                });
              })
              .catch((e) => {
                console.log(e);
              });
          })
          .catch((e) => {
            console.log(e);
          });
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
        <span className="stock-title__span" role={title}>
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
            /* onChange={(e) => setQuery(e.target.value)} */
          />
        </div>
        <div className="stock-preface-form">
          <form onSubmit={handleAddFormSubmit}>
            <input
              className="stock-input"
              type="text"
              name="pedido"
              required="required"
              placeholder="Insira o nome do item..."
              onChange={handleAddFormChange}
            />
            <input
              className="stock-input"
              type="number"
              name="mesa"
              required="required"
              placeholder="Insira uma mesa..."
              onChange={handleAddFormChange}
            />
            <input
              className="stock-input"
              type="text"
              name="waiter"
              required="required"
              placeholder="Insira o nome do garçom..."
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
                <th scope="col">{columm6Name}</th>
              </tr>
            </thead>
            <tbody>
              {itens
                /* .filter((item) => item.pessoa.toLowerCase().includes(query)) */
                .map((item) => (
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  <>
                    {editItemId === item.id ? (
                      <tr className="stock-table-striped-editable">
                        <td>
                          <input
                            type="text"
                            name="waiter"
                            readOnly
                            placeholder="Insira o nome do garçon..."
                            value={editFormData.waiter}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="mesa"
                            readOnly
                            placeholder="Insira uma mesa..."
                            value={editFormData.mesa}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="pedido"
                            readOnly
                            placeholder="Insira uma ordem..."
                            value={editFormData.pedido}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="price"
                            readOnly
                            placeholder="Insira um valor..."
                            value={editFormData.price}
                          />
                        </td>
                        <td>
                          <button
                            className="monitor-table-button"
                            type="submit"
                            onClick={() =>
                              handleEditStatus(item.waiter, item.pessoa, 0)
                            }
                          >
                            Em andamento
                          </button>
                          <button
                            className="monitor-table-button"
                            type="submit"
                            onClick={() =>
                              handleEditStatus(item.waiter, item.pessoa, 1)
                            }
                          >
                            Finalizar
                          </button>
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
                        <td>{item.waiterName || 'garçom'}</td>
                        <td>{item.mesa}</td>
                        <td className="description">{item.pedido}</td>
                        <td className="description">{item.price}</td>
                        <td className="description">
                          {item.status || 'Em andamento'}
                        </td>
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
                            onClick={() =>
                              handleDeleteClick(item.order_id, item.item_id)
                            }
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
