import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../layout/NavBar'
import { createCategory, isAuthenticated, redirected } from './apiCore'

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user, token} = isAuthenticated()

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
    }

    const clickSubmit = e => {
        e.preventDefault()
        setError('')
        setSuccess('')
        createCategory(user._id, token, {name})
            .then(data => {
                if(data.error){
                    setError(true)
                } else {
                    setError('')
                    setSuccess(true)
                }
            })
    }

    const showSuccess = () => {
        if(success){
            return <h3 className="text-success">La Categoria {name} ha sido creada</h3>
        }
    }

    const showError = () => {
        if(error){
            return <h3 className="text-danger">La Categoria {name} ya existe!</h3>
        }
    }

    const back = () => (
        <div>
            <Link to ='/' className = "text-warning"/>
        </div>
    )

    const newCategoria = () =>(
        
        <form onSubmit={clickSubmit} >
            <div className = "form-group">
                <label className = "text-muted">Nombre</label>
                <input type="text" className = "form-control" 
                onChange = {handleChange} vlaue = {name} required autoFocus/>
            </div>
            <button className = "btn btn-outline-success">Done!</button>
        </form>
                )
    

    return( 
        <>
        {redirected()}
        <NavBar></NavBar>
        <div className="mt-5 container">

        {showSuccess()}
        {showError()}
        {newCategoria()}
        {back()}
        </div>
        </>
    )
}

export default AddCategory