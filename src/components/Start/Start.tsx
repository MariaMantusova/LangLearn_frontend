import React from "react";
import "./Start.scss";
import {Link} from "react-router-dom";

function Start() {
    return(
        <section className="start-block">
            <h2 className="start-block__text">Начни учить английский сейчас</h2>
            <Link to="/register" className="start-block__link">Зарегистрироваться</Link>
        </section>
    )
}

export default Start;
