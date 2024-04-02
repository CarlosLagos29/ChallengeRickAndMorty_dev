import { useDispatch } from "react-redux";
import { explore, setPage } from "../../GlobalState/slices/character.slice";
import { useState } from "react";

const SearchBar = () => {

    const [search, setSearch] = useState("");
    const dispatch = useDispatch()

    const handlerSearchBar = (event) => {
        setSearch(event.target.value);
    };

    const handlerSearch = () => {
        dispatch(explore(search));
        setSearch("")
    };

    return (
        <div className=" flex gap-2 ">
            <input className=" p-1 px-2 bg-transparent rounded-2xl border border-white w-96 "
                type="search" value={search} onChange={handlerSearchBar} />
            <button onClick={handlerSearch}
                className=" border border-white rounded-2xl p-1 px-2  hover:bg-greenLime hover:border-transparent transition duration-500 ">
                Search
            </button>
        </div>
    )
}

export default SearchBar;