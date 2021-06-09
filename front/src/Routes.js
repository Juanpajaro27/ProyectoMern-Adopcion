import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AddCategory from './core/AddCategory'
import AddPets from './core/AddPets'
import Home from './core/Home'
import Pets from './core/Pets'
import Profile from './core/Profile'
import Search from './core/Search'
import Signin from './core/Signin'
import Signup from './core/Signup'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/pets/:petsId" exact component={Pets}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/Search" exact component={Search}/>
                <Route path="/addCategory" exact component={AddCategory}/>
                <Route path="/addPets" exact component={AddPets}/>
                <Route path="/perfil" exact component={Profile}/>
                
            </Switch>
        </BrowserRouter>
    )
}

export default Routes