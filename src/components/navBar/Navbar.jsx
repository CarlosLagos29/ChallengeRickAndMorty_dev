import SearchBar from "./Searchbar";
import Filters from "./Filters";

const Navbar = () => {
    return (
        <nav className=" flex justify-evenly items-center p-3">
            <SearchBar/>
            <Filters/>
        </nav>
    )
}

export default Navbar