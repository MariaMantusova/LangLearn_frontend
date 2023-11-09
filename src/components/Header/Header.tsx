import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./Header.scss";
import Logo from "../../images/logo.svg";
import {IHeaderProps} from "../../interfaces/interfacesForProps";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

function Header(props: IHeaderProps) {
    const [isAuthorized, setIsAuthorized] = useState(false);

    return (
        <header className="header">
            <img className="header__logo" src={Logo} alt="Лого"/>
            {
                isAuthorized ? <ProfileMenu linkName={props.linkName} path={props.path}/> :
                    <div className="header__container">
                        <Link to="/login" className="header__link-login">Войти</Link>
                        <Link to="/register" className="header__link-register">Зарегистрироваться</Link>
                    </div>
            }
        </header>
    )
}

export default Header;
