/* eslint-disable prettier/prettier */
// @flow
import React from 'react';
import './index.scss';
import MenuItem from '../../components/menuItem';
import MyNavBar from '../../components/navBar';

const temporalyList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const title = 'titleCardapio';
const burguer = 'burguer';
const drink = 'drink';

/**
 * @function Menu
 * @description Tela do cardápio
 * @return {html} Retorna a tela do cardápio.
 */
export default function Menu(): any {
  return (
    <div className="menu">
      <MyNavBar />
      <div className="menu-title">
        <span className="menu-title__span" role={title}>
          Cardápio
        </span>
      </div>
      <div className="menu-subtitle">
        <span className="menu-subtitle__span" role={burguer}>
          Hambúrgueres:
        </span>
      </div>
      <div className="menu-itens">
        {temporalyList.map((i) => (
          <MenuItem
            key={i}
            name={`Hambúrguer ${i}`}
            price={i}
            ingredients="Pão e carne"
            quantity={i}
          />
        ))}
      </div>
      <div className="menu-subtitle">
        <span className="menu-subtitle__span" role={drink}>
          Bebidas:
        </span>
      </div>
      <div className="menu-itens">
        {temporalyList.map((i) => (
          <MenuItem
            name={`Bebida ${i}`}
            price={i}
            ingredients="Vodka e suco"
            quantity={i}
          />
        ))}
      </div>
    </div>
  );
}
