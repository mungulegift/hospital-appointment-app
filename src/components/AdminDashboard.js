import {Button, Row, Col, Container, Navbar, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import AddProviderForm from "./AddProviderForm";
import {useProviders} from "./BusinessLogic";
import NavBar from './Nav';



export default function AdminDashboard({user}) {

  const [showScheduler, setShowScheduler] = useState(false)

  const openScheduler = () => {
    setShowScheduler(true)
  }

  const closeScheduler = () => {
    setShowScheduler(false)
  }

  const providers = useProviders()

  //console.log("providers", providers)

  return (
    <div className="App">
      <Container>
      <Row>
        <Col md={{offset:4,span:4}}>
        <h2>Admin Dashboard</h2>
        </Col>
      </Row>
        <Row>
        <Col md={{offset:2,span:10}}>
          <NavBar text="Providers (Doctors)" user={user} handlerNewAction={openScheduler}/>
          {providers? <ProvidersList providers={providers} />: <p>Loading</p>}
          <AddProviderForm show={showScheduler} onClose={closeScheduler} />
        </Col>
      </Row>
      </Container>
    </div>
  );
}

function ProvidersList({providers}) {


  //const providers = useProviders()

  return (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Specialization</th>
      </tr>
    </thead>
    <tbody>
      {
        providers.map( provider => (
        <tr key={provider.id}>
          <td>{provider.id}</td>
          <td>{provider.firstName}</td>
          <td>{provider.lastName}</td>
          <td>{provider.specialty}</td>
        </tr>
        ))
      }
      
    </tbody>
</Table>)
  
}