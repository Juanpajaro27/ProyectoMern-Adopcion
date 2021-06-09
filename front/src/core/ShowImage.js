import './ShowImage.css'
// import {API} from '../config'


export default function ShowImage({item, url}) {
    return (
        <div className = "pets-img">
            <img src={`http://localhost:4000/api/pets/foto/${item._id}`} alt={item.name}
            className = "mb-3 img-cont"
            style={{ maxHeight:"600px", maxWidth:"300px" }}
            />
        </div>
    )
}
