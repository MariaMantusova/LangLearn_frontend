import React, {useState} from "react";
import "./Card.scss";
import {ICardProps} from "../../interfaces/interfacesForProps";

function Card(props: ICardProps) {
    const [isTranslation, setIsTranslation] = useState(false);

    function handleChangeWord() {
        setIsTranslation(!isTranslation);
    }

    return(
        <article className="card" onClick={handleChangeWord}>
            <p className="card__text">{isTranslation ? props.translation : props.word}</p>
            <ul className="card__tools">
                <li className="card__tool card__tool_change"></li>
                <li className="card__tool card__tool_learned"></li>
                <li className="card__tool card__tool_delete"></li>
            </ul>
        </article>
    )
}

export default Card;
