import { prevPage, nextPage, setPage } from "../GlobalState/slices/character.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


const Paginaton = ()=>{
    
    const { currentPage, totalPages } = useSelector(state => state.characters);
    const dispatch = useDispatch();

    const [numberPages, setNumberpages] = useState([]);

    useEffect(() => {
        const generatePageNumbers = () => {
            const numbers = [];
            let start = Math.max(1, currentPage - 4);
            let end = Math.min(totalPages, currentPage + 5);

            while (end - start < 9 && (start > 1 || end < totalPages)) {
                if (start > 1) {
                    start--;
                }
                if (end < totalPages) {
                    end++;
                }
            }

            for (let i = start; i <= end; i++) {
                numbers.push(i);
            }
            setNumberpages(numbers);
        };

        generatePageNumbers();
    }, [currentPage, totalPages]);

    const handlerPrev = ()=>{
        dispatch(prevPage())
    };

    const handlerNext = ()=>{
        dispatch(nextPage())
    };

    const handlerPage = (event) =>{
        dispatch(setPage(event.target.value))
    };

     return(
        <div className=" flex justify-center text-xl gap-3">
            <button onClick={handlerPrev}> { "<" } </button>
            {numberPages.map((n , i) =>{
                return(
                    <button className={`${n == currentPage? " bg-green-400": ""} rounded-full p-2`} key={i} value={n} onClick={handlerPage}>{n}</button>
                )
            })}
            <button onClick={handlerNext}> { ">" } </button>
        </div>
    )
};

export default Paginaton;