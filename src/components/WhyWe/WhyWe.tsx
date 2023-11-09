import React from "react";
import "./WhyWe.scss";

function WhyWe() {
    return(
        <section className="why-we-block">
            <h2 className="why-we-block__title">Почему именно мы?</h2>
            <ul className="why-we-block__list">
                <li className="why-we-block__item">Понятный интерфейс</li>
                <li className="why-we-block__item">Возможность добавлять, удалять и изменять слова</li>
                <li className="why-we-block__item">Ваши слова сохраняются и к ним можно вернуться в любое время</li>
                <li className="why-we-block__item">Не нужно оплачивать</li>
            </ul>
        </section>
    )
}

export default WhyWe;
