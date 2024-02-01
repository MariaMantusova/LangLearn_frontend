import React, {useState} from "react";
import "./AuthBlock.scss";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import Preloader from "../Preloader/Preloader";
import {IPropsAuthBlock} from "../../interfaces/interfacesForProps";

function AuthBlock(props: IPropsAuthBlock) {
    const [formType, setFormType] = useState("register");

    const registerTitle: string = "Зарегистрируйтесь, чтобы начать";
    const loginTitle: string = "Войдите в свой аккаунт, чтобы продолжить";

    function handleSetRegister() {
        setFormType("register");
    }

    function handleSetLogin() {
        setFormType("login");
    }

    return (
        <section className="auth-block">
            {props.isLoading ? <Preloader/> :
                <>
                    <h2 className="auth-block__title">
                        {formType == "register" && registerTitle}
                        {formType == "login" && loginTitle}
                    </h2>
                    {formType == "register" && <RegisterForm onClick={handleSetLogin}
                                                             registerSubmit={props.registerFunction}/>}
                    {formType == "login" && <LoginForm onClick={handleSetRegister} loginSubmit={props.loginFunction}/>}
                </>
            }
        </section>
    )
}

export default AuthBlock;
