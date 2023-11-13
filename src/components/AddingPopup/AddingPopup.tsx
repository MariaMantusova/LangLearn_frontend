import React from "react";
import "./AddingPopup.scss";
import {IAddingPopupProps} from "../../interfaces/interfacesForProps";

function AddingPopup(props: IAddingPopupProps) {
    return(
        <div className={`adding-popup ${props.isPopupOpen && "adding-popup_visible"}`}>
        <section className="adding-popup__container">
            <button className="adding-popup__close-icon" onClick={props.onClose}></button>
            <h2 className="adding-popup__title">Какое слово хочешь добавить?</h2>
            <form className="adding-popup__form">
                <input className="adding-popup__input" placeholder="Слово на английском" type="text"
                       pattern="^[A-Za-z]+$" required/>
                <input className="adding-popup__input" placeholder="Перевод" type="text"
                       pattern=" ^[А-Яа-яЁё]+$" required/>
                <button className="adding-popup__button">Добавить слово</button>
            </form>
        </section>
        </div>
    )
}

export default AddingPopup;
