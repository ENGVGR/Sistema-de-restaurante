// @flow
import React from 'react';
import { Button, Card } from 'react-bootstrap';
// $FlowFixMe
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
    <Card className="text-center" style={{ width: '34vh', margin: '2vh' }}>
      {user === 'costumer' && (
        <Card.Body style={{ background: '#3b0032' }}>
          <Card.Title style={{ color: '#EBEAA9' }} role={nameRole}>
            {name || 'Nome'}
          </Card.Title>
          <Card.Text style={{ color: '#EBEAA9' }} role={priceRole}>
            {`R$ ${price},00` || 'Preço'}
          </Card.Text>
          <Card.Text style={{ color: '#EBEAA9' }} role={ingredientsRole}>
            {ingredients || 'Ingredientes'}
          </Card.Text>
        </Card.Body>
      )}
      {user === 'waiter' && (
        <Card.Body style={{ background: '#0E0B29' }}>
          <Card.Title style={{ color: '#EBEAA9' }} role={nameRole}>
            {name || 'Nome'}
          </Card.Title>
          <Card.Text style={{ color: '#EBEAA9' }} role={priceRole}>
            {`R$ ${price},00` || 'Preço'}
          </Card.Text>
          <Card.Text style={{ color: '#EBEAA9' }} role={quantityRole}>
            {`${quantity} unidades` || 'Quantidade'}
          </Card.Text>
          <Card.Text style={{ color: '#EBEAA9' }} role={ingredientsRole}>
            {ingredients || 'Ingredientes'}
          </Card.Text>
          <Button variant="primary">Adicionar</Button>
        </Card.Body>
      )}

      {user === 'adm' && (
        <Card.Body style={{ background: '#0E0B29' }}>
          <Card.Title style={{ color: '#EBEAA9' }} role={nameRole}>
            {name || 'Nome'}
          </Card.Title>
          <Card.Text style={{ color: '#EBEAA9' }} role={priceRole}>
            {`R$ ${price},00` || 'Preço'}
          </Card.Text>
          <Card.Text style={{ color: '#EBEAA9' }} role={quantityRole}>
            {`${quantity} unidades` || 'Quantidade'}
          </Card.Text>
          <Card.Text style={{ color: '#EBEAA9' }} role={ingredientsRole}>
            {ingredients || 'Ingredientes'}
          </Card.Text>
          <Button variant="primary">Editar</Button>
          <Button
            variant="primary"
            style={{ background: 'red', margin: '0px 0px 0px 10px' }}
          >
            Excluir
          </Button>
        </Card.Body>
      )}
    </Card>
  );
}
