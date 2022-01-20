import { Form, Button, Row, Col, Container, Navbar, Table, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react';
import {useProviders, updateData, userType} from "./BusinessLogic";
import axios from 'axios';

export default function SignupForm({ show, onClose }) {

  const initialData = {

    "firstName": "",
    "lastName": "",
    "username": "",
    "password": "",
    "userType": userType.patient
  }

  const [formData, setFormData] = useState(initialData)

  const updateFormData = updateData(formData, setFormData)

  const addPatient = () => {

    axios.post("/api/user/patient/add", formData).then(data => {
      onClose();
    }).catch(console.err)
  } 

  
  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>New patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
          <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Row>
                <Col>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" name="firstName" placeholder="e.g John" onChange={updateFormData} />
                </Col>
                <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="e.g Doe"  name="lastName" onChange={updateFormData} />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email"  name="username"onChange={updateFormData}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"  name="password" onChange={updateFormData}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Confirm password" />
            </Form.Group>
          </Form>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addPatient}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
