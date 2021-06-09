import React from 'react'
import { NavBar as Navi, NavItem} from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, signout } from '../core/apiCore'
import './NavBar.css'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return {color: '#ff9900'}
    } else {
      return {color: '#ffffff'}
    }
  }
const NavBar = ({history}) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-red">
            <div className="container">
                
            
                <a className="navbar-brand" href="/">PetsHelp!</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
               
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <NavItem className="nav-link">
                        <Link to="/" className="nav-link">Inicio</Link>
                    </NavItem>
                </ul>
                <ul className = "navbar-nav navi-ui">
                    {
                        !isAuthenticated() && (
                            <>
                                <NavItem className="nav-link">
                                    <Link to="/signup" className="nav-link">Signup</Link>
                                </NavItem>
                                <NavItem className="nav-link">
                                    <Link to="/signin" className="nav-link">Signin</Link>
                                </NavItem>
                    
                            </>        
                        )
                    }
                    {
                        isAuthenticated() && (
                            <>
                                <NavItem className="nav-link">
                                    <Link to="/addPets" className="nav-link">Añadir Mascota</Link>
                                </NavItem>
                                <NavItem className="nav-link">
                                    <Link to="/addCategory" className="nav-link">Añadir Categoria</Link>
                                </NavItem>
                                <NavItem className="nav-link">
                                    <Link to="/perfil" className="nav-link">Profile</Link>
                                </NavItem>
                                <NavItem className="nav-link">
                                    <Link to="/" className="nav-link" 
                                    onClick={() => signout(() => { 
                                        history.push("/")
                                    })}>Logout</Link>
                                </NavItem>
                            
                            </>
                        )
                    }
                </ul>
          
            </div>
            </div>
            </nav>
        </div>
    )
}

export default withRouter(NavBar)