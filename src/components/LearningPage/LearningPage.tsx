import React from "react";
import "./LearningPage.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Card from "../Card/Card";

function LearningPage() {
    return(
        <>
            <Header path="/profile" linkName="В профиль"/>
            <section className="learning-page">
                <h1 className="learning-page__title">Мария, у тебя все получится!</h1>
                <div className="learning-page__container">
                    <div className="learning-page__vector vector_left"></div>
                    <Card word="Confused" translation="Озадачен"/>
                    <div className="learning-page__vector vector_right"></div>
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default LearningPage;
