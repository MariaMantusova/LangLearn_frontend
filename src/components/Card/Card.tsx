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
        }
    }

    function handleSubmitWordChange(evt: any) {
        evt.preventDefault();
        props.onSubmit(props.card, props.word)
        setIsRefactoring(false)
    }

    function handleChangeButtonClick() {
        isRefactoring ? setIsRefactoring(false) : setIsRefactoring(true)
    }

    return (
        <article className="card" onClick={handleChangeWord}>
            <div className={`${isTranslation ? "card_inner" : "card_inner card_outer"}`}>
                <div className="card_word">
                    <form className="changing-form" onSubmit={handleSubmitWordChange}>
                        <input className={`card__text ${isRefactoring && "card__text_changing"}`}
                               value={props.word || ""}
                               onChange={props.onChange}
                               type="text" disabled={!isRefactoring}/>
                        {isRefactoring && <button className="changing-button">done</button>}
                    </form>
                    <WordTools isLearned={props.card.isLearned} handleChangeButtonClick={handleChangeButtonClick}/>
                </div>
                <div className="card_translation">
                    <form className="changing-form">
                        <input className="card__text" value={props.card.translation} type="text" disabled/>
                        {isRefactoring && <button className="changing-button">done</button>}
                    </form>
                    <WordTools isLearned={props.card.isLearned} handleChangeButtonClick={handleChangeButtonClick}/>
                </div>
            </div>
        </article>
    )
}

export default Card;
