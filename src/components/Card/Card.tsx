import React, {useState} from "react";
import "./Card.scss";
import {ICardProps} from "../../interfaces/interfacesForProps";
import WordTools from "../WordTools/WordTools";

function Card(props: ICardProps) {
    const [isTranslation, setIsTranslation] = useState(false);

    function handleChangeWord() {
        setIsTranslation(!isTranslation);
    }

    return(
        <article className="card" onClick={handleChangeWord}>
            <p className="card__text">{isTranslation ? props.translation : props.word}</p>
            <WordTools/>
        </article>
    )
}

export default Card;
