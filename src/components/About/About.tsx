import React, {useState} from "react";
import "./About.scss";
import Card from "../Card/Card";
import {IWord} from "../../interfaces/mainInterfaces";

function About() {
    const card: IWord = {
        translation: "Как бальзам на душу",
        word: "Music to one's ears",
        isLearned: false,
        userId: "opened",
        _id: ""
    }

    const [wordValue, setWordValue] = useState(card.word);
    const [translationValue, setTranslationValue] = useState(card.translation);

    function handleChangeTranslation(evt: any) {
        setTranslationValue(evt.target.value);
    }

    function handleChangeWord(evt: any) {
        setWordValue(evt.target.value);
    }

    function handleSubmitWord(wordCard: IWord, word: string) {
        setWordValue(word);
    }

    function handleSubmitTranslation(wordCard: IWord, translation: string) {
        setTranslationValue(translation);
    }

    return(
        <section className="about-block">
            <div className="about-block__text-container">
                <h1 className="about-block__title">Мы поможем выучить английский</h1>
                <p className="about-block__text">С помощью нашего приложения вы сможете учить слова и идиомы.</p>
            </div>
            <Card word={wordValue} translation={translationValue}
                  onSubmitTranslation={handleSubmitTranslation} onSubmitWord={handleSubmitWord}
                  onChangeTranslation={handleChangeTranslation}
                  card={card} onChangeWord={handleChangeWord}/>
        </section>
    )
}

export default About;
