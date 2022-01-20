import {Form, Button, Row, Col, Container, Navbar, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import AppointmentSchedulerForm from "./AppointmentSchedulerForm";
import {useAppointments, useUser, userType, refreshPage} from "./BusinessLogic";
import NavBar from './Nav';
import AdminDashboard from './AdminDashboard';
import axios from 'axios';



export default function Dashboard() {
 
    const user = useUser()

    const isProvider = true
    
    console.log("user:", user)

    return (
      <div>
        {user !== null ? user.userType === userType.admin ? <AdminDashboard user={user} />: <UserDashboard user={user} />: <p>Loading...</p>}
      </div>
    )
}


function UserDashboard({user}) {

  const [showScheduler, setShowScheduler] = useState(false)
 

  const isProvider = userType.provider === user.userType
  
  console.log("user:", user)

  const openScheduler = () => {
    setShowScheduler(true)
  }

  const closeScheduler = () => {
    setShowScheduler(false)
  }

  return (
    <div className="App">
      {user !== null ?<Container>
      <Row>
        <Col>
        {isProvider? <h2>Doctors Dashboard</h2> : <h2>Patient Dashboard</h2>}
        </Col>
      </Row>
        <Row>
        <Col md={{span:10}}>
          <NavBar handlerNewAction={openScheduler} user={user} text="Appointment"/>
          <Appointments isProvider={isProvider} />
          <AppointmentSchedulerForm show={showScheduler} onClose={closeScheduler} />
        </Col>
      </Row>
      </Container>:<p>Loading...</p>}
    </div>
  );
}

function Appointments({isProvider}) {

  const appointments = useAppointments()

  const [lastUpdated, setLastupdated] = useState(Date.now())

  const assignAppointment = id => () => {
    axios.put(`/api/appointment/assign/${id}`).then(data => {
      refreshPage()
    }).catch(console.err)
  }


  return (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Doctor Name</th>
        <th>Patient Name</th>
        <th>Appointment description</th>
        <th>Appointment time</th>
        <th>Status</th>
        {isProvider? <th>Action</th>: null}
      </tr>
    </thead>
    <tbody>
      {
         appointments? appointments.map( appointment => {
            const provider = appointment.provider
            const patient = appointment.patient


            return (<tr key={appointment.serial}>
            <td>{appointment.id}</td>
            <td>{provider? `${provider.firstName} ${provider.lastName}` : ""}</td>
            <td>{patient? `${patient.firstName} ${patient.lastName}` : ""}</td>
            <td>{appointment.reason}</td>
            <td>{`${appointment.date.reverse().join("-")} ${appointment.time.map(v => (v == 0) ? "00": v).join(":")}`}</td>
            <td>{provider ? "Assigned": "Not assigned"}</td>
            {isProvider? ((!provider)? <td><Button onClick={assignAppointment(appointment.id)}>Assign</Button></td> : <td>No action</td>) : null}
          </tr>)
         } 
        
        ):<tr><td>Loading...</td></tr>
      }
      
    </tbody>
</Table>)
  
}