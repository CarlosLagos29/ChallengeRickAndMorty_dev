import { prevPage, nextPage, setPage } from "../GlobalState/slices/character.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


const Paginaton = () => {

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

    const handlerPrev = () => {
        dispatch(prevPage())
    };

    const handlerNext = () => {
        dispatch(nextPage())
    };

    const handlerPage = (event) => {
        dispatch(setPage(event.target.value))
    };

    return (
        <div className=" flex flex-wrap justify-center text-xl gap-3 p-3 max-w-screen">
            <button onClick={handlerPrev} disabled={currentPage == 1}
             className={`${currentPage == 1 ? " text-slate-500" : ""} rounded-xl px-2  hover:bg-greenLime transition duration-500`}>
                {"<"}
            </button>
            {numberPages.map((n, i) => {
                return (
                    <button className={`${n == currentPage ? " bg-greenLime" : ""} rounded-xl px-2  hover:bg-greenLime transition duration-500`}
                     key={i} value={n} onClick={handlerPage}>
                        {n}
                    </button>
                )
            })}
            <button onClick={handlerNext} disabled={currentPage == totalPages}
             className={`${currentPage == totalPages ? " text-slate-500" : ""} rounded-xl px-2  hover:bg-greenLime transition duration-500`}>
                {">"}
            </button>
        </div>
    )
};

export default Paginaton;