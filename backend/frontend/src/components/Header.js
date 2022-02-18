import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar>
      <Container>
        <LinkContainer to="/">
          <h3>Chore</h3>
        </LinkContainer>
        <SearchBox />
        <LinkContainer to="/dashboard">
          <Nav.Link>Dashboard</Nav.Link>
        </LinkContainer>
        <Nav className="ml-auto">
          {userInfo ? (
            <NavDropdown
              title={<div className="pull-left">{userInfo.name}</div>}
              id="firstName"
            >
              <LinkContainer to="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/login">
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          ) : (
            [
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Login
                </Nav.Link>
              </LinkContainer>,
              <LinkContainer to="/register">
                <Nav.Link>
                  <i className="fas fa-user-plus"></i> Register
                </Nav.Link>
              </LinkContainer>,
            ]
          )}
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title="Admin" id="nav-dropdown">
              <LinkContainer to="/admin/userlist">
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/projectlist">
                <NavDropdown.Item>Projects</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/teamlist">
                <NavDropdown.Item>Teams</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
