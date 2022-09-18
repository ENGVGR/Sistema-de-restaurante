// @flow
import React from 'react';
import { Card } from 'react-bootstrap';
// $FlowFixMe
import 'bootstrap/dist/css/bootstrap.min.css';

const nameRole = 'name';
const ingredientsRole = 'ingredients';
const priceRole = 'price';

type Props = {
  name: string,
  price: number,
  quantity: number,
  ingredients: string,
};

type ReadOnlyProps = $ReadOnly<Props>;

/**
 * @function MenuItem
 * @description Componente que retorna um card com as informações do alimento. Informações fornecidas como parâmetro da função. Possui três tipos diferentes de retorno. Um para quando o cliente acessa, outro para quando o garçom acessa (pode adicionar ao pedido o item) e outro para quando o administrador acessa (pode adicionar, editar ou remover um item).
 * @param {string} name - Nome do alimento.
 * @param {number} price - Preço do alimento.
 * @param {number} quantity - Quantidade de estoque do alimento.
 * @param {string} ingredients - Ingredientes do alimento.
 * @return {html} Retorna a card com as informações, fornecidas, do alimento.
 */

export default function MenuItem(props: ReadOnlyProps): any {
  const { name, price, ingredients } = props;

  return (
    <Card
      className="text-center"
      style={{ width: 'calc(250px )', margin: '2vh' }}
    >
      <Card.Body style={{ background: '#3b0032' }}>
        <Card.Title style={{ color: '#EBEAA9' }} role={nameRole}>
          {name || 'Nome'}
        </Card.Title>
        <Card.Text style={{ color: '#EBEAA9' }} role={priceRole}>
          {price ? `R$ ${price},00` : 'Preço'}
        </Card.Text>
        <Card.Text style={{ color: '#EBEAA9' }} role={ingredientsRole}>
          {ingredients || 'Ingredientes'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
