import React, {useState} from "react";
import "./Card.scss";
import {ICardProps} from "../../interfaces/interfacesForProps";
import WordTools from "../WordTools/WordTools";

function Card(props: ICardProps) {
    const [isTranslation, setIsTranslation] = useState(false);
    const [isRefactoring, setIsRefactoring] = useState(false);

    function handleChangeWord(evt: any) {
        if (evt.target.currentTarget === evt.target.value) {
            setIsTranslation(!isTranslation);
            setIsRefactoring(false);
        }
    }

    function handleSubmitWordChange(evt: any) {
        evt.preventDefault();
        props.onSubmitWord(props.card, props.word);
        setIsRefactoring(false);
    }

    function handleSubmitTranslationChange(evt: any) {
        evt.preventDefault();
        props.onSubmitTranslation(props.card, props.translation);
        setIsRefactoring(false);
    }

    function handleChangeButtonClick() {
        isRefactoring ? setIsRefactoring(false) : setIsRefactoring(true)
    }

    function handleDeleteCard() {
        props.onDelete(props.card._id);
    }

    function toggleLearningStatus() {
        props.toggleLearningStatus(props.card)
    }

    return (
        <article className="card" onClick={handleChangeWord}>
            <div className={`${isTranslation ? "card_inner" : "card_inner card_outer"}`}>
                <div className="card_word">
                    <form className="changing-form" onSubmit={handleSubmitWordChange}>
                        <input className={`card__text ${isRefactoring && "card__text_changing"}`}
                               value={props.word || ""} onChange={props.onChangeWord}
                               type="text" disabled={!isRefactoring}/>
                        {isRefactoring && <button className="changing-button">done</button>}
                    </form>
                    <WordTools isLearned={props.card.isLearned} handleDeleteCard={handleDeleteCard}
                               handleChangeButtonClick={handleChangeButtonClick}
                               toggleLearningStatus={toggleLearningStatus}/>
                </div>
                <div className="card_translation">
                    <form className="changing-form" onSubmit={handleSubmitTranslationChange}>
                        <input className={`card__text ${isRefactoring && "card__text_changing"}`}
                               onChange={props.onChangeTranslation}
                               value={props.translation || ""} type="text" disabled={!isRefactoring}/>
                        {isRefactoring && <button className="changing-button">done</button>}
                    </form>
                    <WordTools isLearned={props.card.isLearned} handleDeleteCard={handleDeleteCard}
                               handleChangeButtonClick={handleChangeButtonClick}
                               toggleLearningStatus={toggleLearningStatus}/>
                </div>
            </div>
        </article>
    )
}

export default Card;
