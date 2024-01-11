import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router";
import Main from "../Main/Main";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import LearningPage from "../../pages/LearningPage/LearningPage";
import WordsPage from "../../pages/WordsPage/WordsPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import {Link, useNavigate} from "react-router-dom";
import {findLearnedWords, findNewWords} from "../../utils/functions";
import {wordsArray} from "../../data";
import {CurrentUserContext} from "../../contexts/CurrentUserContext"
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";
import {mainApi} from "../../utils/MainApi";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

function App() {
    const navigate = useNavigate();

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [authMessage, setAuthMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthPopupOpened, setIsAuthOpened] = useState(false);

    const learnedWords = findLearnedWords(wordsArray);
    const newWords = findNewWords(wordsArray);

    useEffect(() => {
        tokenCheck();
    }, [])

    function tokenCheck() {
        const jwt = localStorage.getItem("token");

        if (jwt) {
            mainApi.validityCheck(jwt)
                .then((user) => {
                    if (user) {
                        handleAuthorized(user.name)
                    }
                })
                .catch((err) => console.log(err))
        }
    }

    function registerUser(name: string, email: string, password: string) {
        setIsLoading(true);
        mainApi.registerUser(name, email, password)
            .then((user) => {
                if (user && !user.statusCode) {
                    localStorage.setItem("token", user.token)
                    handleAuthorized(user.userName)
                } else {
                    setAuthMessage(user.message);
                    setIsAuthOpened(true);
                }
            })
            .catch((err) => {
                setAuthMessage(err.message);
                setIsAuthOpened(true);
            })
            .finally(() => setIsLoading(false))
    }

    function loginUser(email: string, password: string) {
        setIsLoading(true);
        mainApi.loginUser(email, password)
            .then((user) => {
                if (!user) {
                    setAuthMessage("Неправильный логин и(или) пароль")
                    setIsAuthOpened(true);
                } else if (user && !user.statusCode) {
                    localStorage.setItem("token", user.token)
                    handleAuthorized(user.userName)
                } else {
                    setAuthMessage(user.message);
                    setIsAuthOpened(true);
                }
            })
            .catch((err) => {
                setAuthMessage(err.message);
                setIsAuthOpened(true);
            })
            .finally(() => setIsLoading(false))
    }

    function exitUser() {
        localStorage.removeItem("token");
        setIsAuthorized(false)
    }

    function handleAuthorized(userName: string) {
        setCurrentUser(userName)
        setIsAuthorized(true);
        navigate("/profile")
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Routes>
                <Route path="/" element={<Main isAuthorized={isAuthorized} currentUser={currentUser}
                                               exitUser={exitUser} registerFunction={registerUser}
                                               loginFunction={loginUser} isPopupOpened={isAuthPopupOpened}
                                               message={authMessage} learnedWords={learnedWords} newWords={newWords}
                                               isLoading={isLoading} setIsPopupOpened={setIsAuthOpened}/>}/>
                <Route path="/profile" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<ProfilePage learnedWords={learnedWords} newWords={newWords}
                                                           exitUser={exitUser}
                                                           isAuthorized={isAuthorized} currentUser={currentUser}/>}
                    />
                }/>
                <Route path="/learn-all" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<LearningPage words={wordsArray} isAuthorized={isAuthorized}
                                                            currentUser={currentUser} exitUser={exitUser}/>}/>
                }/>
                <Route path="/learn-new" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<LearningPage words={newWords} isAuthorized={isAuthorized}
                                                            currentUser={currentUser} exitUser={exitUser}/>}/>
                }/>
                <Route path="/repeat" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<LearningPage words={learnedWords} isAuthorized={isAuthorized}
                                                            currentUser={currentUser} exitUser={exitUser}/>}/>
                }/>
                <Route path="/words-all" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<WordsPage buttonText="Начать" wordsType="все" linkName="/learn-all"
                                                         isAuthorized={isAuthorized} words={wordsArray}
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
                        isLoading={isLoading} setIsPopupOpened={setIsAuthOpened}
                    />}/>
                }/>
                <Route path="/register" element={
                    <ProtectedRoute isAuthorized={!isAuthorized} navigateLink="/profile" children={<RegisterPage
                        isAuthorized={isAuthorized} registerSubmit={registerUser} currentUser={currentUser}
                        exitUser={exitUser} isPopupOpened={isAuthPopupOpened} message={authMessage}
                        isLoading={isLoading} setIsPopupOpened={setIsAuthOpened}
                    />}/>
                }/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </CurrentUserContext.Provider>
    );
}

export default App;
