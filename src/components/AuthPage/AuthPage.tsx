import React from "react";
import "./AuthPage.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {IAuthPageProps} from "../../interfaces/interfacesForProps";

function AuthPage(props: IAuthPageProps) {
    return(
        <>
            <Header path="/learn-new" linkName="Учить слова" isAuthorized={props.isAuthorized}/>
            <section className="auth-page">
                <h1 className="auth-page__title">{props.title}</h1>
                {props.children}
            </section>
            <Footer/>
        </>
    )
}

export default AuthPage;
