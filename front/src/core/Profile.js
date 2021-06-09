import React from 'react'
import NavBar from '../layout/NavBar'
import { redirected } from './apiCore'


const Profile = ()  => {
    return (
        <>
        {redirected()}
        <NavBar/>
        <h2>Hola Mundo</h2>
        </>
    )
}

export default Profile