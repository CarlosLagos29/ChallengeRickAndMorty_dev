import SearchBar from "./Searchbar";
import Filters from "./Filters";

const Navbar = () => {
    return (
        <nav className=" flex justify-between items-center border-black border-3">
            <SearchBar/>
            <Filters/>
        </nav>
    )
}

export default Navbar