import { API } from '../config'
import { Redirect } from 'react-router-dom'

export const read = (petsId) => {
    return fetch(
        `http://localhost:4000/api/pets/${petsId}`, 
        {
            method: 'GET'
        })
            .then(response => {
                console.log(response)
                return response.json()
            })
            .catch(err => console.log(err))
    
}

export const getPets =() => {
    return fetch(  
        `${API}/pets/mascotas`, { method: 'GET'}
    ) 
        .then(response => { 
            console.log(response)
            return response.json()
        })
        .catch(err => console.log(err))
}
export const signin = user => {
    return fetch('http://localhost:4000/api/users/signin', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}
export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        next()
    }
}
export const signup = user => {
    return fetch('http://localhost:4000/api/users/signup', { 
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err);
      })
};

export const signout = (next) => {
    if(!typeof window !== 'undefined'){
        localStorage.removeItem('jwt')
        next()
        return fetch('http://localhost:4000/api/users/signout', {
            method: 'POST',
        })
            .then(response => {
                console.log('signout', response)
            })
            .catch( err => console.log(err))
    }
}
export const isAuthenticated = () => {
    if(typeof window == 'undefined'){
        return false
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }else {
        return false
    }
}

export const createCategory = (userId, token, category) => {
    return fetch(`http://localhost:4000/api/category/create/${userId}`,
    {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const getCategories = () => {
    return fetch(`http://localhost:4000/api/category/categories`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const createPet = (userId, token, product) => {
    return fetch(`http://localhost:4000/api/pets/createPets/${userId}`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
        
}

export const redirected = (next) => {
    if(!isAuthenticated()) {
        return <Redirect to ="/signin"/>
    } 
}