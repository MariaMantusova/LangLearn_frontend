import React from "react";
import "./WordTools.scss";
import {IPropsWordTools} from "../../interfaces/interfacesForProps";

function WordTools(props: IPropsWordTools) {
    return(
        <ul className="card__tools">
            <li className="card__tool card__tool_change"></li>
            <li className={`card__tool card__tool_learned ${!props.isLearned && "card__tool_unlearned"}`}></li>
            <li className="card__tool card__tool_delete"></li>
        </ul>
    )
}

export default WordTools;
