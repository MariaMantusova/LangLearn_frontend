import React from "react";
import "./AuthForm.scss";
import FormButton from "../FormButton/FormButton";
import {IAuthFormProps} from "../../interfaces/interfacesForProps";
import {useInput} from "../../hooks/ValidationHook/ValidationHook";

function AuthForm(props: IAuthFormProps) {
    const email = useInput('', {isEmpty: true, isEmail: true, minLength: 2});
    const password = useInput('', {isEmpty: true, minLength: 8});

    return (
        <form className="auth-form">
            {props.children}
            <div className="input__container">
                <input className="auth-form__input" placeholder="E-mail" type="email" required onBlur={email.onBlur}
                       pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" onChange={email.onChange}/>
                {(email.isDirty && email.isEmpty) && <p className="auth__input-error">Поле не может быть пустым</p>}
                {(email.isDirty && email.emailError && !email.isEmpty) &&
                <p className="auth__input-error">Введен некорректный email</p>}
            </div>
            <div className="input__container">
                <input className="auth-form__input" placeholder="Пароль" min="8" type="password"
                       onBlur={password.onBlur}
                       onChange={password.onChange} required/>
                {(password.isDirty && password.isEmpty) &&
                <p className="auth__input-error">Поле не может быть пустым</p>}
                {(password.isDirty && password.minLengthError && !password.isEmpty) &&
                <p className="auth__input-error">Пароль не может быть меньше 8 символов</p>}
            </div>
            <FormButton buttonText={props.buttonText} nameValidity={props.nameValidity} emailValidity={email}
                        passwordValidity={password} linkText={props.linkText} onClick={props.onClick}/>
        </form>
    )
}

export default AuthForm;
