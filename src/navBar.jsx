import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';
  import beeLogo from "./images/words.png";
  import MediaQuery from 'react-responsive';
  import { LinkContainer } from 'react-router-bootstrap'

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="warning" light expand="md">
          <MediaQuery minDeviceWidth = {1224}>
            <LinkContainer to ="/">
              <NavbarBrand className = '' href="/">
                <img className = "beeLogo" src = {beeLogo} alt= 'Bee Logo'/>
              </NavbarBrand>
            </LinkContainer>
            </MediaQuery>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>

            <Nav className="nav" navbar tabs style = {{border:"0px"}}>
              <MediaQuery maxDeviceWidth = {1224}>
                <LinkContainer to = "/">
                  <NavItem className = "navItem">
                    <NavLink href=""><font color = "black">Home</font></NavLink>
                  </NavItem>
                </LinkContainer>
              </MediaQuery>
              <LinkContainer to= "/about"><NavItem className = "navItem">
                <NavLink href=""><font color = "black">About Us</font></NavLink>
              </NavItem>
            </LinkContainer>
              <LinkContainer to = "buy-honey">
                <NavItem className = "navItem">
                  <NavLink href=""><font color = "black">Buy Honey</font></NavLink>
                </NavItem>
              </LinkContainer>
                <LinkContainer to= "/contact"><NavItem className = "navItem">
                  <NavLink href=""><font color = "black">Contact</font></NavLink>
                </NavItem>
              </LinkContainer>

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
