import { NavLink } from "react-router-dom";

const Card = ({image,name, id})=>{
    return(
        <div className=" border-8 rounded-2xl border-green-400 p-2 text-center">
            <NavLink to={`/${id}`}>
                <img className=" rounded-2xl" src={image} alt={id} />
                <h1>{name}</h1>
            </NavLink>
        </div>
    )
}

export default Card