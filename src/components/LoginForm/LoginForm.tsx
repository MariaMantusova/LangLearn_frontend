import React from "react";
import "./LoginForm.scss";
import AuthForm from "../AuthForm/AuthForm";
import {ILoginFormProps} from "../../interfaces/interfacesForProps";

function LoginForm(props: ILoginFormProps) {
    return(
       <AuthForm buttonText="Войти" linkText="Еще нет аккаунта? Зарегистрироваться" onClick={props.onClick}/>
    )
}

export default LoginForm;
