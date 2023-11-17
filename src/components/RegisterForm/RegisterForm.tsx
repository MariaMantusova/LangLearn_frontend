import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import {IRegisterFormProps} from "../../interfaces/interfacesForProps";
import {useInput} from "../../hooks/ValidationHook/ValidationHook";

function RegisterForm(props: IRegisterFormProps) {
    const name = useInput('', {isEmpty: true, isName: true, minLength: 2});

    return (
        <AuthForm buttonText="Зарегистрироваться" nameValidity={name}
                  linkText="Уже зарегистрированы? Войти" onClick={props.onClick}
                  children={
                      <div className="input__container">
                          <input className="auth-form__input" placeholder="Имя" onChange={name.onChange}
                                 onBlur={name.onBlur} pattern="^[А-Яа-яЁёA-Za-z\-]+$" type="text" required/>
                          {(name.isDirty && name.isEmpty) &&
                          <p className="auth__input-error">Поле не может быть пустым</p>}
                          {(name.isDirty && name.nameError && !name.isEmpty) &&
                          <p className="auth__input-error">Данное имя нельзя использовать</p>}
                      </div>
                  }/>
    )
}

export default RegisterForm;
