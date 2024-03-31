import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../GlobalState/slices/characters/characterSlice";
import Card from "./Cards/Cards"
import Navbar from "./navBar/Navbar";

const Home = () => {

    const { characters } = useSelector(state => state.characters)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch]);
//prueba commit
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
        </div>

    )
};

export default Home;