import React from "react";
import "./AuthForm.scss";
import FormButton from "../FormButton/FormButton";
import {IAuthFormProps} from "../../interfaces/interfacesForProps";

function AuthForm(props: IAuthFormProps) {
    return (
        <form className="auth-form" onSubmit={props.handleSubmit}>
            {props.children}
            <div className="input__container">
                <input className="auth-form__input" placeholder="E-mail" type="email" required onBlur={props.email.onBlur}
                       pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" onChange={props.email.onChange}/>
                {(props.email.isDirty && props.email.isEmpty) && <p className="auth__input-error">Поле не может быть пустым</p>}
                {(props.email.isDirty && props.email.emailError && !props.email.isEmpty) &&
                <p className="auth__input-error">Введен некорректный email</p>}
            </div>
            <div className="input__container">
                <input className="auth-form__input" placeholder="Пароль" min="8" type="password"
                       onBlur={props.password.onBlur}
                       onChange={props.password.onChange} required/>
                {(props.password.isDirty && props.password.isEmpty) &&
                <p className="auth__input-error">Поле не может быть пустым</p>}
                {(props.password.isDirty && props.password.minLengthError && !props.password.isEmpty) &&
                <p className="auth__input-error">Пароль не может быть меньше 8 символов</p>}
            </div>
            <FormButton buttonText={props.buttonText} nameValidity={props.name} emailValidity={props.email}
                        passwordValidity={props.password} linkText={props.linkText} onClick={props.onClick}/>
        </form>
    )
}

export default AuthForm;
