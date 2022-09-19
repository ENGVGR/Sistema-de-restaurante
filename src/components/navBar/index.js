/* eslint-disable react/jsx-no-useless-fragment */
// @flow
import React, { useContext } from 'react';
import './index.scss';
import { Container, Nav, Navbar } from 'react-bootstrap';
// $FlowFixMe
import 'bootstrap/dist/css/bootstrap.min.css';
// $FlowFixMe
import { Link } from 'react-router-dom';
import UserContext from '../../context/user.context';

const title = 'title';
const login = 'login';
const cardapio = 'cardápio';

/**
 * @function MyNavBar
 * @description Componente que retorna a navBar do sistema.
 * @return {html} Retorna a navBar do sistema.
 */

export default function MyNavBar(): any {
  const { user, setUser } = useContext(UserContext);

  return (
    <Navbar className="navBar">
      <Container>
        <Navbar.Text
          style={{ color: '#ebeaa9', size: '20px' }}
          className="teste"
          role={title}
        >
          X Burger
        </Navbar.Text>
        <Nav className="me-auto">
          <Nav.Link
            style={{ color: '#ebeaa9' }}
            role={cardapio}
            as={Link}
            to="/"
          >
            Cardápio
          </Nav.Link>
          {user ? (
            <>
              <Nav.Link style={{ color: '#ebeaa9' }} as={Link} to="/order">
                Pedidos
              </Nav.Link>
              <Nav.Link
                style={{ color: '#ebeaa9' }}
                as={Link}
                to="/clientMonitoring"
              >
                Clientes
              </Nav.Link>
              <Nav.Link style={{ color: '#ebeaa9' }} as={Link} to="/stock">
                Estoque
              </Nav.Link>
            </>
          ) : (
            <Nav.Link
              style={{ color: '#ebeaa9' }}
              role={login}
              as={Link}
              to="/login"
            >
              Login
            </Nav.Link>
          )}

          {user && user.role === 'Admin' ? (
            <Nav.Link
              style={{ color: '#ebeaa9' }}
              as={Link}
              to="/employeeMonitoring"
            >
              Funcionários
            </Nav.Link>
          ) : (
            <></>
          )}
          {user ? (
            <Nav.Link
              style={{ color: '#ebeaa9' }}
              role={login}
              as={Link}
              to="/login"
              onClick={() => {
                setUser();
              }}
            >
              Logout
            </Nav.Link>
          ) : (
            <></>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
