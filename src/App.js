import logo from './logo.svg';
import './App.css';
import {Form, Button, Row, Col, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';

import {
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route index element={<Dashboard />} />
        <Route exact path="/index.html" element={<Dashboard />} />
        <Route exact path="/login"  element={<LoginForm />} />
      </Routes>
      
      
    </div>
  );
}

function FormLogin(prop){

  return(
    <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Username</Form.Label>
    <Form.Control type="email" placeholder="Enter username" />
    {/* <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text> */}
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group> */}
  <Button variant="primary" type="submit">
   Login
  </Button>
</Form>
  )
}

export default App;
