import React from "react";
import {Link} from "react-router-dom";
import "./Header.scss";
import Logo from "../../images/logo.svg";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import {IHeaderProps} from "../../interfaces/interfacesForProps";

function Header(props: IHeaderProps) {
    return (
        <header className="header">
            <Link to="/">
                <img className="header__logo" src={Logo} alt="Лого"/>
            </Link>
            {
                props.isAuthorized ? <ProfileMenu linkName={props.linkName} path={props.path}
                                                  currentUser={props.currentUser} exitUser={props.exitUser}/> :
                    <div className="header__container">
                        <Link to="/login" className="header__link-login">Войти</Link>
                        <Link to="/register" className="header__link-register">Зарегистрироваться</Link>
                    </div>
            }
        </header>
    )
}

export default Header;
