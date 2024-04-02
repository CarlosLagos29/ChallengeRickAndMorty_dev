import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCharacters } from "../GlobalState/slices/character.slice";
import { setSpecies } from "../GlobalState/slices/species.slice";
import Card from "./Cards/Cards"
import Navbar from "./navBar/Navbar";
import Paginaton from "./Pagination";

const Home = () => {

    const { characters, currentPage, gender, species, status, name } = useSelector(state => state.characters);
    const { allSpecies } = useSelector(state => state.species);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSpecies());
        dispatch(setCharacters({ page: currentPage, filters: { gender, status, species, name } }));
    }, [dispatch, currentPage, gender, species, status, name]);

    return (
        <div>
            <nav className=" my-5 mx-20">
                <Navbar />
            </nav>
            <section className=" flex flex-wrap gap-4 items-center justify-center">
                {allSpecies.length ?
                    characters.map((character, index) => (
                            <Card image={character.image} name={character.name} id={character.id} key={index} index={index} />
                    ))
                    :
                    <img src="https://cdn.dribbble.com/users/233030/screenshots/3932726/rick-sanchez.gif" alt="Loading Page" />
                }
            </section>
            {allSpecies.length ? <Paginaton /> : null}
        </div>
    )
};

export default Home;