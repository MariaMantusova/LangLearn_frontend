import React, {useState} from "react";
import "./WordsPage.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {IWordsPageProps} from "../../interfaces/interfacesForProps";
import WordLine from "../WordLine/WordLine";
import {IWordInterface} from "../../interfaces/mainInterfaces";
import Pagination from "../Pagination/Pagination";

function WordsPage(props: IWordsPageProps) {
    const [words, setWords] = useState(props.words);
    const [currentPage, setCurrentPage] = useState(1);
    const [wordsPerPage] = useState(7);

    const lastWordIndex: number = currentPage * wordsPerPage;
    const firstWordIndex: number = lastWordIndex - wordsPerPage;
    const currentWords = words.slice(firstWordIndex, lastWordIndex);

    function paginate(pageNumber: number) {
        setCurrentPage(pageNumber)
    }

    return (
        <>
            <Header path="/profile" linkName="В профиль"/>
            <section className="words-page">
                <h1 className="words-page__title">Мария, ваши {props.wordsType} слова</h1>
                <div className="words-page__container">
                <ul className="words-page__words">
                    {currentWords.map((word: IWordInterface) => (
                        <WordLine word={word.word} translation={word.translation} key={word._id}/>
                    ))}
                </ul>
                <Pagination wordsPerPage={wordsPerPage} totalWords={words.length} paginate={paginate}
                            setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                </div>
                <button className="words-page__button">{props.buttonText}</button>
                {props.children}
            </section>
            <Footer/>
        </>
    )
}

export default WordsPage;
