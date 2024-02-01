import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./WordsPage.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import WordLine from "../../components/WordLine/WordLine";
import Pagination from "../../components/Pagination/Pagination";
import Preloader from "../../components/Preloader/Preloader";
import {IWordsPageProps} from "../../interfaces/interfacesForProps";
import {IWord} from "../../interfaces/mainInterfaces";

function WordsPage(props: IWordsPageProps) {
    const currentUserName: string = props.currentUser.charAt(0).toUpperCase() + props.currentUser.slice(1)

    const words = props.words;
    const [currentPage, setCurrentPage] = useState(1);
    const [wordsPerPage] = useState(7);
    const [isLoading, setIsLoading] = useState(false);

    const lastWordIndex: number = currentPage * wordsPerPage;
    const firstWordIndex: number = lastWordIndex - wordsPerPage;
    const currentWords = words.slice(firstWordIndex, lastWordIndex);

    function paginate(pageNumber: number) {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        setIsLoading(true);
    }, [])

    useEffect(() => {
        props.wordsAreLoaded && setIsLoading(false);
    }, [props.words])

    return (
        <>
            <Header path="/" linkName="На главную" exitUser={props.exitUser}
                    isAuthorized={props.isAuthorized} currentUser={props.currentUser}/>
            <section className="words-page">
                {
                    isLoading ? <Preloader/> :
                    words.length < 1 ?
                        <h1 className="words-page__title">{currentUserName}, ваши {props.wordsType} слова не
                            найдены</h1>
                        : <>
                            <h1 className="words-page__title">{currentUserName}, ваши {props.wordsType} слова</h1>
                            <div className="words-page__container">
                                <ul className="words-page__words">
                                    {currentWords.map((word: IWord) => (
                                        <WordLine isLearned={word.isLearned} card={word}
                                                  onSubmitWord={props.onSubmitWord}
                                                  onDelete={props.onDelete}
                                                  toggleLearningStatus={props.toggleLearningStatus}
                                                  key={word._id}/>
                                    ))}
                                </ul>
                                <Pagination wordsPerPage={wordsPerPage} totalWords={words.length} paginate={paginate}
                                            setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                            </div>
                            <Link to={props.linkName} className="words-page__button">{props.buttonText}</Link>
                            {props.children}
                        </>
                }

            </section>
            <Footer/>
        </>
    )
}

export default WordsPage;
