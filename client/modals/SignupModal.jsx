import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink, Input } from 'reactstrap';

class SignupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <React.Fragment>
        <NavLink href="#" onClick={this.toggle}>Sign Up</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Sign Up</ModalHeader>
          <ModalBody>
            <Input placeholder="User Name" />
            <Input placeholder="Password" />
            <Button color="primary" onClick={() => this.toggle}>Sign Up</Button>{' '}
            <Button color="sucess" onClick={() => this.toggle}>Sign Up with Google+</Button>{' '}
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default SignupModal;