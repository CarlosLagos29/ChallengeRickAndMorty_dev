import { NavLink } from "react-router-dom";

const Card = ({image, id})=>{
    return(
        <div>
            <NavLink to={`/${id}`}>
                <img src={image} alt="" />
            </NavLink>
        </div>
    )
}

export default Card