import React, {useEffect, useState} from "react";
import {getThreeRandomWords} from "../../utils/functions";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import About from "../About/About";
import WhyWe from "../WhyWe/WhyWe";
import Start from "../Start/Start";
import AuthBlock from "../AuthBlock/AuthBlock";
import AuthInfoPopup from "../AuthInfoPopup/AuthInfoPopup";
import WordsBlock from "../WordsBlock/WordsBlock";
import OpportunitiesBlock from "../OpportunitiesBlock/OpportunitiesBlock";
import AddingPopup from "../AddingPopup/AddingPopup";
import {IPropsMain} from "../../interfaces/interfacesForProps";

function Main(props: IPropsMain) {
    const [learnedWords, setLearnedWords] = useState<string[]>([]);
    const [wordsAreLoaded, setWordsAreLoaded] = useState(false);

    useEffect(() => {
        props.wordsAreLoaded &&
        getThreeRandomWords(props.learnedWords)
            .then((words) => {
                setLearnedWords(words)
            })
            .catch((err) => console.log(err))
            .finally(() => setWordsAreLoaded(true))
    }, [props.learnedWords])

    return (
        <>
            <Header path="/learn-new" linkName="Учить слова" isAuthorized={props.isAuthorized}
                    currentUser={props.currentUser} exitUser={props.exitUser}/>
            <About/>
            {
                !props.isAuthorized ?
                    <>
                        <WhyWe/>
                        <AuthBlock loginFunction={props.loginFunction} registerFunction={props.registerFunction}
                                   isLoading={props.isLoading}/>
                        <AuthInfoPopup isPopupOpened={props.isPopupOpened} message={props.message}
                                       setIsPopupOpened={props.setIsPopupOpened}/>
                        <Start/>
                    </> :
                    <div className="profile-blocks__container">
                        <OpportunitiesBlock openingPopupFunc={props.handlePopupOpen}/>
                        <AddingPopup isPopupOpen={props.isAddingPopupOpened} onClose={props.handlePopupClose}
                                     handleWordAdding={props.handleWordAdding}/>
                        <WordsBlock
                            wordsAreLoaded={wordsAreLoaded}
                            buttonText={learnedWords.length < 1 ? "Добавить слово" : "Перейти к повторению"}
                            words={learnedWords} title="Хочешь повторить выученные слова?"
                            openingPopupFunc={props.handlePopupOpen} linkName="/repeat"
                            buttonClass="words-block__button_pink" wordClass="word-item_pink"/>
                    </div>
            }
            <Footer/>
        </>
    )
}

export default Main;
