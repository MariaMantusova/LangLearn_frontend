import React from "react";
import "./WordsPage.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {IWordsPageProps} from "../../interfaces/interfacesForProps";
import WordLine from "../WordLine/WordLine";
import {IWordInterface} from "../../interfaces/mainInterfaces";

function WordsPage(props: IWordsPageProps) {
    return (
        <>
            <Header path="/profile" linkName="В профиль"/>
            <section className="words-page">
                <h1 className="words-page__title">Мария, ваши {props.wordsType} слова</h1>
                <ul className="words-page__words">
                    {props.words.map((word: IWordInterface) => (
                        <WordLine word={word.word} translation={word.translation} key={word._id}/>
                    ))}
                </ul>
                <button className="words-page__button">{props.buttonText}</button>
                {props.children}
            </section>
            <Footer/>
        </>
    )
}

export default WordsPage;
