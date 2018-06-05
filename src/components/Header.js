import React from 'react';
import { withRouter } from 'react-router-dom';
import { 
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col } from 'reactstrap';

// header component acts both as a header and as a wrapper
// it positions a header above the main content and then wraps the main content
// so that it will appear under the header in a properly centered manner

const linkStyle = {
  cursor: 'pointer'
};

const Header = ({ history, children }) => (
  <Container>
    <Row>
      <Col>
        <Navbar color="white" light expand="md">
          <NavbarBrand style={linkStyle} onClick={() => history.push('/')} >[auth-demo]</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink style={linkStyle} onClick={() => history.push('/join')} >Join</NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={linkStyle} onClick={() => history.push('/login')} >Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={linkStyle} onClick={() => history.push('/dash')} >Dashboad</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </Col>
    </Row>

    <div style={{display: 'flex', justifyContent: 'center'}}>
      
      <div style={{width: '500px'}}>

        {children}

      </div>
      
    </div>

  </Container>
);

export default withRouter(Header);