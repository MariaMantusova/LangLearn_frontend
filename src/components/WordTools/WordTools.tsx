import React from "react";
import "./WordTools.scss";

function WordTools() {
    return(
        <ul className="card__tools">
            <li className="card__tool card__tool_change"></li>
            <li className="card__tool card__tool_learned"></li>
            <li className="card__tool card__tool_delete"></li>
        </ul>
    )
}

export default WordTools;
