// @flow
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';

const nameRole = 'name';
const ingredientsRole = 'ingredients';
const priceRole = 'price';
const quantityRole = 'quantity';

type Props = {
  name: string,
  price: number,
  quantity: number,
  ingredients: string,
};

type ReadOnlyProps = $ReadOnly<Props>;

export default function MenuItem(props: ReadOnlyProps): any {
  const { name, price, quantity, ingredients } = props;

  return (
    <Card className="text-center" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title role={nameRole}>{name || 'Nome'}</Card.Title>
        <Card.Text role={priceRole}>{('R$' && price) || 'Preço'}</Card.Text>
        <Card.Text role={quantityRole}>
          {(quantity && 'unidades') || 'Quantidade'}
        </Card.Text>
        <Card.Text role={ingredientsRole}>
          {ingredients || 'Ingredientes'}
        </Card.Text>
        <Button variant="primary">Adicionar</Button>
      </Card.Body>
    </Card>
  );
}
