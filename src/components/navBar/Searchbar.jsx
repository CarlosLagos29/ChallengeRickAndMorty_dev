import { useDispatch } from "react-redux";
import { explore, setPage } from "../../GlobalState/slices/character.slice";
import { useState } from "react";

const SearchBar = ()=>{

    const [search, setSearch] = useState("");
    const dispatch = useDispatch()

    const handlerSearchBar = (event) =>{
        setSearch(event.target.value);
    };
    
    const handlerSearch = () => {
        dispatch(explore(search));
        dispatch(setPage(1))
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