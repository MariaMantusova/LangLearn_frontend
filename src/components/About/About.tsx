import React from "react";
import "./About.scss";
import Card from "../Card/Card";

function About() {
    return(
        <section className="about-block">
            <div className="about-block__text-container">
                <h1 className="about-block__title">Мы поможем выучить английский</h1>
                <p className="about-block__text">С помощью нашего приложения вы сможете учить слова и идиомы.</p>
            </div>
            {/*<Card translation="Как бальзам на душу" word="Music to one's years" isLearned={false}/>*/}
        </section>
    )
}

export default About;
