import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { filtered, resetFilters } from "../../GlobalState/slices/character.slice";
const Filters = () => {

    const { allSpecies } = useSelector(state => state.species);
    const dispatch = useDispatch();
    const [statusFilter, setStatusFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState("");
    const [specieFilter, setSpecieFilter] = useState("");

    const handlerStatus = (event) => {
        setStatusFilter(event.target.value)
    };

    const handlerGender = (event) => {
        setGenderFilter(event.target.value)
    };

    const handlerSpecie = (event) => {
        setSpecieFilter(event.target.value)
    };

    const handlerFilter = () => {
        dispatch(filtered({ statusFilter, genderFilter, specieFilter }))
    };

    const clearFilters = () => {
        setStatusFilter("");
        setGenderFilter("");
        setSpecieFilter("");
        dispatch(resetFilters())
    }

    return (
        <div className="flex flex-row gap-3 bg-transparent">
            <select name="Status" onChange={handlerStatus}
                className="bg-backGround rounded-2xl p-1 border border-white  hover:bg-blue hover:border-transparent transition duration-500">
                <option value="">Status</option>
                <option value="Alive" >Alive</option>
                <option value="Dead">Dead</option>
                <option value="unknown">Unknown</option>
            </select>
            <select name="Gender" onChange={handlerGender}
                className="bg-backGround rounded-2xl p-1 border border-white  hover:bg-greenLime hover:border-transparent transition duration-500" >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Genderless">Genderless</option>
                <option value="unknown">Unknown</option>
            </select>
            <select name="Specie" onChange={handlerSpecie}
                className="bg-backGround rounded-2xl border p-1 border-white  hover:bg-blue hover:border-transparent transition duration-500 ">
                <option value="">Species</option>
                {allSpecies.length && allSpecies.map((s, index) => {
                    return (
                        <option value={s} key={index}>{s}</option >
                    )
                })}
            </select>
            <button onClick={handlerFilter}
                className="rounded-2xl border border-white p-1 px-2 hover:bg-greenTransition hover:border-transparent transition duration-500">
                Filter
            </button>
            <button onClick={clearFilters}
                className="rounded-2xl border border-white p-1 px-2 hover:bg-blue hover:border-transparent transition duration-500">
                Clear Filters
            </button>
        </div>
    )
}

export default Filters;