import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./ProfileMenu.scss";
import {IProfileMenuProps} from "../../interfaces/interfacesForProps";

function ProfileMenu(props: IProfileMenuProps) {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    function handleMenuOpen() {
        setIsMenuOpened(!isMenuOpened);
    }

    return (
        <div className="profile-menu">
            <Link to={props.path} className="profile-menu__link">{props.linkName}</Link>
            <div className="profile-menu__profile-container">
                <button className="profile-menu__profile-name"
                        onClick={handleMenuOpen}>{props.userName}&#8195;{isMenuOpened ? "↑" : "↓"}</button>
                <div className={`profile-menu__links ${isMenuOpened && "profile-menu__links_active"}`}>
                    <Link className="profile-menu__profile-link" to="/profile">Профиль</Link>
                    <button className="profile-menu__button">Выйти</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileMenu;
