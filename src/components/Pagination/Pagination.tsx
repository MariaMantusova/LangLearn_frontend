import React, {useState, useEffect} from "react";
import "./Pagination.scss";
import {IPropsPagination} from "../../interfaces/interfacesForProps";

function Pagination(props: IPropsPagination) {
    const [isPrevVectorDisabled, setIsPrevVectorDisabled] = useState(false)
    const [isNextVectorDisabled, setIsNextVectorDisabled]  = useState(false)
    const pageNumbers: number[] = []

    for (let i = 1; i <= Math.ceil((props.totalWords / props.wordsPerPage)); i++) {
        pageNumbers.push(i)
    }

    function nextPage() {
        props.setCurrentPage(props.currentPage + 1)
    }

    function prevPage() {
        props.setCurrentPage(props.currentPage - 1)
    }

    useEffect(() => {
        if (props.currentPage <= 1) {
            setIsPrevVectorDisabled(true)
        } else if (props.currentPage >= pageNumbers.length) {
            setIsNextVectorDisabled(true)
        } else {
            setIsNextVectorDisabled(false)
            setIsPrevVectorDisabled(false)
        }
    }, [props.currentPage])

    return (
        <ul className="pagination">
            <li className="pagination__vector" onClick={prevPage}>
                <button className="pagination__vector_button" disabled={isPrevVectorDisabled}>&#10229;</button>
            </li>
            {pageNumbers.map((number) => (
                <li className="pagination__item" key={number} onClick={() => props.paginate(number)}>
                    {number}
                </li>
            ))}
            <li className="pagination__vector" onClick={nextPage}>
                <button className="pagination__vector_button" disabled={isNextVectorDisabled}>&#10230;</button>
            </li>
        </ul>
    )
}

export default Pagination;
