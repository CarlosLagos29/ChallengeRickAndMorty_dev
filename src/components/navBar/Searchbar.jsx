import { useDispatch } from "react-redux";
import { fetchData } from "../../GlobalState/slices/characters/characterSlice";
import { useState } from "react";

const SearchBar = ()=>{

    const [search, setSearch] = useState("");
    const dispatch = useDispatch()

    const handlerSearchBar = (event) =>{
        setSearch(event.target.value);
        dispatch(fetchData(search));
    };
    
    const handlerSearch = () => {
        dispatch(fetchData(search));
        setSearch("")
    };

    return(
        <div>
            <input type="search" value={search} onChange={handlerSearchBar} /> 
            <button onClick={handlerSearch}>Search</button>
        </div>
    )
}

export default SearchBar;