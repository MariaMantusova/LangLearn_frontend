import React from "react";
import AuthPage from "../AuthPage/AuthPage";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useNavigate } from "react-router-dom";
import {IPropsRegisterPage} from "../../interfaces/interfacesForProps";

function RegisterPage(props: IPropsRegisterPage) {
    const navigate = useNavigate();

    function handleClick() {
       navigate("/login")
    }

    return(
        <AuthPage isAuthorized={props.isAuthorized} message={props.message} isPopupOpened={props.isPopupOpened}
                  title="Зарегистрируйтесь, чтобы начать" currentUser={props.currentUser}
                  exitUser={props.exitUser} isLoading={props.isLoading} setIsPopupOpened={props.setIsPopupOpened}
                  children={<RegisterForm onClick={handleClick} registerSubmit={props.registerSubmit}/>}/>
    )
}

export default RegisterPage;
