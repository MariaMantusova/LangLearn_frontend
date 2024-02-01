import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import "./WordsBlock.scss";
import Preloader from "../Preloader/Preloader";
import {IWordsBlockProps} from "../../interfaces/interfacesForProps";

function WordsBlock(props: IWordsBlockProps) {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        !props.wordsAreLoaded && setIsLoading(true);
    }, [props.words, props.wordsAreLoaded])

    useEffect(() => {
        props.wordsAreLoaded && setIsLoading(false);
    }, [props.words, props.wordsAreLoaded])

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
            {
                isLoading ? <Preloader/> :
                    <ul className="words-block__list">
                        {props.words.length > 0 ? props.words.map((word, index) => (
                                <li key={index} className={`word-item ${props.wordClass}`}>
                                    {word}
                                </li>
                            )) :
                            <li className="word-item">
                                У вас нет таких слов
                            </li>}
                    </ul>
            }
            <button className={`words-block__button ${props.buttonClass}`}
                    onClick={handleButtonClick}>{props.buttonText}</button>
        </div>
    )
}

export default WordsBlock
