import React from "react";
import { withRouter } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col
} from "reactstrap";
import axios from "axios";

// header component acts both as a header and as a wrapper
// it positions a header above the main content and then wraps the main content
// so that it will appear under the header in a properly centered manner

const linkStyle = {
  cursor: "pointer"
};

const Header = ({ loggedIn, user, setLoggedOut, history, children }) => {
  const logOut = () => {
    axios
      .post(`/api/logout`)
      .then(() => {
        setLoggedOut();
        history.push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <Container>
      <Row>
        <Col>
          <Navbar color="white" light expand="md">
            <NavbarBrand style={linkStyle} onClick={() => history.push("/")}>
              [auth-demo]
            </NavbarBrand>
            <Nav className="ml-auto" navbar>
              {loggedIn ? (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <NavItem>
                    <NavLink style={{ marginRight: "10px" }}>
                      You are logged in as {user}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink style={linkStyle} onClick={logOut}>
                      Logout
                    </NavLink>
                  </NavItem>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <NavItem style={{ marginRight: "10px" }}>
                    <NavLink
                      style={linkStyle}
                      onClick={() => history.push("/join")}
                    >
                      Join
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={linkStyle}
                      onClick={() => history.push("/login")}
                    >
                      Login
                    </NavLink>
                  </NavItem>
                </div>
              )}
            </Nav>
          </Navbar>
        </Col>
      </Row>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "500px" }}>{children}</div>
      </div>
    </Container>
  );
};

export default withRouter(Header);
