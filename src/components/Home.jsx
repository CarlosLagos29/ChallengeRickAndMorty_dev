import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCharacters } from "../GlobalState/slices/character.slice";
import { setSpecies } from "../GlobalState/slices/species.slice";
import Card from "./Cards/Cards"
import Navbar from "./navBar/Navbar";

const Home = () => {

    const { characters, currentPage, totalPages, gender, species, status, name   } = useSelector(state => state.characters)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSpecies());
        dispatch(setCharacters({page: currentPage, filters: { gender, status, species, name }}));
    }, [dispatch, currentPage, gender, species, status, name]);

    return (
        <div>
            <nav className=" flex justify-center m-2">
                <Navbar/>
            </nav>
            <section className=" flex flex-wrap gap-2 items-center justify-center">
                {characters.map((character, index) => (
                    <Card image={character.image} id={character.id} key={index} />
                ))}
            </section>
            <h1>{totalPages}</h1>
        </div>

    )
};

export default Home;