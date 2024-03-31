import GET_CHARACTER_BY_ID from "../../GlobalState/querys/getCharacterById";
import client from "../../GlobalState/apolloSetings/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = ()=>{

    const {id} = useParams()
    const [character, setCharacter]= useState({})

    useEffect(()=>{
        client.query({
            query: GET_CHARACTER_BY_ID,
            variables:{id}
        }).then(
            ({data})=>{
                setCharacter(data.character)
            }
        ).catch(error => console.error(error))
    },[id])

    return(
        <div>
           <img src={character.image} alt="" />
        </div>
    )
}

export default Detail;