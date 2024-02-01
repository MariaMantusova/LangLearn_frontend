import React from "react";
import { useNavigate } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import LoginForm from "../../components/LoginForm/LoginForm";
import {IPropsLoginPage} from "../../interfaces/interfacesForProps";

function LoginPage(props: IPropsLoginPage) {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/register")
    }

    return(
        <AuthPage isAuthorized={props.isAuthorized} title="Войдите, чтобы продолжить обучение"
                  currentUser={props.currentUser} exitUser={props.exitUser} message={props.message}
                  isPopupOpened={props.isPopupOpened} isLoading={props.isLoading} setIsPopupOpened={props.setIsPopupOpened}
                  children={<LoginForm onClick={handleClick} loginSubmit={props.loginSubmit}/>}/>
    )
}

export default LoginPage;
