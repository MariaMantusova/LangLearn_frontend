import React from "react";
import "./AuthPage.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {IAuthPageProps} from "../../interfaces/interfacesForProps";
import AuthInfoPopup from "../AuthInfoPopup/AuthInfoPopup";
import Preloader from "../Preloader/Preloader";

function AuthPage(props: IAuthPageProps) {
    return(
        <>
            <Header path="/learn-new" exitUser={props.exitUser}
                    linkName="Учить слова" isAuthorized={props.isAuthorized} currentUser={props.currentUser}/>
            <section className="auth-page">
                {
                    props.isLoading ? <Preloader/> :
                        <>
                            <h1 className="auth-page__title">{props.title}</h1>
                            {props.children}
                        </>
                }
            </section>
            <AuthInfoPopup isPopupOpened={props.isPopupOpened} message={props.message}
                           setIsPopupOpened={props.setIsPopupOpened}/>
            <Footer/>
        </>
    )
}

export default AuthPage;
