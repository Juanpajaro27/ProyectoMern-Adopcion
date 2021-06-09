import { useEffect, useState } from 'react'
import NavBar from '../layout/NavBar'
import './Signup.css'
import { authenticate, signin, isAuthenticated } from './apiCore'
import { Redirect } from 'react-router'


export default function Signin() {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false

    })

    const {email, password, loading, error, redirectToReferrer} = values
    const {user} = isAuthenticated()
    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    }
    const clicklSubmit = (e) => {
        e.preventDefault()
        setValues({...values, error: false, loading: false})
        signin({email, password})
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error, loading:false})
                } else {
                    authenticate(data, () => {
                        setValues({...values, redirectToReferrer: true})
                    })
                }
            })
    }
    //useEffect
    const redirectUser = () => {
        if(redirectToReferrer) {
            if(user && user.role === 1){

                return <Redirect to ="/admin/dashboard"/>
            } else {
                return <Redirect to ="/"/>

            }
                            
        }
        if(isAuthenticated()){
            return <Redirect to ="/"/>
        }
    }
    const showError = () => {
            <div className= "alert alert-danget" style={{display: error ? '': 'none'}} >
                {error}
            </div>
        
    }
    const showLoading = () => {
        loading &&(
            <div className="alert alert-info">
                <h2>Cargando...</h2>
            </div>
        )
    }

    const signUpForm = () => (
        <div className = "divis">

        <form className = "sign-box mt-5">
            
            <div className="form-group">
                <label className="text-muted">email</label>
                <input type="email" className="form-control"
                onChange = {handleChange('email')}
                value = {email}  
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Contraseña</label>
                <input type="password" onChange={handleChange('password')} className="form-control" value = {password} 
                />
            </div>
            <button  className = 'btn btn-primary'
            onClick ={clicklSubmit} >Login</button>
        </form>
            </div>
    )
    return (
        <div>
            <NavBar></NavBar>
            <h4 className = "text-center mb-4">Login</h4>
            
            {signUpForm()}
            {showError()}
            {showLoading()}
            {redirectUser()}
            
        </div>
    )
}
