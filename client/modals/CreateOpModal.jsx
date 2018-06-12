import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink, Input, Form, FormGroup, Label, Col } from 'reactstrap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { initAutoComplete, fillInAddress, geolocate } from './mapFuncs';
import AddressAutoComplete from './AddressAutoComplete.jsx'

class CreateOpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      form: {
        title: '',
        description: '',
        cause: '',
        address: '',
        start_date: '',
        end_date: '',
        phone: '',
        email: ''
      }
    }

    this.updateInput = this.updateInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  updateInput(e) {
    const form = this.state.form; // Copy current state to object 'form'
    form[e.target.name] = e.target.value; // Set  key:value to form
    this.setState({ form: form }); // Replace state.form to form from above
  }

  updateAddress(address) {
    const form = this.state.form;
    form.address = address;
    this.setState({ form: form })
  }

  submitForm(form) {
    console.log(form, 'newOp creation form')
    axios.post('/newOpp', {
      title: form.title,
      description: form.description,
      cause: form.cause,
      address: form.address,
      start_date: form.start_date,
      end_date: form.end_date,
      phone: form.phone,
      email: form.email
    }) // Send form to server
      .then(response => {
        console.log('Form posted to server')
        this.toggle();

      })
      .catch(err => console.log('Err', err));
  }

  render() {
    return (
      <React.Fragment>
        <NavLink href="#" onClick={this.toggle}>Create New Opportunity</NavLink>
        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create a New Opportunity</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.submitForm}>
              <FormGroup row>
                <Label for="title" sm={2}>Title</Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    value={this.state.form.title}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="description" sm={2}>Description</Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="description"
                    id="description"
                    value={this.state.form.description}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="cause" sm={2}>Cause</Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="cause"
                    id="cause"
                    value={this.state.form.cause}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="address" sm={2}>Address</Label>
                <Col sm={10}>
                  <AddressAutoComplete
                    updateAddress={this.updateAddress}
                  ></AddressAutoComplete>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="start_date" sm={2}>Start Date</Label>
                <Col sm={10}>
                  <Input
                    name="start_date"
                    type="date"
                    value={this.state.form.start_date}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="end_date" sm={2}>End Date</Label>
                <Col sm={10}>
                  <Input
                    name="end_date"
                    type="date"
                    value={this.state.form.end_date}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="number" sm={2}>Phone</Label>
                <Col sm={10}>
                  <Input
                    name="phone"
                    type="tel"
                    value={this.state.form.phone}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="email" sm={2}>E-mail</Label>
                <Col sm={10}>
                  <Input
                    name="email"
                    type="email"
                    value={this.state.form.email}
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

export default CreateOpModal;