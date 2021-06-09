import React, { useEffect, useState } from 'react'
import NavBar from '../layout/NavBar'
import { read } from './apiCore'
import Card from './Card'


const Pets = (props) => {
    
    const [pets, setPets] = useState({})
    const [error, setError] = useState(false)

    const loadPets = petsId => {
        read(petsId)
            .then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setPets(data)
            }
        })
    }

    useEffect(() => {
        const petsId = props.match.params.petsId
        loadPets(petsId)
    }, [])

    return(
        <>
            <NavBar></NavBar>
            <div className = "container">
                {
                    pets &&
                    <Card pet={pets}/>
                }
            </div>
        </>
    )
}

export default Pets