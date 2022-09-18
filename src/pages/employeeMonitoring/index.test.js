import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import EmployeeMonitoring from './index';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('render employee', () => {
  render(<EmployeeMonitoring />);

  expect(screen.getByRole('titleEmployee')).toHaveTextContent('Funcionários');
  expect(screen.getByRole('subtitleEmployee')).toHaveTextContent(
    'Adicionar novo item'
  );
  expect(screen.getByRole('collumNameEmployee')).toHaveTextContent(
    'Nome',
    'Email',
    'Cargo',
    'Ações'
  );
  expect(screen.getByRole('buttonNameEmployee')).toHaveTextContent('Adicionar');
});
