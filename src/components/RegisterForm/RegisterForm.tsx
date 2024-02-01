import React from "react";
import {useInput} from "../../hooks/ValidationHook/ValidationHook";
import AuthForm from "../AuthForm/AuthForm";
import {IRegisterFormProps} from "../../interfaces/interfacesForProps";

function RegisterForm(props: IRegisterFormProps) {
    const name = useInput('', {isEmpty: true, isName: true, minLength: 2});
    const email = useInput('', {isEmpty: true, isEmail: true, minLength: 2});
    const password = useInput('', {isEmpty: true, minLength: 8});

    function handleRegisterSubmit(evt: any) {
        evt.preventDefault();
        props.registerSubmit(name.value, email.value, password.value)
    }

    return (
        <AuthForm buttonText="Зарегистрироваться" name={name} handleSubmit={handleRegisterSubmit}
                  linkText="Уже зарегистрированы? Войти" onClick={props.onClick} password={password}
                  email={email}
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
