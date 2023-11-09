import React from "react";
import "./Main.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import About from "../About/About";

function Main() {
    return(
        <>
            <Header path="/learn" linkName="Учить слова"/>
            <About/>
            <Footer/>
        </>
    )
}

export default Main;
