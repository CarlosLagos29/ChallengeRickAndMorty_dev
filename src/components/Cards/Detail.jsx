import GET_CHARACTER_BY_ID from "../../GlobalState/querys/getCharacterById";
import client from "../../GlobalState/apolloSetings/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {

    const { id } = useParams()
    const [character, setCharacter] = useState({})

    useEffect(() => {
        client.query({
            query: GET_CHARACTER_BY_ID,
            variables: { id }
        }).then(
            ({ data }) => {
                setCharacter(data.character)
            }
        ).catch(error => console.error(error))
    }, [id])

    return (
        <div className=" flex items-center justify-center border border-green-500 gap-3">
            <section>
                <img src={character.image} alt="" />
            </section>
            <section>
                <h1>Name: {character.name}</h1>
                <h2>Status: {character.status}</h2>
                <h2>Gender: {character.gender}</h2>
                <h2>Specie: {character.species}</h2>
                { character.type !== "" && <h2>Subspecie: {character.type}</h2>}
                <h2>Origin: {character.origin?.name}</h2>
                <h2>Location: {character.location?.name}</h2>
            </section>
        </div>
    )
}

export default Detail;