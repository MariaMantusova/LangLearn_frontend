import React from 'react';
import './App.scss';
import {Route, Routes} from "react-router";
import Main from "../Main/Main";
import ProfilePage from "../ProfilePage/ProfilePage";
import LearningPage from "../LearningPage/LearningPage";
import WordsPage from "../WordsPage/WordsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/learn" element={<LearningPage/>}/>
      <Route path="/words" element={<WordsPage/>}/>
    </Routes>
  );
}

export default App;
