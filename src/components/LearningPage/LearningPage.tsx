import React, {useState} from "react";
import "./LearningPage.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Card from "../Card/Card";
import {IPropsLearningPage} from "../../interfaces/interfacesForProps";

function LearningPage(props: IPropsLearningPage) {
    const currentUserName: string = props.currentUser.charAt(0).toUpperCase() + props.currentUser.slice(1)

    const [currentIndex, setCurrentIndex] = useState(0);
    const [disablePrevButton, setDisablePrevButton] = useState(true);
    const [disableNextButton, setDisableNextButton] = useState(false);

    React.useEffect(() => {
        if (currentIndex >= 1) {
            setDisablePrevButton(false);
        }

        if (currentIndex < props.words.length - 1) {
            setDisableNextButton(false)
        }
    }, [currentIndex]);

    function handleNextCard() {
        if (currentIndex < props.words.length - 2) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setDisableNextButton(true);
            setCurrentIndex(props.words.length - 1);
        }
    }

    function handlePrevCard() {
        if (currentIndex > 1) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(0);
            setDisablePrevButton(true)
        }
    }

    return (
        <>
            <Header path="/" linkName="На главную" isAuthorized={props.isAuthorized} exitUser={props.exitUser}
                    currentUser={props.currentUser}/>
            <section className="learning-page">
                <h1 className="learning-page__title">{currentUserName}, у тебя все получится!</h1>
                <div className="learning-page__container">
                    <button
                        className={`learning-page__vector vector_left ${disablePrevButton && "vector_left_disabled"}`}
                        onClick={handlePrevCard}
                        disabled={disablePrevButton}></button>
                    <Card isLearned={props.words[currentIndex].isLearned} word={props.words[currentIndex].word}
                          translation={props.words[currentIndex].translation}/>
                    <button
                        className={`learning-page__vector vector_right ${disableNextButton && "vector_right_disabled"}`}
                        onClick={handleNextCard}
                        disabled={disableNextButton}></button>
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default LearningPage;
