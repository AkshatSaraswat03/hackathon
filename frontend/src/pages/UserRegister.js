import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import '../styles/register.css'
import FormContainer from '../components/FormContainer'

const Register = ({ history }) => {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [email, setEmail] = useState('')
  const [contactNumber, setContactNumber] = useState(0)
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validated, setValidated] = useState(false);




  const registerUser = async (name, age, contact_number, gender, address, email, password) => {
    try {

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const { data } = await axios.post('/api/users', { name, age, contact_number, gender, address, email, password }, config)
      console.log(data)
      localStorage.setItem('userInfo', JSON.stringify(data))
      history.push('/')

    } catch (err) {
      console.error(err)
    }
  }


  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    //registration api

    if (password === confirmPassword) {
      registerUser(name, age, contactNumber, gender, address, email, password)
    }


  };

  return (
    <div className='registerContainer pb-5 my-5'>
      <FormContainer>
        <h1>Sign Up</h1>
        <Form noValidate validated={validated} onSubmit={submitHandler}>

          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Name.
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              required
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid age.
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group controlId="contact">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              required
              type="number"
              value={contactNumber}
              onChange={e => setContactNumber(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid contact number.
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              required
              value={address}
              onChange={e => setAddress(e.target.value)} />
          </Form.Group>



          <Form.Group controlId="validationCustom01">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>


          <Form.Group controlId="validationCustom01">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
            />
          </Form.Group>
          <Button variant='info' type="submit" className='registerBtn'>Register</Button>
        </Form>
        <Row className='py-3'>
          <Col>
            Have an Account?{' '}
            <Link to={'/loginchoice'}>
              Login
        </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );

}

export default Register