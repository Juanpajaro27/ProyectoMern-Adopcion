import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../layout/NavBar'
import { signup } from './apiCore'
import './Signup.css'


export default function Signup() {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })
    const {name, email, password, error, success} = values

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    }

    const clickSubmit = e => {
        e.preventDefault()
        signup({ name, email, password}).then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        })
    }
    const showError = () => (
        <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
          {error}
        </div>
      )
    
      const showSuccess = () => (
        <div className='alert alert-info' style={{display: success ? '':'none'}}>  New Account Successfully Created You can now
          <Link to='/signin'>Sign in</Link>
        </div>
      )
    const signUpForm = () => (
        <form className = "sign-box">
            <div className="form-group">
                <label className="text-muted">Nombre</label>
                <input type="text" className="form-control"  
                onChange={handleChange('name')} value = {name}/>
            </div>
            <div className="form-group">
                <label className="text-muted">email</label>
                <input type="email" className="form-control"  value ={email} onChange={handleChange('email')}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Contraseña</label>
                <input type="password" className="form-control"  value = {password} onChange={handleChange('password')}
                />
            </div>
            <button onClick = {clickSubmit} className = 'btn btn-primary'>Sign Up</button>
        </form>
    )
    return (
        <div>
            <NavBar></NavBar>
            {signUpForm()}
            {showError()}
            {showSuccess()}
        </div>
    )
}
