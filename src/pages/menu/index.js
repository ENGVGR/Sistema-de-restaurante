// @flow
import React from 'react';
import './index.scss';
import MenuItem from '../../components/menuItem';
import MyNavBar from '../../components/navBar';

const temporalyList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const title = 'titleCardapio';

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
        <span className="menu-subtitle__span">Hambúrgueres:</span>
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
        <span className="menu-subtitle__span">Bebidas:</span>
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
