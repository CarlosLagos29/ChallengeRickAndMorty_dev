import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { filtered } from "../../GlobalState/slices/character.slice";

const Filters = ()=>{

    const{ species } = useSelector(state => state.species);
    const dispatch = useDispatch();
    const [statusFilter, setStatusFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState("");
    const [specieFilter, setSpecieFilter] = useState("");

    const handlerStatus = (event)=>{
        setStatusFilter(event.target.value)
    };

    const handlerGender = (event)=>{
        setGenderFilter(event.target.value)
    };

    const handlerSpecie = (event)=>{
        setSpecieFilter(event.target.value)
    };

    const handlerFilter = ()=>{
        dispatch(filtered({statusFilter,genderFilter, specieFilter }))
    };

    return(
        <div className="flex flex-row">
            <select name="Status" onChange={handlerStatus}>
                <option value="">Status</option> 
                <option value="Alive">Alive</option> 
                <option value="Dead">Dead</option> 
                <option value="unknown">Unknown</option>
            </select>
            <select name="Gender" onChange={handlerGender}>
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Genderless">Genderless</option>
                <option value="unknown">Unknown</option>
            </select>
            <select name="Specie" onChange={handlerSpecie}>
                <option value="">Species</option>
                {species.length && species.map((s,index) => {
                    return (
                        <option value={s} key={index}>{s}</option>
                    )
                })}
            </select>
            <button onClick={handlerFilter}>Filter</button>
        </div>
    )
}

export default Filters;