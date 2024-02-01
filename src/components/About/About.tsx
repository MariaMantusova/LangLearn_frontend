import React, {useState} from "react";
import "./About.scss";
import Card from "../Card/Card";
import {IWord} from "../../interfaces/mainInterfaces";

function About() {
    const [isLearned, setIsLearned] = useState(false);

    const card: IWord = {
        translation: "Как бальзам на душу",
        word: "Music to one's ears",
        isLearned: isLearned,
        userId: "opened",
        _id: ""
    }

    const [wordValue, setWordValue] = useState(card.word);
    const [translationValue, setTranslationValue] = useState(card.translation);
    const [cardIsDeleted, setCardIsDeleted] = useState(false);

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

    function handleDelete() {
        setCardIsDeleted(true)
    }

    function handleReturnButtonClick() {
        setCardIsDeleted(false)
    }

    function toggleLearningStatus(card: IWord) {
        setIsLearned(!isLearned)
    }

    return(
        <section className="about-block">
            <div className="about-block__text-container">
                <h1 className="about-block__title">Мы поможем выучить английский</h1>
                <p className="about-block__text">
                    С помощью нашего приложения вы сможете учить слова и идиомы.
                </p>
            </div>
            {cardIsDeleted ?
                <div className="about-block__card-place">
                    <p className="about-block__card-text">Карточка удалена</p>
                    <button className="about-block__return-button" onClick={handleReturnButtonClick}>
                        Вернуть пример
                    </button>
                </div>
                : <Card word={wordValue} translation={translationValue} onDelete={handleDelete}
                        onSubmitTranslation={handleSubmitTranslation} onSubmitWord={handleSubmitWord}
                        onChangeTranslation={handleChangeTranslation}
                        toggleLearningStatus={toggleLearningStatus}
                        card={card} onChangeWord={handleChangeWord}/>}
        </section>
    )
}

export default About;
