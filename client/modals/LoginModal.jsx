import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink, Input } from 'reactstrap';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      form: {
        username: '',
        password: '',
      },
    };
    this.toggle = this.toggle.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  updateInput(e) {
    console.log(e.target.value);
    const form = this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({ form: form });
  }

  submitForm(form) {
    axios.post('/login', {
      username: form.username,
      password: form.password
    })
      .then(response => {
        if (response.data) {
          console.log("User has signed in data= ", response.data);
          this.props.orginizationLoggedIn(response.data)
        } else {
          console.log("User Credential didnot match");
        }
      })
      .catch(err => console.log('Err', err));
  }


  render() {
    return (
      <React.Fragment>
        <NavLink href="#" onClick={this.toggle}>Login</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Login Into Your Account</ModalHeader>
          <ModalBody>
            <Input name="username" placeholder="User Name" type="text" value={this.state.form.username} onChange={this.updateInput} />
            <Input name="password" placeholder="Password" type="text" value={this.state.form.password} onChange={this.updateInput} />
            <Button outline color="primary" onClick={() => this.submitForm(this.state.form)}>Sign In</Button>{' '}
            <Button color="sucess" onClick={() => this.toggle}><a href="/auth/google">Login with Google+</a></Button>{' '}
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default LoginModal;