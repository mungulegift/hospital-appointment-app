import { Form, Button, Row, Col, Container, Navbar, Table, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {userType, useUser} from "./BusinessLogic";

export default function NavBar({text,handlerNewAction, user}) {

  const isProvider = true

    return(
   
    <Navbar expand="lg"  variant="light" bg="light">
      <Container>
          <Navbar.Brand href="#">{text} {(user && (user.userType == userType.admin || user.userType == userType.patient))? <Button onClick={handlerNewAction} style={{marginLeft:"1rem"}}>Add</Button> : null}</Navbar.Brand>
        
        <p>{user? user.username : ""} - {user? <a href="/logout" >logout</a>: null}</p>
      </Container>
    </Navbar>)
  }