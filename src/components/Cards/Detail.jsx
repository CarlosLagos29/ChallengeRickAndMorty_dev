import GET_CHARACTER_BY_ID from "../../GlobalState/querys/getCharacterById";
import client from "../../GlobalState/apolloSetings/client";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {

    const { id } = useParams();
    const [character, setCharacter] = useState("");

    useEffect(() => {
        client.query({
            query: GET_CHARACTER_BY_ID,
            variables: { id }
        }).then(
            ({ data }) => {
                setCharacter(data.character)
            }
        ).catch(error => console.error(error))
    }, [id]);

    return (
        <div className=" flex flex-col justify-center items-center h-screen gap-y-3">
            {character === "" ? <img src="https://cdn.dribbble.com/users/233030/screenshots/3932726/rick-sanchez.gif" alt="Loading Page" /> :
                <div>
                    <NavLink to="/">
                        <button className=" bg-greenLime  hover:bg-blue transition duration-500
                         px-3 mb-3 rounded-xl text-3xl">Back to home</button>
                    </NavLink>

                    <section className=" flex p-5 items-center justify-center border-8 border-greenLime gap-3 rounded-2xl">
                        <span>
                            <img className="rounded-2xl" src={character.image} alt={character.name} />
                        </span>
                        <span>
                            <h1>Name: {character.name}</h1>
                            <h2>Status: {character.status}</h2>
                            <h2>Gender: {character.gender}</h2>
                            <h2>Specie: {character.species}</h2>
                            {character.type !== "" && <h2>Subspecie: {character.type}</h2>}
                            <h2>Origin: {character.origin?.name}</h2>
                            <h2>Location: {character.location?.name}</h2>
                            <h2> First episode: n° {character.episode[0]?.id} "{character.episode[0]?.name}" </h2>
                            <h2> Last episode: n° {character.episode[character.episode.length - 1]?.id} "{character.episode[character.episode.length - 1]?.name} "</h2>
                        </span>
                    </section>
                </div>}
        </div>
    )
};

export default Detail;