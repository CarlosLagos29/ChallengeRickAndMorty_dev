import { NavLink } from "react-router-dom";

const Card = ({image,name, id, index})=>{
    return(
        <div className={`${index % 2 != 0? "border-blue": " border-greenLime"}
        max-h-96 max-w-80 overflow-hidden
        border-8 rounded-2xl p-2 text-center
        hover:scale-105 transition-transform`}>
            <NavLink to={`/detail/${id}`}>
                <img className="rounded-2xl" src={image} alt={name} />
                 <h1 className=" text-2xl pt-2 ">{name}</h1>
            </NavLink>
        </div>
    )
};

export default Card;