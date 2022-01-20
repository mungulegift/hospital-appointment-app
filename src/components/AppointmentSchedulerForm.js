import { Form, Button, Row, Col, Container, Navbar, Table, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react';
import {useProviders, updateData, refreshPage} from "./BusinessLogic";
import axios from 'axios';

export default function AppointmentSchedulerForm({ show, onClose }) {


  const initialData = {

    
    "reason":"",
    "date":"",
    "time":"",
    "provider": null,
    "patient": null
}

const [formData, setFormData] = useState(initialData)

const updateFormData = updateData(formData, setFormData)

const createAppointment = () => {
  console.log("appointment:", formData)

  axios.post("/api/appointment/add", formData).then(data => {
    onClose();
    refreshPage()
  }).catch(console.err)
}

  
  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Reason</Form.Label>
                <Form.Control as="textarea" placeholder="Brief explaination of appointment" name="reason" onChange={updateFormData} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Date and time</Form.Label>
                <Row>
                  <Col>
                  <Form.Control type="date" name="date" onChange={updateFormData} />
                  </Col>
                  <Col>
                  <Form.Control type="time" name="time" onChange={updateFormData}/>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Form.Text className="mb-3" controlId="formBasicEmail">
                  An available doctor will take up this appointment after submission
                </Form.Text>
              </Form.Group>
            </Form>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createAppointment}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
