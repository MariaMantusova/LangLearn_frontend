import React, {useState, useEffect} from "react";
import "./Pagination.scss";
import {IPropsPagination} from "../../interfaces/interfacesForProps";

function Pagination(props: IPropsPagination) {
    const [isPrevVectorDisabled, setIsPrevVectorDisabled] = useState(false)
    const [isNextVectorDisabled, setIsNextVectorDisabled]  = useState(false)
    let pageNumbers: number[] = []
    const [showedPages, setShowedPages] = useState<number[]>([])

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
        if (props.currentPage <= 1 && pageNumbers.length > 1) {
            setIsPrevVectorDisabled(true)
            setIsNextVectorDisabled(false)
        } else if (props.currentPage >= pageNumbers.length && !(props.currentPage <= 1)) {
            setIsNextVectorDisabled(true)
            setIsPrevVectorDisabled(false)
        } else {
            setIsNextVectorDisabled(false)
            setIsPrevVectorDisabled(false)
        }
    }, [props.currentPage])

    useEffect(() => {
        if (props.currentPage <= 1) {
            setIsPrevVectorDisabled(true)
        }

        if (props.currentPage >= pageNumbers.length) {
            setIsNextVectorDisabled(true)
        }
    }, [])

    useEffect(() => {
        if (pageNumbers.length > 5) {
           let showedNumbers = pageNumbers.slice(props.currentPage - 1, props.currentPage + 3)

            if (pageNumbers.length - props.currentPage < 4) {
                showedNumbers = pageNumbers.slice(pageNumbers.length - 4, pageNumbers.length)
            }

            setShowedPages(showedNumbers)
        } else {
            setShowedPages(pageNumbers)
        }
    }, [props.currentPage])

    return (
        <ul className="pagination">
            <li className="pagination__vector" onClick={prevPage}>
                <button className="pagination__vector_button" disabled={isPrevVectorDisabled}>&#10229;</button>
            </li>
            {showedPages.map((number) => (
                <li className={`pagination__item ${props.currentPage == number && "pagination__item_current"} `}
                    key={number} onClick={() => props.paginate(number)}>
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
