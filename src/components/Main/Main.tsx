import React, {useState} from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import About from "../About/About";
import WhyWe from "../WhyWe/WhyWe";
import Start from "../Start/Start";
import AuthBlock from "../AuthBlock/AuthBlock";
import {IPropsMain} from "../../interfaces/interfacesForProps";
import AuthInfoPopup from "../AuthInfoPopup/AuthInfoPopup";
import WordsBlock from "../WordsBlock/WordsBlock";
import OpportunitiesBlock from "../OpportunitiesBlock/OpportunitiesBlock";
import {getThreeRandomWords} from "../../utils/functions";
import AddingPopup from "../AddingPopup/AddingPopup";

function Main(props: IPropsMain) {
    const learnedWords: string[] | string = getThreeRandomWords(props.learnedWords)
    const newWords: string[] | string = getThreeRandomWords(props.newWords)

    const [isOpened, setIsOpened] = useState(false);

    function handleOpenPopup() {
        setIsOpened(true)
    }

    function handleClosePopup() {
        setIsOpened(false)
    }

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
                        <OpportunitiesBlock openingPopupFunc={handleOpenPopup}/>
                        <AddingPopup isPopupOpen={isOpened} onClose={handleClosePopup}/>
                        <WordsBlock
                            buttonText={typeof newWords === "string" ? "Добавить слово" : "Перейти к повторению"}
                            words={learnedWords} title="Хочешь повторить выученные слова?"
                            openingPopupFunc={handleOpenPopup} linkName="/repeat"
                            buttonClass="words-block__button_pink" wordClass="word-item_pink"/>
                    </div>
            }
            <Footer/>
        </>
    )
}

export default Main;
