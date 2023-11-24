import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router";
import Main from "../Main/Main";
import ProfilePage from "../ProfilePage/ProfilePage";
import LearningPage from "../LearningPage/LearningPage";
import WordsPage from "../WordsPage/WordsPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import {Link} from "react-router-dom";
import {findLearnedWords, findNewWords} from "../../utils/functions";
import {wordsArray} from "../../data";
import {CurrentUserContext} from "../../contexts/CurrentUserContext"
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";
import {mainApi} from "../../utils/MainApi";

function App() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const learnedWords = findLearnedWords(wordsArray);
    const newWords = findNewWords(wordsArray);

    function registerUser(name: string, email: string, password: string) {
        mainApi.registerUser(name, email, password)
            .then((message) => {
                console.log(message)
            })
            .catch((err) => console.log(err))
    }

    function loginUser(email: string, password: string) {
        mainApi.loginUser(email, password)
            .then((message) => {
                console.log(message)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {

    }, [])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute isAuthorized={!isAuthorized} navigateLink="/profile"
                                    children={
                                        <Main isAuthorized={isAuthorized} loginFunction={loginUser}
                                              registerFunction={registerUser}/>}/>
                }
                />
                <Route path="/profile" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<ProfilePage learnedWords={learnedWords} newWords={newWords}
                                                           isAuthorized={isAuthorized}/>}
                    />
                }/>
                <Route path="/learn-all" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<LearningPage words={wordsArray} isAuthorized={isAuthorized}/>}/>
                }/>
                <Route path="/learn-new" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<LearningPage words={newWords} isAuthorized={isAuthorized}/>}/>
                }/>
                <Route path="/repeat" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<LearningPage words={learnedWords} isAuthorized={isAuthorized}/>}/>
                }/>
                <Route path="/words-all" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<WordsPage buttonText="Начать" wordsType="все" linkName="/learn-all"
                                                         isAuthorized={isAuthorized} words={wordsArray}/>}/>
                }/>
                <Route path="/words-new" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="login"
                                    children={<WordsPage buttonText="Изучение" wordsType="новые" words={newWords}
                                                         linkName="/learn-new"
                                                         isAuthorized={isAuthorized} children={
                                                             <Link className="words-page__link" to="/words-learned">
                                                                 Перейти к выученным словам &#8594;
                                                             </Link>
                                                         }/>}/>
                }/>
                <Route path="/words-learned" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<WordsPage buttonText="Повторение" wordsType="выученные"
                                                         linkName="/repeat"
                                                         words={learnedWords} isAuthorized={isAuthorized}
                                                         children={
                                                             <Link className="words-page__link" to="/words-new">
                                                                 Перейти к новым словам &#8594;
                                                             </Link>
                                                         }/>}/>
                }/>
                <Route path="/login" element={
                    <ProtectedRoute isAuthorized={!isAuthorized} navigateLink="/profile" children={<LoginPage
                        isAuthorized={isAuthorized} loginSubmit={loginUser}
                    />}/>
                }/>
                <Route path="/register" element={
                    <ProtectedRoute isAuthorized={!isAuthorized} navigateLink="/profile" children={<RegisterPage
                        isAuthorized={isAuthorized} registerSubmit={registerUser}
                    />}/>
                }/>
            </Routes>
        </CurrentUserContext.Provider>
    );
}

export default App;
