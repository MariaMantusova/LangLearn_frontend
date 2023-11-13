import React, {useState} from "react";
import "./ProfilePage.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import WordsBlock from "../WordsBlock/WordsBlock";
import OpportunitiesBlock from "../OpportunitiesBlock/OpportunitiesBlock";
import AddingPopup from "../AddingPopup/AddingPopup";

function ProfilePage() {
    const learnedWords: string[] = ["humiliation", "confident", "hostile"]
    const newWords: string[] = ["leftovers", "tangerine", "tremendously"]

    const [isOpened, setIsOpened] = useState(false);

    function handleOpenPopup() {
        setIsOpened(true)
    }

    function handleClosePopup() {
        setIsOpened(false)
    }

    return(
        <>
            <Header path="/learn" linkName="Учить слова"/>
            <section className="profile-page">
                <h1 className="profile-page__title">Привет, Мария!</h1>
                <WordsBlock buttonText="Перейти к повторению" words={learnedWords}
                            title="Хочешь повторить выученные слова?"
                            buttonClass="words-block__button_pink" wordClass="word-item_pink"/>
                <OpportunitiesBlock openingPopupFunc={handleOpenPopup}/>
                <AddingPopup isPopupOpen={isOpened} onClose={handleClosePopup}/>
                <WordsBlock buttonText="Перейти к изучению" words={newWords} title="Начнем учить что-то новое?"
                            buttonClass="words-block__button_blue" wordClass="word-item_blue"/>
            </section>
            <Footer/>
        </>
    )
}

export default ProfilePage;
