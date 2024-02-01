import React from "react";
import {Link} from "react-router-dom";
import "./NotFoundPage.scss";

function NotFoundPage() {
    return (
        <section className="not-found">
            <h1 className="not-found__text">Такой страницы не существует</h1>
            <Link to="/" className="not-found__link">Вернуться на главную</Link>
        </section>
    )
}

export default NotFoundPage;
