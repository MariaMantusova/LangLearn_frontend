import React from "react";
import "./WordsPage.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {IWordsPageProps} from "../../interfaces/interfacesForProps";
import WordLine from "../WordLine/WordLine";

function WordsPage(props: IWordsPageProps) {
    return (
        <>
            <Header path="/profile" linkName="В профиль"/>
            <section className="words-page">
                <h1 className="words-page__title">Мария, ваши {props.wordsType} слова</h1>
                <ul className="words-page__words">
                    <WordLine word="something" translation="что-то"/>
                    <WordLine word="word" translation="слово"/>
                    <WordLine word="humiliation" translation="унижение"/>
                    <WordLine word="simultaneously" translation="одновременно"/>
                </ul>
                <button>{props.buttonText}</button>
                {props.children}
            </section>
            <Footer/>
        </>
    )
}

export default WordsPage;
