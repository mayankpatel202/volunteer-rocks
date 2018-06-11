import React from 'react';
import axios from 'axios';
import OrgSignupModal from '../modals/OrgSignupModal.jsx';
import SignupModal from '../modals/SignupModal.jsx';
import LoginModal from '../modals/LoginModal.jsx';
import CreateOpModal from '../modals/CreateOpModal.jsx';

import {
  NavbarToggler, NavbarBrand, NavItem,
  Navbar, Collapse, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem,
  Nav, Button
} from 'reactstrap';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    const isOrganization = this.props.isOrganization;
    const navView = isLoggedIn ? (
      <React.Fragment>
        <NavItem>
          <OrgSignupModal />
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
          <img
            src={this.props.user.picture}
            alt={this.props.user.name}
            className={'img-circle'}/>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <div onClick={() => this.props.myOppotunities()}>My Opportunities</div>
            </DropdownItem>
            <DropdownItem>
              <div onClick={() => this.props.changeView('loadAllMarkers')}>Map All</div>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem href="#" onClick={() => this.props.logOut()}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </React.Fragment>
    ) : isOrganization ? (
      <React.Fragment>
        <NavItem>
          <CreateOpModal />
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            {this.props.user}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItemn href="#" onClick={() => }>
              My Opportunities
            </DropdownItem>
            <DropdownItem>
              <div onClick={() => this.props.changeView('loadAllMarkers')}>Map All</div>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem href="#" onClick={() => this.props.logOut()}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </React.Fragment>
    ) : (
          <React.Fragment>
            <NavItem className="mr-auto">
              <OrgSignupModal />
            </NavItem>
            <NavItem>
              <LoginModal orginizationLoggedIn={this.props.orginizationLoggedIn} />
            </NavItem>
            <NavItem>
              <Button outline color="primary">Sign Up</Button>{' '}
            </NavItem>
          </React.Fragment>
        );
    return (
      <Navbar color="white" light expand="md">
        <NavbarBrand href="/">The Volunteers Rock</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {navView}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavBar;