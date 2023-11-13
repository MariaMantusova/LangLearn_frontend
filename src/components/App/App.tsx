import React from 'react';
import './App.scss';
import {Route, Routes} from "react-router";
import Main from "../Main/Main";
import ProfilePage from "../ProfilePage/ProfilePage";
import LearningPage from "../LearningPage/LearningPage";
import WordsPage from "../WordsPage/WordsPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/learn" element={<LearningPage/>}/>
      <Route path="/words-all" element={<WordsPage/>}/>
      <Route path="/words-new" element={<WordsPage/>}/>
      <Route path="/words-learned" element={<WordsPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
    </Routes>
  );
}

export default App;
