import React, {useState} from "react";
import "./WordsPage.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {IWordsPageProps} from "../../interfaces/interfacesForProps";
import WordLine from "../WordLine/WordLine";
import {IWord} from "../../interfaces/mainInterfaces";
import Pagination from "../Pagination/Pagination";
import {Link} from "react-router-dom";

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
            <Header path="/" linkName="На главную" isAuthorized={props.isAuthorized} userName={props.userName}/>
            <section className="words-page">
                <h1 className="words-page__title">Мария, ваши {props.wordsType} слова</h1>
                <div className="words-page__container">
                <ul className="words-page__words">
                    {currentWords.map((word: IWord) => (
                        <WordLine isLearned={word.isLearned} word={word.word} translation={word.translation}
                                  key={word._id}/>
                    ))}
                </ul>
                <Pagination wordsPerPage={wordsPerPage} totalWords={words.length} paginate={paginate}
                            setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                </div>
                <Link to={props.linkName} className="words-page__button">{props.buttonText}</Link>
                {props.children}
            </section>
            <Footer/>
        </>
    )
}

export default WordsPage;
