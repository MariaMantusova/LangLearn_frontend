import React from "react";
import "./Main.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import About from "../About/About";
import WhyWe from "../WhyWe/WhyWe";
import Start from "../Start/Start";

function Main() {
    return(
        <>
            <Header path="/learn" linkName="Учить слова"/>
            <About/>
            <WhyWe/>
            <Start/>
            <Footer/>
        </>
    )
}

export default Main;
