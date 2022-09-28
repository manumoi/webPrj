import React from 'react'
import "./home.scss"
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='home'>
            <div>
                Connected to main page
            </div>
            <Link to="/login">Disconnect</Link> 
        </div>
    )
}


export default Home