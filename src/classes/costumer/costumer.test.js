import Costumer from './costumer';

const costumer1 = new Costumer('Alice', 1, 'Pedido em andamento');
const costumer2 = new Costumer('Pedro', 2, 'Aguardando atendimento');
const costumer3 = new Costumer('Fernanda', 3, 'Pedido entregue');
const costumer4 = new Costumer('Felipe', 4, 'Finalizado');

test('Get costumer information', () => {
  expect(costumer1.GetCostumer()).toStrictEqual([
    'Alice',
    1,
    'Pedido em andamento',
  ]);

  expect(costumer2.GetCostumer()).toStrictEqual([
    'Pedro',
    2,
    'Aguardando atendimento',
  ]);

  expect(costumer3.GetCostumer()).toStrictEqual([
    'Fernanda',
    3,
    'Pedido entregue',
  ]);

  expect(costumer4.GetCostumer()).toStrictEqual(['Felipe', 4, 'Finalizado']);
});

test('Edit costumer name', () => {
  costumer1.EditName('Gabriela');
  expect(costumer1.GetCostumer()).toStrictEqual([
    'Gabriela',
    1,
    'Pedido em andamento',
  ]);

  costumer2.EditName('Vinícius');
  expect(costumer2.GetCostumer()).toStrictEqual([
    'Vinícius',
    2,
    'Aguardando atendimento',
  ]);

  costumer3.EditName('Geovana');
  expect(costumer3.GetCostumer()).toStrictEqual([
    'Geovana',
    3,
    'Pedido entregue',
  ]);

  costumer4.EditName('Daniel');
  expect(costumer4.GetCostumer()).toStrictEqual(['Daniel', 4, 'Finalizado']);
});

test('Edit costumer table', () => {
  costumer1.EditTable(2);
  expect(costumer1.GetCostumer()).toStrictEqual([
    'Gabriela',
    2,
    'Pedido em andamento',
  ]);

  costumer2.EditTable(3);
  expect(costumer2.GetCostumer()).toStrictEqual([
    'Vinícius',
    3,
    'Aguardando atendimento',
  ]);

  costumer3.EditTable(4);
  expect(costumer3.GetCostumer()).toStrictEqual([
    'Geovana',
    4,
    'Pedido entregue',
  ]);

  costumer4.EditTable(6);
  expect(costumer4.GetCostumer()).toStrictEqual(['Daniel', 6, 'Finalizado']);
});
