import SearchBar from "./Searchbar";
import Filters from "./Filters";

const Navbar = () => {
    return (
        <nav className=" flex flex-wrap justify-evenly max-w-screen items-center p-3">
            <SearchBar/>
            <Filters/>
        </nav>
    )
};

export default Navbar;