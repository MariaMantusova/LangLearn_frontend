import React from "react";
import {useInput} from "../../hooks/ValidationHook/ValidationHook";
import AuthForm from "../AuthForm/AuthForm";
import {ILoginFormProps} from "../../interfaces/interfacesForProps";

function LoginForm(props: ILoginFormProps) {
    const email = useInput('', {isEmpty: true, isEmail: true, minLength: 2});
    const password = useInput('', {isEmpty: true, minLength: 8});

    function handleLoginSubmit(evt: any) {
        evt.preventDefault()
        props.loginSubmit(email.value, password.value)
    }

    return(
       <AuthForm buttonText="Войти" linkText="Еще нет аккаунта? Зарегистрироваться" password={password}
                 email={email}
                 onClick={props.onClick} handleSubmit={handleLoginSubmit} />
    )
}

export default LoginForm;
