import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../webClient'
import "./register.scss"

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const disableLastPass = true;

  const navigate = useNavigate()
  const handleRegister = (e) => {
    e.preventDefault()
    const payload = {
      email: email,
      password: password,
      name: name
    }
    axiosInstance.post("./register", payload, (req, res) => {
      console.log(`Registration submitted: ${JSON.stringify(payload)}`)
    })
    .then((res)=>{
      console.log(res.data)
     // navigate('/')
    })
  }

  const handleCancel = () => {
    setMessage(null)
    console.log("Registration cancelled")
    navigate('/login')
  }


  return (
    <div className="register">
      <form className="bloc" onSubmit = {(e)=>handleRegister(e)}>
        <h2>REGISTER</h2>
        <input type="text" name="email" placeholder="Email..." data-lpignore="true" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" name="password" placeholder="Password..." data-lpignore="true" onChange={(e) => setPassword(e.target.value)} required/>
        <input type="text" name="name" placeholder="Name..." onChange={(e) => setName(e.target.value)} />
        {}
        <div className='buttonBar'>
          <button onClick={handleCancel}>Cancel</button>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )
}

export default Register