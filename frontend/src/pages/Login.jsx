import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./login.scss"
import { useUser, useUserUpdate } from '../contexts/UserProvider' // two custom hooks created to facilitate context management
import { axiosInstance, MESSAGE_CODES } from '../webClient'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)

    const user = useUser()  // custom hook defined to give access to the "contextualized" user value 
    const updateUser = useUserUpdate(); // custom hook defined to give access to the "contextualized" user value update function
    const navigate = useNavigate()


    const handleMailChanged =(e, value)=>{
        e.preventDefault();
        setMessage(null)
        setEmail(value)
    }

    const handlePasswordChanged =(e, value)=>{
        e.preventDefault()
        setMessage(null)
        setPassword(value)
    }



    const handleLogin = (e) => {
        e.preventDefault()
        const payload = {
            email: email, 
            password: password
        }
        axiosInstance.post("/login", payload,
        (req, res)=>{
            console.log(`login submitted: ${JSON.stringify(payload)}`)
        })
        .then((res)=>{
            switch (res.data.message){
                case MESSAGE_CODES.OK:
                    setMessage(null)
                    navigate('/')
                    break;
                case MESSAGE_CODES.ERROR:
                    setMessage(
                        <div className='errorMessage'>
                            User not found. Check your email and/or password.
                        </div>
                    )
            }
        })
        .catch(error=>{
            console.log({error})
        })       
    }



    return (
        <div className="login">
            <form className="bloc" >
                <h2>LOGIN</h2>
                <input type="text" name="email" placeholder="Email..." data-lpignore="true" onChange={(e) => handleMailChanged(e, e.target.value)} required />
                <input type="password" name="password" placeholder="Password..." data-lpignore="true" onChange={(e) => handlePasswordChanged(e, e.target.value)} required/>
                {message}
                <button onClick={e=>handleLogin(e)}>Login</button>
                <Link className="link" to="/register">Register</Link>
            </form>
        </div>
    )
}

export default Login