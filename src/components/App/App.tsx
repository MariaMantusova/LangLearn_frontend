import React from 'react';
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

function App() {
    const learnedWords = findLearnedWords(wordsArray);
    const newWords = findNewWords(wordsArray);

    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/profile" element={<ProfilePage learnedWords={learnedWords} newWords={newWords}/>}/>
            <Route path="/learn" element={<LearningPage words={wordsArray}/>}/>
            <Route path="/words-all" element={<WordsPage buttonText="Начать" wordsType="все" words={wordsArray}/>}/>
            <Route path="/words-new" element={<WordsPage buttonText="Изучение" wordsType="новые" words={newWords}
                                                         children={
                                                             <Link className="words-page__link" to="/words-learned">Перейти
                                                                 к выученным словам &#8594;
                                                             </Link>
                                                         }/>}/>
            <Route path="/words-learned" element={<WordsPage buttonText="Повторение" wordsType="выученные" words={learnedWords}
                                                             children={
                                                                 <Link className="words-page__link" to="/words-new">Перейти
                                                                     к новым словам &#8594;
                                                                 </Link>
                                                             }/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
        </Routes>
    );
}

export default App;
