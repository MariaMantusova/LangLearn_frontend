import React from "react";
import "./AuthInfoPopup.scss";
import failedIcon from "../../images/failed-icon.png";
import {IAUthInfoPopupProps} from "../../interfaces/interfacesForProps";

function AuthInfoPopup(props: IAUthInfoPopupProps) {

    function handleClose() {
        props.setIsPopupOpened(false);
    }

    return (
        <div className={`info-popup ${props.isPopupOpened && "info-popup_visible"}`}>
            <section className="info-popup__container">
                <button className="info-popup__close-icon" onClick={handleClose}></button>
                <div className="info__container">
                    <img className="info__icon" src={failedIcon} alt="Произошла ошибка"/>
                    <h2 className="info__text">{props.message}</h2>
                </div>
            </section>
        </div>
    )
}

export default AuthInfoPopup;
