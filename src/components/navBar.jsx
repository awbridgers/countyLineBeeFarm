import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';
  import beeLogo from "../images/words.png";
  import MediaQuery, {useMediaQuery} from 'react-responsive';
  import { LinkContainer } from 'react-router-bootstrap'

  const CustomNavItem = (props) =>{
      const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
      return(
        <LinkContainer
          className = {!isTabletOrMobile && props.cart ? 'cartNav' : ''}
          to = {props.linkLocation}
          onClick = {isTabletOrMobile ? props.onClick : null}>
          <NavItem className = "navItem">
            <NavLink href=""><font color = "black">{props.linkTitle}</font></NavLink>
          </NavItem>
        </LinkContainer>
      )
  }

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
    const {cart} = this.props
    return (
        <Navbar light expand="md">
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
              <MediaQuery maxDeviceWidth = {768}>
                <LinkContainer to = "/" onClick = {this.toggle}>
                  <NavItem className = "navItem">
                    <NavLink href=""><font color = "black">Home</font></NavLink>
                  </NavItem>
                </LinkContainer>
              </MediaQuery>
              <CustomNavItem
                linkLocation = '/about'
                linkTitle = 'About Us'
                onClick = {this.toggle}
              />
                <CustomNavItem
                  linkLocation = '/buy-honey'
                  linkTitle = 'Buy Honey'
                  onClick = {this.toggle}
                />
                <CustomNavItem
                  linkLocation = '/contact'
                  linkTitle = 'Contact'
                  onClick = {this.toggle}
                  />
                  <CustomNavItem
                    cart
                    linkLocation = 'shopping-cart'
                    linkTitle = {cart > 0 ?
                      `Cart (${cart} item${cart === 1 ? `` : `s`})`: 'Cart'}
                    onClick = {this.toggle}
                  />

            </Nav>
          </Collapse>
        </Navbar>
    );
  }
}
