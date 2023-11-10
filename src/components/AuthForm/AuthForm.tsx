import React from "react";
import "./AuthForm.scss";
import FormButton from "../FormButton/FormButton";
import {IAuthFormProps} from "../../interfaces/interfacesForProps";

function AuthForm(props: IAuthFormProps) {
    return(
        <form className="auth-form">
            {props.children}
            <input className="auth-form__input" placeholder="E-mail" type="email" required
                   pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"/>
            <input className="auth-form__input" placeholder="Пароль" min="8" type="password" required/>
            <FormButton buttonText={props.buttonText} linkText={props.linkText} onClick={props.onClick}/>
        </form>
    )
}

export default AuthForm;
