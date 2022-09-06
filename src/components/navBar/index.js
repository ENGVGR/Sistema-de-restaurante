import React from 'react';
import './index.scss';
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyNavBar() {
  const title = 'title';
  const clientes = 'clientes';
  const pedidos = 'pedidos';
  const cardapio = 'cardápio';
  const estoque = 'estoque';
  const garcons = 'garçons';
  return (
    <Navbar className="navBar">
      <Container>
        <Navbar.Brand className="navBar-title" role={title}>
          X Burger
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className="navBar-link" role={clientes}>
            Clientes
          </Nav.Link>
          <Nav.Link className="navBar-link" role={pedidos}>
            Pedidos
          </Nav.Link>
          <Nav.Link className="navBar-link" role={cardapio}>
            Cardápio
          </Nav.Link>
          <Nav.Link className="navBar-link" role={estoque}>
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
