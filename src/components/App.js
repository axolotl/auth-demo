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
import Dash from './Dash';

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
                    <NavItem>
                      <NavLink href="/dash">Dashboad</NavLink>
                    </NavItem>
                  </Nav>
              </Navbar>
            </Col>
          </Row>

          <div style={{display: 'flex', justifyContent: 'center'}}>
            
            <div style={{width: '500px'}}>

              <Route exact path="/" component={Intro} />
              <Route path="/join" component={Join} />
              <Route path="/login" component={Login} />
              <Route path="/dash" component={Dash} />
  
            </div>
            
          </div>

        </Container>
      </Router>
    )
  }
}

export default App;