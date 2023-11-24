import React from "react";
import {useNavigate} from "react-router";
import "./WordsBlock.scss";
import {IWordsBlockProps} from "../../interfaces/interfacesForProps";

function WordsBlock(props: IWordsBlockProps) {
    const navigate = useNavigate();

    function handleButtonClick() {
        if (props.buttonText == "Добавить слово") {
            props.openingPopupFunc()
        } else {
            navigate(props.linkName)
        }
    }

    return(
        <div className="words-block">
            <h2 className="words-block__title">{props.title}</h2>
            <ul className="words-block__list">
                {Array.isArray(props.words) ? props.words.map((word, index) => (
                        <li key={index} className={`word-item ${props.wordClass}`}>
                            {word}
                        </li>
                    )) :
                    <li className="word-item">
                        {props.words}
                    </li>}
            </ul>
            <button className={`words-block__button ${props.buttonClass}`}
                    onClick={handleButtonClick}>{props.buttonText}</button>
        </div>
    )
}

export default WordsBlock
