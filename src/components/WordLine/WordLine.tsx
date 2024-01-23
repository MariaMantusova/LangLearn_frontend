import React, {useState} from "react";
import "./WordLine.scss";
import WordTools from "../WordTools/WordTools";
import {IWordLineProps} from "../../interfaces/interfacesForProps";

function WordLine(props: IWordLineProps) {
    const [isRefactoring, setIsRefactoring] = useState(false);
    const [wordValue, setWordValue] = useState(props.card.word)

    function handleSubmitWordChange(evt: any) {
        evt.preventDefault();
        props.onSubmitWord(props.card, wordValue);
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

    function handleChangeWord(evt: any) {
        setWordValue(evt.target.value)
    }

    return(
        <li className="word-line">
            <form className="word-line__form" onSubmit={handleSubmitWordChange}>
                <input className={`word-line__input ${isRefactoring && "word-line_changing"}`}
                       value={wordValue || ""} onChange={handleChangeWord}
                       type="text" disabled={!isRefactoring}/>
                {isRefactoring && <button className="word-line__button">Done</button>}
            </form>
            <WordTools isLearned={props.isLearned} toggleLearningStatus={toggleLearningStatus}
                       handleDeleteCard={handleDeleteCard} handleChangeButtonClick={handleChangeButtonClick}/>
        </li>
    )
}

export default WordLine;
