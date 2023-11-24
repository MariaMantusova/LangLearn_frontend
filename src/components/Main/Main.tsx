import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import About from "../About/About";
import WhyWe from "../WhyWe/WhyWe";
import Start from "../Start/Start";
import AuthBlock from "../AuthBlock/AuthBlock";
import {IPropsMain} from "../../interfaces/interfacesForProps";

function Main(props: IPropsMain) {
    return(
        <>
            <Header path="/learn-new" linkName="Учить слова" isAuthorized={props.isAuthorized}
                    userName={props.userName}/>
            <About/>
            <WhyWe/>
            <AuthBlock loginFunction={props.loginFunction} registerFunction={props.registerFunction} />
            <Start/>
            <Footer/>
        </>
    )
}

export default Main;
