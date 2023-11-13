import React from "react";
import "./WordLine.scss";
import WordTools from "../WordTools/WordTools";
import {IWordLineProps} from "../../interfaces/interfacesForProps";

function WordLine(props: IWordLineProps) {
    return(
        <li className="word-line">
            <p className="word-line__text">{props.word}</p>
            <WordTools/>
        </li>
    )
}

export default WordLine;
