import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCharacters } from "../GlobalState/slices/character.slice";
import { setSpecies } from "../GlobalState/slices/species.slice";
import Card from "./Cards/Cards"
import Navbar from "./navBar/Navbar";
import Paginaton from "./Pagination";

const Home = () => {

    const { characters, currentPage, gender, species, status, name, loading, error } = useSelector(state => state.characters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSpecies());
    }, [dispatch]);

    useEffect(() => {
        dispatch(setCharacters({ page: currentPage, filters: { gender, status, species, name } }));
    }, [dispatch, currentPage, gender, species, status, name]);

    return (
        <div>
            <nav className=" my-5 mx-20">
                <Navbar />
            </nav>
            <section className=" flex flex-wrap gap-4 items-center justify-center">
                {loading ? (
                    <span className="h-screen">
                        <img src="https://cdn.dribbble.com/users/233030/screenshots/3932726/rick-sanchez.gif" alt="Loading Page" />
                    </span>
                ) : error ? (
                    <p className="mt-10 text-center">Something went wrong loading the characters. Please try again later.</p>
                ) : characters.length === 0 ? (
                    <p className="mt-10 text-center">No characters found</p>
                ) : (
                    characters.map((character, index) => (
                        <Card image={character.image} name={character.name} id={character.id} key={character.id} index={index} />
                    ))
                )}
            </section>
            {!loading && characters.length > 0 ? <Paginaton /> : null}
        </div>
    )
};

export default Home;