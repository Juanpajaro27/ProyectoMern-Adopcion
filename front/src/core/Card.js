import React, { useState } from 'react'
import './Card.css'
import ShowImage from './ShowImage'
import { Link } from 'react-router-dom'

export default function Card({pet}) {
    const [count, setCount] = useState(pet.count)

    
    return (
        <div className = "card m-10 card-cont">
            <div>
                <h2>{pet.name}</h2>
                <ShowImage className = "img" item={pet} url="pets"/>
                <p> {pet.raza} </p>
                <p> {pet.especie} </p>
                <Link to = {`/pets/${pet._id}`}>
                    <button className = "btn btn-success">Ver Mas</button>
                </Link>
            </div>
        </div>
    )
}
