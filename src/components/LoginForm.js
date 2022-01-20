import {Form, Button, Row, Col, Container, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './Nav';
import axios from 'axios';

import {
Link
} from "react-router-dom";
import { useState } from 'react';

import { updateData } from './BusinessLogic';
import SignupForm from './SignupForm';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';


export default function LoginForm() {

  const data = {
    username: '',
    password: ''
  }

  

  const [credentials, setCredential] = useState(data)

  const [isAdmin, setIsAdmin] = useState(false)

  const updateCredentials = updateData(credentials, setCredential)

  const [showSignup, setShowSignup] = useState(false)

  const closeSignup = () => {
    setShowSignup(false)
  }

  const openSignup = () => {
    setShowSignup(true)
  }

  const enableAdmin = event => {
      setIsAdmin(event.target.checked)
  }



  const handleSubmit = event => {
    event.preventDefault()
    console.log("Form submission:",credentials)

    axios({
      method:'post',
      url:'/perfom_login',
      params:{
             username: credentials.username,
             password: credentials.password
         },
      config: { headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
     })
     .then( data => {
      console.log("Authenticated successfully:", data)
     }
        
     )
     .catch(error=>{
       console.error(error)
         var errResp = error.response;
         if(errResp.status === 401){
            //Ex: show login page again...
         }

     })

 
  }

  

  return (
    <div className="App">
      <NavBar text="Appointment module"/>
      <Container>
        <Row>
          <Col md={{span:4, offset:4}}>
            <Card style={{marginTop: "200px"}}>
            <Card.Header as="h3">User Login</Card.Header>
              <Card.Body>
              <Form  style={{marginBottom: "50px"}} action="/perform_login" method='POST'>
                <Form.Group className="mb-3" controlId="formBasicEmail"  style={{marginTop: "50px"}}>
                  {isAdmin?
                    <Form.Control type="text" name='username' placeholder="username" onChange={updateCredentials} />
                    :
                    <Form.Control type="email" name='username' placeholder="Enter email" onChange={updateCredentials} />
                  }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Password" name="password" onChange={updateCredentials} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Login as Admin" onChange={enableAdmin} style={{width: "10rem"}}/>
                </Form.Group>
                
              </Form>
              <Card.Link onClick={openSignup}>Sign up</Card.Link>
              <Card.Link href="#">Forgot password</Card.Link>
              
              </Card.Body>
            </Card>
          
          </Col>
        
        </Row>
      </Container>
      <SignupForm show={showSignup}  onClose={closeSignup} />
    </div>
  );
}


