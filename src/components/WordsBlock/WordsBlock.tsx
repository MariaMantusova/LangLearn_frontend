import React from "react";
import "./WordsBlock.scss";
import {IWordsBlockProps} from "../../interfaces/interfacesForProps";

function WordsBlock(props: IWordsBlockProps) {
    return(
        <div className="words-block">
            <h2 className="words-block__title">{props.title}</h2>
            <ul className="words-block__list">
                {props.words.map((word, index) => (
                    <li key={index} className={`word-item ${props.wordClass}`}>
                        {word}
                    </li>
                ))}
            </ul>
            <button className={`words-block__button ${props.buttonClass}`}>{props.buttonText}</button>
        </div>
    )
}

export default WordsBlock
