import React from "react";
import { useNavigate } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
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
