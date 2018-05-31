import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { 
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col } from 'reactstrap';

import Intro from './Intro';
import Join from './Join';
import Login from './Login';

class App extends Component {
  render() {
    return (

      <Router>

        <Container>

          <Row>
            <Col>
              <Navbar color="white" light expand="md">
                <NavbarBrand href="/">[auth-demo]</NavbarBrand>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="/join">Join</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/login">Login</NavLink>
                    </NavItem>
                  </Nav>
              </Navbar>
            </Col>
          </Row>

          <Row>
            <Col xs="3" />
            <Col>

              <Route exact path="/" component={Intro} />
              <Route path="/join" component={Join} />
              <Route path="/login" component={Login} />
  
            </Col>
            <Col xs="3" />
          </Row>

        </Container>
      </Router>
    )
  }
}

export default App;