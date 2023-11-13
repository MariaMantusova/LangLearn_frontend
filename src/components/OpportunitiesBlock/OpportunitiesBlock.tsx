import React from "react";
import "./OpportunitiesBlock.scss";
import {Link} from "react-router-dom";

function OpportunitiesBlock() {
    return(
        <section className="opportunities">
            <h2 className="opportunities__title">Чем хочешь заняться?</h2>
            <ul className="opportunities__list">
                <li className="opportunities__item">
                    <Link to="/words-learned" className="opportunities__link">Посмотреть выученные слова</Link>
                </li>
                <li className="opportunities__item">
                    <Link to="/words-new" className="opportunities__link">Посмотреть новые слова</Link>
                </li>
                <li className="opportunities__item">Добавить слово для изучения</li>
                <li className="opportunities__item">
                    <Link to="/words-all" className="opportunities__link">Посмотреть все слова</Link>
                </li>
            </ul>
        </section>
    )
}

export default OpportunitiesBlock;
