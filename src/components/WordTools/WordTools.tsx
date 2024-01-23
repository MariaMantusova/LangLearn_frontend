import React from "react";
import "./WordTools.scss";
import {IPropsWordTools} from "../../interfaces/interfacesForProps";

function WordTools(props: IPropsWordTools) {
    return(
        <ul className="card__tools">
            <li className="card__tool card__tool_change" onClick={props.handleChangeButtonClick}></li>
            <li className={`card__tool card__tool_learned ${!props.isLearned && "card__tool_unlearned"}`}
                onClick={props.toggleLearningStatus}></li>
            <li className="card__tool card__tool_delete" onClick={props.handleDeleteCard}></li>
        </ul>
    )
}

export default WordTools;
