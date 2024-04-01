import { NavLink } from "react-router-dom";

const Card = ({image, id})=>{
    return(
        <div className=" border-8 rounded-2xl border-green-400 p-2">
            <NavLink to={`/${id}`}>
                <img src={image} alt={id} />
            </NavLink>
        </div>
    )
}

export default Card