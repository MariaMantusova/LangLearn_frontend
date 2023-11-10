import React from "react";
import { useNavigate } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import LoginForm from "../LoginForm/LoginForm";


function LoginPage() {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/register")
    }

    return(
        <AuthPage title="Войдите, чтобы продолжить обучение" children={<LoginForm onClick={handleClick}/>}/>
    )
}

export default LoginPage;
