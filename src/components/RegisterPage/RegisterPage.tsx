import React from "react";
import AuthPage from "../AuthPage/AuthPage";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const navigate = useNavigate();

    function handleClick() {
       navigate("/login")
    }

    return(
        <AuthPage title="Зарегистрируйтесь, чтобы начать" children={<RegisterForm onClick={handleClick}/>}/>
    )
}

export default RegisterPage;
