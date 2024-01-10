import React from "react";
import "./AuthInfoPopup.scss";
import {IAUthInfoPopup} from "../../interfaces/interfacesForProps";

function AuthInfoPopup(props: IAUthInfoPopup) {
    return (
        <div className={`info-popup ${props.isPopupOpened && "info-popup_visible"}`}>
            <section className="info-popup__container">
                <button className="info-popup__close-icon"></button>
                <h2 className="info-popup__text">{props.message}</h2>
            </section>
        </div>
    )
}

export default AuthInfoPopup;
