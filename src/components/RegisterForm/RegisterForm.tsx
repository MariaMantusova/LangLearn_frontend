import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import {IRegisterFormProps} from "../../interfaces/interfacesForProps";

function RegisterForm(props: IRegisterFormProps) {
    return(
        <AuthForm buttonText="Зарегистрироваться" linkText="Уже зарегистрированы? Войти" onClick={props.onClick}
                  children={<input className="auth-form__input" placeholder="Имя"
                                   pattern="^[А-Яа-яЁёA-Za-z\-]+$" type="text" required/>}
        />
    )
}

export default RegisterForm;
