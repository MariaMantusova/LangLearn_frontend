import React, {useState} from "react";
import "./Card.scss";
import {ICardProps} from "../../interfaces/interfacesForProps";
import WordTools from "../WordTools/WordTools";

function Card(props: ICardProps) {
    const [isTranslation, setIsTranslation] = useState(false);

    function handleChangeWord() {
        setIsTranslation(!isTranslation);
    }

    return (
        <article className="card" onClick={handleChangeWord}>
            <div className={`${isTranslation ? "card_inner" : "card_inner card_outer"}`}>
                <div className="card_word">
                    <p className="card__text">{props.word}</p>
                    <WordTools/>
                </div>
                <div className="card_translation">
                    <p className="card__text">{props.translation}</p>
                    <WordTools/>
                </div>
            </div>
        </article>
    )
}

export default Card;
