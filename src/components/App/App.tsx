import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router";
import Main from "../Main/Main";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import LearningPage from "../../pages/LearningPage/LearningPage";
import WordsPage from "../../pages/WordsPage/WordsPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import {Link, useNavigate} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext"
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";
import {authApi} from "../../utils/AuthApi";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import {wordsApi} from "../../utils/WordsApi";
import {IWord} from "../../interfaces/mainInterfaces";

function App() {
    const navigate = useNavigate();

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [authMessage, setAuthMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthPopupOpened, setIsAuthPopupOpened] = useState(false);
    const [learnedWords, setLearnedWords] = useState<IWord[]>([]);
    const [newWords, setNewWords] = useState<IWord[]>([]);
    const [isAddingPopupOpened, setIsAddingPopupOpened] = useState(false);
    const [allWords, setAllWords] = useState<IWord[]>([]);

    useEffect(() => {
        tokenCheck();
    }, [])

    useEffect(() => {
        if (isAuthorized) {
            getCards("all");
            getCards("new");
            getCards("learned");
        }
    }, [isAuthorized])

    function tokenCheck() {
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
        const allCardsWithoutChanges = allWords.filter((card) => card._id !== wordCard._id);
        let partCardsWithoutChanges: IWord[] = []
        wordCard.isLearned ?
            partCardsWithoutChanges = learnedWords.filter((card) => card._id !== wordCard._id) :
            partCardsWithoutChanges = newWords.filter((card) => card._id !== wordCard._id)

        wordsApi.cardWordChange(wordCard._id, word)
            .then((card) => {
                setAllWords([card, ...allCardsWithoutChanges]);
                card.isLearned ?
                    setLearnedWords([card, ...partCardsWithoutChanges]) :
                    setNewWords([card, ...partCardsWithoutChanges])
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
                <Route path="/" element={<Main isAuthorized={isAuthorized} currentUser={currentUser}
                                               exitUser={exitUser} registerFunction={registerUser}
                                               loginFunction={loginUser} isPopupOpened={isAuthPopupOpened}
                                               message={authMessage} learnedWords={learnedWords} newWords={newWords}
                                               isLoading={isLoading} setIsPopupOpened={setIsAuthPopupOpened}
                                               handlePopupClose={handleAddingPopupClosed}
                                               handlePopupOpen={handleAddingPopupOpened}
                                               handleWordAdding={addNewWord}
                                               isAddingPopupOpened={isAddingPopupOpened}/>}/>
                <Route path="/profile" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<ProfilePage learnedWords={learnedWords} newWords={newWords}
                                                           exitUser={exitUser}
                                                           handlePopupClose={handleAddingPopupClosed}
                                                           handlePopupOpen={handleAddingPopupOpened}
                                                           handleWordAdding={addNewWord}
                                                           isAddingPopupOpened={isAddingPopupOpened}
                                                           isAuthorized={isAuthorized} currentUser={currentUser}/>}
                    />
                }/>
                <Route path="/learn-all" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<LearningPage words={allWords} isAuthorized={isAuthorized}
                                                            onSubmit={changeWordCard}
                                                            currentUser={currentUser} exitUser={exitUser}/>}/>
                }/>
                <Route path="/learn-new" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<LearningPage words={newWords} isAuthorized={isAuthorized}
                                                            onSubmit={changeWordCard}
                                                            currentUser={currentUser} exitUser={exitUser}/>}/>
                }/>
                <Route path="/repeat" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<LearningPage words={learnedWords} isAuthorized={isAuthorized}
                                                            onSubmit={changeWordCard}
                                                            currentUser={currentUser} exitUser={exitUser}/>}/>
                }/>
                <Route path="/words-all" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<WordsPage buttonText="Начать" wordsType="все" linkName="/learn-all"
                                                         isAuthorized={isAuthorized} words={allWords}
                                                         currentUser={currentUser} exitUser={exitUser}/>}/>
                }/>
                <Route path="/words-new" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="login"
                                    children={<WordsPage buttonText="Изучение" wordsType="новые" words={newWords}
                                                         linkName="/learn-new" currentUser={currentUser}
                                                         exitUser={exitUser}
                                                         isAuthorized={isAuthorized} children={
                                        <Link className="words-page__link" to="/words-learned">
                                            Перейти к выученным словам &#8594;
                                        </Link>
                                    }/>}/>
                }/>
                <Route path="/words-learned" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<WordsPage buttonText="Повторение" wordsType="выученные"
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
                    <ProtectedRoute isAuthorized={!isAuthorized} navigateLink="/profile" children={<LoginPage
                        isAuthorized={isAuthorized} loginSubmit={loginUser} currentUser={currentUser}
                        exitUser={exitUser} isPopupOpened={isAuthPopupOpened} message={authMessage}
                        isLoading={isLoading} setIsPopupOpened={setIsAuthPopupOpened}
                    />}/>
                }/>
                <Route path="/register" element={
                    <ProtectedRoute isAuthorized={!isAuthorized} navigateLink="/profile" children={<RegisterPage
                        isAuthorized={isAuthorized} registerSubmit={registerUser} currentUser={currentUser}
                        exitUser={exitUser} isPopupOpened={isAuthPopupOpened} message={authMessage}
                        isLoading={isLoading} setIsPopupOpened={setIsAuthPopupOpened}
                    />}/>
                }/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </CurrentUserContext.Provider>
    );
}

export default App;
