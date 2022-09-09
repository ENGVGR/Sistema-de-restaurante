// @flow
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const user = 'costumer';

  return (
    <Card className="text-center" style={{ width: '18rem' }}>
      {user === 'costumer' && (
        <Card.Body>
          <Card.Title role={nameRole}>{name || 'Nome'}</Card.Title>
          <Card.Text role={priceRole}>
            {('R$ ' && price && ',00') || 'Preço'}
          </Card.Text>
          <Card.Text role={ingredientsRole}>
            {ingredients || 'Ingredientes'}
          </Card.Text>
        </Card.Body>
      )}
      {user === 'waiter' && (
        <Card.Body>
          <Card.Title role={nameRole}>{name || 'Nome'}</Card.Title>
          <Card.Text role={priceRole}>
            {('R$ ' && price && ',00') || 'Preço'}
          </Card.Text>
          <Card.Text role={quantityRole}>
            {(quantity && ' unidades') || 'Quantidade'}
          </Card.Text>
          <Card.Text role={ingredientsRole}>
            {ingredients || 'Ingredientes'}
          </Card.Text>
          <Button variant="primary">Adicionar</Button>
        </Card.Body>
      )}

      {user === 'adm' && (
        <Card.Body>
          <Card.Title role={nameRole}>{name || 'Nome'}</Card.Title>
          <Card.Text role={priceRole}>
            {('R$ ' && price && ',00') || 'Preço'}
          </Card.Text>
          <Card.Text role={quantityRole}>
            {(quantity && ' unidades') || 'Quantidade'}
          </Card.Text>
          <Card.Text role={ingredientsRole}>
            {ingredients || 'Ingredientes'}
          </Card.Text>
          <Button variant="primary">Editar</Button>
          <Button
            variant="primary"
            style={{ background: 'red', margin: '2vw' }}
          >
            Excluir
          </Button>
        </Card.Body>
      )}
    </Card>
  );
}
