import React, {useState} from "react";
import "./LearningPage.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
import {IPropsLearningPage} from "../../interfaces/interfacesForProps";

function LearningPage(props: IPropsLearningPage) {
    const currentUserName: string = props.currentUser.charAt(0).toUpperCase() + props.currentUser.slice(1)

    const [currentIndex, setCurrentIndex] = useState(0);
    const [disablePrevButton, setDisablePrevButton] = useState(true);
    const [disableNextButton, setDisableNextButton] = useState(false);
    const [wordValue, setWordValue] = useState(props.words[currentIndex].word);
    const [translationValue, setTranslationValue] = useState(props.words[currentIndex].translation);

    function handleWordInputChange(evt: any) {
        setWordValue(evt.target.value);
    }

    function handleTranslationInputChange(evt: any) {
        setTranslationValue(evt.target.value);
    }

    React.useEffect(() => {
        if (currentIndex >= 1) {
            setDisablePrevButton(false);
        }

        if (currentIndex < props.words.length - 1) {
            setDisableNextButton(false)
        } else {
            setDisableNextButton(true)
        }

        setWordValue(props.words[currentIndex].word)
        setTranslationValue(props.words[currentIndex].translation)
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
                {
                    props.words.length < 1 ?
                        <h1 className="learning-page__title">{currentUserName}, у тебя пока нет слов.</h1>
                        :
                        <>
                            <h1 className="learning-page__title">{currentUserName}, у тебя все получится!</h1>
                            <div className="learning-page__container">
                                <button
                                    className={`learning-page__vector vector_left ${disablePrevButton && "vector_left_disabled"}`}
                                    onClick={handlePrevCard}
                                    disabled={disablePrevButton}></button>
                                <Card word={wordValue} onSubmitWord={props.onSubmitWord}
                                      onChangeTranslation={handleTranslationInputChange}
                                      onSubmitTranslation={props.onSubmitTranslation} translation={translationValue}
                                      card={props.words[currentIndex]} onChangeWord={handleWordInputChange}/>
                                <button
                                    className={`learning-page__vector vector_right ${disableNextButton && "vector_right_disabled"}`}
                                    onClick={handleNextCard}
                                    disabled={disableNextButton}></button>
                            </div>
                        </>
                }

            </section>
            <Footer/>
        </>
    )
}

export default LearningPage;
