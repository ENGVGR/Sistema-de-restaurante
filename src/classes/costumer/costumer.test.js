import Costumer from './costumer';
// const Costumer = require('./costumer');

const costumer1 = new Costumer('Alice', 1, 'Pedido em andamento');
const costumer2 = new Costumer('Pedro', 2, 'Aguardando atendimento');
const costumer3 = new Costumer('Fernanda', 3, 'Pedido entregue');
const costumer4 = new Costumer('Felipe', 4, 'Finalizado');

test('Get costumer1 information', () => {
  expect(costumer1.GetCostumer()).toStrictEqual([
    'Alice',
    1,
    'Pedido em andamento',
  ]);
});

test('Get costumer2 information', () => {
  expect(costumer2.GetCostumer()).toStrictEqual([
    'Pedro',
    2,
    'Aguardando atendimento',
  ]);
});

test('Get costumer3 information', () => {
  expect(costumer3.GetCostumer()).toStrictEqual([
    'Fernanda',
    3,
    'Pedido entregue',
  ]);
});

test('Get costumer4 information', () => {
  expect(costumer4.GetCostumer()).toStrictEqual(['Felipe', 4, 'Finalizado']);
});
