// @flow
import React from 'react';
import './index.scss';
import { Container, Nav, Navbar } from 'react-bootstrap';
// $FlowFixMe
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const title = 'title';
const clientes = 'clientes';
const pedidos = 'pedidos';
const cardapio = 'cardápio';
const estoque = 'estoque';
const garcons = 'garçons';

/**
 * @function MyNavBar
 * @description Componente que retorna a navBar do sistema.
 * @return {html} Retorna a navBar do sistema.
 */

export default function MyNavBar(): any {
  return (
    <Navbar className="navBar">
      <Container>
        <Navbar.Text className="navBar-title" role={title}>
          X Burger
        </Navbar.Text>
        <Nav className="me-auto">
          <Nav.Link className="navBar-link" role={clientes} as={Link} to="/">
            Cardápio
          </Nav.Link>
          <Nav.Link
            className="navBar-link"
            role={pedidos}
            as={Link}
            to="/order"
          >
            Pedidos
          </Nav.Link>
          <Nav.Link
            className="navBar-link"
            role={cardapio}
            as={Link}
            to="/clientMonitoring"
          >
            Clientes
          </Nav.Link>
          <Nav.Link
            className="navBar-link"
            role={estoque}
            as={Link}
            to="/stock"
          >
            Estoque
          </Nav.Link>
          <Nav.Link className="navBar-link" role={garcons}>
            Garçons
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
