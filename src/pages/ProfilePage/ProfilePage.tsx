import React, {useState} from "react";
import "./ProfilePage.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import WordsBlock from "../../components/WordsBlock/WordsBlock";
import OpportunitiesBlock from "../../components/OpportunitiesBlock/OpportunitiesBlock";
import AddingPopup from "../../components/AddingPopup/AddingPopup";
import {IProfilePageProps} from "../../interfaces/interfacesForProps";
import {getThreeRandomWords} from "../../utils/functions";

function ProfilePage(props: IProfilePageProps) {
    const currentUserName: string = props.currentUser.charAt(0).toUpperCase() + props.currentUser.slice(1)

    const learnedWords: string[] | string = getThreeRandomWords(props.learnedWords)
    const newWords: string[] | string = getThreeRandomWords(props.newWords)

    const [isOpened, setIsOpened] = useState(false);

    function handleOpenPopup() {
        setIsOpened(true)
    }

    function handleClosePopup() {
        setIsOpened(false)
    }

    return(
        <>
            <Header path="/learn-new" linkName="Учить слова" isAuthorized={props.isAuthorized}
                    currentUser={props.currentUser} exitUser={props.exitUser}/>
            <section className="profile-page">
                <h1 className="profile-page__title">Привет, {currentUserName}!</h1>
                <WordsBlock buttonText={typeof newWords === "string" ? "Добавить слово" : "Перейти к повторению"}
                            words={learnedWords} title="Хочешь повторить выученные слова?"
                            openingPopupFunc={handleOpenPopup} linkName="/repeat"
                            buttonClass="words-block__button_pink" wordClass="word-item_pink"/>
                <OpportunitiesBlock openingPopupFunc={handleOpenPopup}/>
                <AddingPopup isPopupOpen={isOpened} onClose={handleClosePopup}/>
                <WordsBlock buttonText={typeof newWords === "string" ? "Добавить слово" : "Перейти к изучению"}
                            words={newWords} title="Начнем учить что-то новое?" openingPopupFunc={handleOpenPopup}
                            buttonClass="words-block__button_blue" wordClass="word-item_blue" linkName="/learn-new"/>
            </section>
            <Footer/>
        </>
    )
}

export default ProfilePage;