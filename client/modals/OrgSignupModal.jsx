import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink, Input, Form, FormGroup, Label, Col } from 'reactstrap';

class OrgSignupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      form: {
        name: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        phone: '',
        email: '',
        password: ''
      }
    }
    this.updateInput = this.updateInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  updateInput(e) {
    console.log(e.target.value);
    const form = this.state.form; // Copy current state to object 'form'
    form[e.target.name] = e.target.value; // Set  key:value to form
    this.setState({ form: form }); // Replace state.form to form from above
  }

  submitForm(form) {
    console.log(form, 'newOrg signup form')
    axios.post('/signup', {
      name: form.name,
      address: {
        street: form.street,
        city: form.city,
        state: form.state,
        zipcode: form.zipcode
      },
      phone: form.phone,
      email: form.email,
      password: form.password
    }) // Send form to server
      .then(response => {
        console.log('Form posted to server')
        this.toggle

      })
      .catch(err => console.log('Err', err));
  }

  render() {
    return (
      <React.Fragment>
        <NavLink href="#" onClick={this.toggle}>Recruit Volunteers</NavLink>
        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create an Account for your Organization</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.submitForm}>
              <FormGroup row>
                <Label for="name" sm={2}>Organization</Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={this.state.form.name}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="street" sm={2}>Street Address</Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="street"
                    id="street"
                    value={this.state.form.street}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="city" sm={2}>City</Label>
                <Col sm={10}>
                  <Input
                    name="city"
                    type="text"
                    value={this.state.form.city}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="state" sm={2}>State</Label>
                <Col sm={10}>
                  <Input
                    name="state"
                    type="text"
                    value={this.state.form.state}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="zipcode" sm={2}>Zip Code</Label>
                <Col sm={10}>
                  <Input
                    name="zipcode"
                    type="text"
                    value={this.state.form.zipcode}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="number" sm={2}>Phone</Label>
                <Col sm={10}>
                  <Input
                    name="phone"
                    type="text"
                    value={this.state.form.phone}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="email" sm={2}>E-mail</Label>
                <Col sm={10}>
                  <Input
                    name="email"
                    type="text"
                    value={this.state.form.email}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="password" sm={2}>Password</Label>
                <Col sm={10}>
                  <Input
                    name="password"
                    type="text"
                    value={this.state.form.password}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <Button onClick={() => this.submitForm(this.state.form)}>Submit</Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default OrgSignupModal;