// @flow
import React, { useEffect, useState } from 'react';
import './index.scss';
import MenuItem from '../../components/menuItem';
import MyNavBar from '../../components/navBar';
import restaurantApi from '../../api';

const title = 'titleCardapio';

/**
 * @function Menu
 * @description Tela do cardápio
 * @return {html} Retorna a tela do cardápio.
 */
export default function Menu(): any {
  const [itens, setItens] = useState();

  useEffect(() => {
    restaurantApi
      .get(`/item/get`)
      .then((response) => {
        setItens(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="menu">
      <MyNavBar />
      <div className="menu-title">
        <span className="menu-title__span" role={title}>
          Cardápio
        </span>
      </div>
      <div className="menu-itens">
        {itens.map((item) => (
          <MenuItem
            key={item.id}
            name={item.title}
            price={item.price}
            ingredients={item.description}
          />
        ))}
      </div>
    </div>
  );
}
