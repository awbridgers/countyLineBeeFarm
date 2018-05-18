import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class NavMenu extends React.Component {
  render() {
    return (
      <div style = {{backgroundColor: "black"}}>
        <Nav justified navbar-inverse>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Another Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">Disabled Link</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
