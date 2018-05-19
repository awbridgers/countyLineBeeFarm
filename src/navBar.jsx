import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import beeLogo from "./images/words.png";
  import MediaQuery from 'react-responsive';

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
          <MediaQuery query="(min-device-width: 1224px)">
            <NavbarBrand className = '' href="/"><img className = "beeLogo" src = {beeLogo} /></NavbarBrand>
            </MediaQuery>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>

            <Nav className="nav" navbar tabs style = {{border:"0px"}}>
              <MediaQuery query="(max-device-width: 1224px)">
                <NavItem className = "navItem">
                  <NavLink href=""><font color = "black">Home</font></NavLink>
                </NavItem>
              </MediaQuery>
              <NavItem className = "navItem">
                <NavLink href=""><font color = "black">About Us</font></NavLink>
              </NavItem>
              <NavItem className = "navItem">
                <NavLink href=""><font color = "black">Buy Honey</font></NavLink>
              </NavItem>
              <NavItem className = "navItem">
                <NavLink href=""><font color = "black">Contact</font></NavLink>
              </NavItem>

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
