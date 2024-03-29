import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation} from "react-router";
import {Link, useNavigate} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {authApi} from "../../utils/AuthApi";
import {wordsApi} from "../../utils/WordsApi";
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import LearningPage from "../../pages/LearningPage/LearningPage";
import WordsPage from "../../pages/WordsPage/WordsPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import Preloader from "../Preloader/Preloader";
import Main from "../Main/Main";
import {IWord} from "../../interfaces/mainInterfaces";

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [authMessage, setAuthMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthPopupOpened, setIsAuthPopupOpened] = useState(false);
    const [learnedWords, setLearnedWords] = useState<IWord[]>([]);
    const [newWords, setNewWords] = useState<IWord[]>([]);
    const [isAddingPopupOpened, setIsAddingPopupOpened] = useState(false);
    const [allWords, setAllWords] = useState<IWord[]>([]);
    const [afterReload, setAfterReload] = useState("");
    const [wordsAreLoaded, setWordsAreLoaded] = useState(false);

    useEffect(() => {
        tokenCheck();
        setAfterReload(location.pathname || "/profile");
    }, [])

    useEffect(() => {
        if (isAuthorized) {
            getCards("all");
            getCards("new");
            getCards("learned");
        }
    }, [isAuthorized])

    function tokenCheck() {
        setIsPageLoading(true);
        const jwt = localStorage.getItem("token");
        if (jwt) {
            authApi.validityCheck(jwt)
                .then((user) => {
                    if (user) {
                        setCurrentUser(user.name);
                        setIsAuthorized(true);
                    }
                })
                .catch((err) => console.log(err))
                .finally(() => setIsPageLoading(false))
        } else {
            setIsPageLoading(false)
        }
    }

    function getCards(type: string) {
        wordsApi.getCardsByType(type)
            .then((cards) => {
                switch (type) {
                    case "all":
                        setAllWords(cards);
                        break;
                    case "learned":
                        setLearnedWords(cards);
                        break;
                    case "new":
                        setNewWords(cards);
                        break;
                }
            })
            .catch((err) => console.log(err))
            .finally(() => setWordsAreLoaded(true))
    }

    function registerUser(name: string, email: string, password: string) {
        setIsLoading(true);
        authApi.registerUser(name, email, password)
            .then((user) => {
                if (user && !user.statusCode) {
                    localStorage.setItem("token", user.token)
                    handleAuthorized(user.userName)
                } else {
                    setAuthMessage(user.message);
                    setIsAuthPopupOpened(true);
                }
            })
            .catch((err) => {
                setAuthMessage(err.message);
                setIsAuthPopupOpened(true);
            })
            .finally(() => setIsLoading(false))
    }

    function loginUser(email: string, password: string) {
        setIsLoading(true);
        authApi.loginUser(email, password)
            .then((user) => {
                if (!user) {
                    setAuthMessage("Неправильный логин и(или) пароль")
                    setIsAuthPopupOpened(true);
                } else if (user && !user.statusCode) {
                    localStorage.setItem("token", user.token)
                    handleAuthorized(user.userName)
                } else {
                    setAuthMessage(user.message);
                    setIsAuthPopupOpened(true);
                }
            })
            .catch((err) => {
                setAuthMessage(err.message);
                setIsAuthPopupOpened(true);
            })
            .finally(() => setIsLoading(false))
    }

    function addNewWord(word: string, translation: string) {
        wordsApi.addCard(word, translation)
            .then((word: IWord) => {
                setAllWords([word, ...allWords])
                setNewWords([word, ...newWords])
                setIsAddingPopupOpened(false)
            })
            .catch((err) => console.log(err))
    }

    function changeWordCard(wordCard: IWord, word: string) {
        wordsApi.cardWordChange(wordCard._id, word)
            .then((card) => {
                setAllWords((state) => state.map((word) => card._id === word._id ? card : word))
                card.isLearned ?
                    setLearnedWords((state) => state.map((word) => card._id === word._id ? card : word)) :
                    setNewWords((state) => state.map((word) => card._id === word._id ? card : word))

            })
            .catch((err) => console.log(err))
    }

    function changeTranslationCard(wordCard: IWord, translation: string) {
        wordsApi.cardTranslationChange(wordCard._id, translation)
            .then((card) => {
                setAllWords((state) => state.map((word) => card._id === word._id ? card : word))
                card.isLearned ?
                    setLearnedWords((state) => state.map((word) => card._id === word._id ? card : word)) :
                    setNewWords((state) => state.map((word) => card._id === word._id ? card : word))
            })
            .catch((err) => console.log(err))
    }

    function deleteCard(cardID: string) {
        wordsApi.cardDelete(cardID)
            .then((card) => {
                card.isLearned ?
                    setLearnedWords(learnedWords.filter((word) => word._id !== cardID)) :
                    setNewWords(newWords.filter((word) => word._id !== cardID))
                setAllWords(allWords.filter((word) => word._id !== cardID))
            })
            .catch((err) => console.log(err))
    }

    function toggleCardLearningStatus(card: IWord) {
        card.isLearned ?
            wordsApi.cardLearned(card._id, false)
                .then((newCard) => {
                    setAllWords((state) => state.map((word) => newCard._id === word._id ? newCard : word))
                    setLearnedWords(learnedWords.filter((word) => word._id !== card._id))
                    setNewWords([newCard, ...newWords])
                })
                .catch((err) => console.log(err)) :
            wordsApi.cardLearned(card._id, true)
                .then((newCard) => {
                    setAllWords((state) => state.map((word) => newCard._id === word._id ? newCard : word))
                    setNewWords(newWords.filter((word) => word._id !== card._id))
                    setLearnedWords([newCard, ...learnedWords])
                })
                .catch((err) => console.log(err))
    }

    function handleAddingPopupOpened() {
        setIsAddingPopupOpened(true)
    }

    function handleAddingPopupClosed() {
        setIsAddingPopupOpened(false)
    }

    function exitUser() {
        localStorage.removeItem("token");
        setIsAuthorized(false)
    }

    function handleAuthorized(userName: string) {
        setCurrentUser(userName);
        setIsAuthorized(true);
        navigate("/profile");
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Routes>
                <Route path="/" element={
                    isPageLoading ? <Preloader/> :
                        <Main isAuthorized={isAuthorized} currentUser={currentUser}
                              exitUser={exitUser} registerFunction={registerUser}
                              loginFunction={loginUser} isPopupOpened={isAuthPopupOpened}
                              message={authMessage} learnedWords={learnedWords}
                              newWords={newWords}
                              wordsAreLoaded={wordsAreLoaded}
                              isLoading={isLoading} setIsPopupOpened={setIsAuthPopupOpened}
                              handlePopupClose={handleAddingPopupClosed}
                              handlePopupOpen={handleAddingPopupOpened}
                              handleWordAdding={addNewWord}
                              isAddingPopupOpened={isAddingPopupOpened}/>}/>
                <Route path="/profile" element={
                    isPageLoading ? <Preloader/> :
                        <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<ProfilePage
                                        learnedWords={learnedWords} newWords={newWords}
                                        exitUser={exitUser} wordsAreLoaded={wordsAreLoaded}
                                        handlePopupClose={handleAddingPopupClosed}
                                        handlePopupOpen={handleAddingPopupOpened}
                                        handleWordAdding={addNewWord}
                                        isAddingPopupOpened={isAddingPopupOpened}
                                        isAuthorized={isAuthorized} currentUser={currentUser}/>}
                        />
                }/>
                <Route path="/learn-all" element={
                    isPageLoading ? <Preloader/> :
                        <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                        children={<LearningPage
                                            words={allWords} isAuthorized={isAuthorized}
                                            onSubmitWord={changeWordCard} onDelete={deleteCard}
                                            onSubmitTranslation={changeTranslationCard}
                                            toggleLearningStatus={toggleCardLearningStatus}
                                            currentUser={currentUser} exitUser={exitUser}
                                            wordsAreLoaded={wordsAreLoaded}/>}/>
                }/>
                <Route path="/learn-new" element={
                    isPageLoading ? <Preloader/> :
                        <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                        children={<LearningPage
                                            words={newWords} isAuthorized={isAuthorized}
                                            onSubmitWord={changeWordCard} onDelete={deleteCard}
                                            toggleLearningStatus={toggleCardLearningStatus}
                                            onSubmitTranslation={changeTranslationCard}
                                            currentUser={currentUser} exitUser={exitUser}
                                            wordsAreLoaded={wordsAreLoaded}/>}/>
                }/>
                <Route path="/repeat" element={
                    isPageLoading ? <Preloader/> :
                        <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                        children={<LearningPage
                                            words={learnedWords} isAuthorized={isAuthorized}
                                            onSubmitWord={changeWordCard} onDelete={deleteCard}
                                            toggleLearningStatus={toggleCardLearningStatus}
                                            onSubmitTranslation={changeTranslationCard}
                                            currentUser={currentUser} exitUser={exitUser}
                                            wordsAreLoaded={wordsAreLoaded}/>}/>
                }/>
                <Route path="/words-all" element={
                    isPageLoading ? <Preloader/> :
                        <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                        children={<WordsPage
                                            buttonText="Начать" wordsType="все"
                                            linkName="/learn-all"
                                            toggleLearningStatus={toggleCardLearningStatus}
                                            onDelete={deleteCard}
                                            wordsAreLoaded={wordsAreLoaded}
                                            onSubmitWord={changeWordCard}
                                            isAuthorized={isAuthorized} words={allWords}
                                            currentUser={currentUser} exitUser={exitUser}/>}/>
                }/>
                <Route path="/words-new" element={
                    isPageLoading ? <Preloader/> :
                        <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                        children={<WordsPage
                                            buttonText="Изучение" wordsType="новые"
                                            words={newWords}
                                            linkName="/learn-new" currentUser={currentUser}
                                            exitUser={exitUser}
                                            wordsAreLoaded={wordsAreLoaded}
                                            toggleLearningStatus={toggleCardLearningStatus}
                                            onDelete={deleteCard}
                                            onSubmitWord={changeWordCard}
                                            isAuthorized={isAuthorized} children={
                                            <Link className="words-page__link" to="/words-learned">
                                                Перейти к выученным словам &#8594;
                                            </Link>
                                        }/>}/>
                }/>
                <Route path="/words-learned" element={
                    isPageLoading ? <Preloader/> :
                        <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                        children={<WordsPage
                                            buttonText="Повторение" wordsType="выученные"
                                            toggleLearningStatus={toggleCardLearningStatus}
                                            onDelete={deleteCard} wordsAreLoaded={wordsAreLoaded}
                                            onSubmitWord={changeWordCard}
                                            exitUser={exitUser}
                                            linkName="/repeat" currentUser={currentUser}
                                            words={learnedWords} isAuthorized={isAuthorized}
                                            children={
                                                <Link className="words-page__link" to="/words-new">
                                                    Перейти к новым словам &#8594;
                                                </Link>
                                            }/>}/>
                }/>
                <Route path="/login" element={
                    isPageLoading ? <Preloader/> :
                        <ProtectedRoute isAuthorized={!isAuthorized}
                                        navigateLink={afterReload || "/profile"}
                                        children={<LoginPage
                                            isAuthorized={isAuthorized} loginSubmit={loginUser}
                                            currentUser={currentUser}
                                            exitUser={exitUser} isPopupOpened={isAuthPopupOpened} message={authMessage}
                                            isLoading={isLoading} setIsPopupOpened={setIsAuthPopupOpened}
                                        />}/>
                }/>
                <Route path="/register" element={
                    isPageLoading ? <Preloader/> :
                        <ProtectedRoute isAuthorized={!isAuthorized} navigateLink={afterReload || "/profile"}
                                        children={<RegisterPage
                                            isAuthorized={isAuthorized} registerSubmit={registerUser}
                                            currentUser={currentUser}
                                            exitUser={exitUser} isPopupOpened={isAuthPopupOpened}
                                            message={authMessage}
                                            isLoading={isLoading} setIsPopupOpened={setIsAuthPopupOpened}
                                        />}/>
                }/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </CurrentUserContext.Provider>
    );
}

export default App;
