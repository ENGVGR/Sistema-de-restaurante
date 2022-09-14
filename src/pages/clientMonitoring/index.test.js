/* eslint-disable prettier/prettier */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Monitor from './index';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('render Monitor', () => {
  render(<Monitor />);

  expect(screen.getByRole('titleMonitor')).toHaveTextContent('Acompanhamento de Clientes');
  expect(screen.getByRole('subtitleMonitor')).toHaveTextContent(
    'Adicionar novo item'
  );
//   expect(screen.getByRole('collumNameMonitor')).toHaveTextContent(
//     'Cliente',
//     'Mesa',
//     'Status'
//   );
//   expect(screen.getByRole('buttonNameMonitor')).toHaveTextContent('Adicionar');
});
