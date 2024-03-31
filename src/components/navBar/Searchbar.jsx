import { useDispatch } from "react-redux";
import { setCharacters } from "../../GlobalState/slices/character.slice";
import { useState } from "react";

const SearchBar = ()=>{

    const [search, setSearch] = useState("");
    const dispatch = useDispatch()

    const handlerSearchBar = (event) =>{
        setSearch(event.target.value);
    };
    
    const handlerSearch = () => {
        dispatch(setCharacters(search));
        setSearch("")
    };

    return(
        <div className=" flex ">
            <input className=" p-1 px-2" type="search" value={search} onChange={handlerSearchBar} /> 
            <button onClick={handlerSearch}>Search</button>
        </div>
    )
}

export default SearchBar;