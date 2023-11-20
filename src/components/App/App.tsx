import React, {useState} from 'react';
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

function App() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const learnedWords = findLearnedWords(wordsArray);
    const newWords = findNewWords(wordsArray);
    const currentUser = {}

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/profile" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<ProfilePage learnedWords={learnedWords} newWords={newWords}/>}
                    />
                }/>
                <Route path="/learn-all" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<LearningPage words={wordsArray}/>}/>
                }/>
                <Route path="/learn-new" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<LearningPage words={newWords}/>}/>
                }/>
                <Route path="/repeat" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<LearningPage words={learnedWords}/>}/>
                }/>
                <Route path="/words-all" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<WordsPage buttonText="Начать" wordsType="все" words={wordsArray}/>}/>
                }/>
                <Route path="/words-new" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="login"
                                    children={<WordsPage buttonText="Изучение" wordsType="новые" words={newWords}
                                                         children={
                                                             <Link className="words-page__link" to="/words-learned">
                                                                 Перейти к выученным словам &#8594;
                                                             </Link>
                                                         }/>}/>
                }/>
                <Route path="/words-learned" element={
                    <ProtectedRoute isAuthorized={isAuthorized} navigateLink="/login"
                                    children={<WordsPage buttonText="Повторение" wordsType="выученные"
                                                         words={learnedWords}
                                                         children={
                                                             <Link className="words-page__link" to="/words-new">
                                                                 Перейти к новым словам &#8594;
                                                             </Link>
                                                         }/>}/>
                }/>
                <Route path="/login" element={
                    <ProtectedRoute isAuthorized={!isAuthorized} navigateLink="/profile" children={<LoginPage/>}/>
                }/>
                <Route path="/register" element={
                    <ProtectedRoute isAuthorized={!isAuthorized} navigateLink="/profile" children={<RegisterPage/>}/>
                }/>
            </Routes>
        </CurrentUserContext.Provider>
    );
}

export default App;
