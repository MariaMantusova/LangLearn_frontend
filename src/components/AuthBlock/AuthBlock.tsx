import React, {useState} from "react";
import "./AuthBlock.scss";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";

function AuthBlock() {
    const [formType, setFormType] = useState("register");

    const registerTitle: string = "Зарегистрируйтесь, чтобы начать";
    const loginTitle: string = "Войдите в свой аккаунт, чтобы продолжить";

    function handleSetRegister() {
        setFormType("register");
    }

    function handleSetLogin() {
        setFormType("login");
    }

    return(
        <section className="auth-block">
            <h2 className="auth-block__title">
                {formType == "register" && registerTitle}
                {formType == "login" && loginTitle}
            </h2>
            {formType == "register" && <RegisterForm onClick={handleSetLogin}/>}
            {formType == "login" && <LoginForm onClick={handleSetRegister}/>}
        </section>
    )
}

export default AuthBlock;
