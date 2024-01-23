import React, {useEffect} from "react";
import "./AddingPopup.scss";
import {IAddingPopupProps} from "../../interfaces/interfacesForProps";
import {useInput} from "../../hooks/ValidationHook/ValidationHook";

function AddingPopup(props: IAddingPopupProps) {
    const word = useInput('', {minLength: 3, isEmpty: true, isEnglishWord: false});
    const translation = useInput('', {minLength: 3, isEmpty: true, isTranslation: false});

    const isDisabled = !translation.inputValid || !word.inputValid

    function handleSubmit(evt: any) {
        evt.preventDefault();
        props.handleWordAdding(word.value, translation.value);
    }

    useEffect(() => {
        word.setValue("");
        translation.setValue("");
        word.setIsDirty(false);
        translation.setIsDirty(false);
    }, [props.isPopupOpen])

    return (
        <div className={`adding-popup ${props.isPopupOpen && "adding-popup_visible"}`}>
            <section className="adding-popup__container">
                <button className="adding-popup__close-icon" onClick={props.onClose}></button>
                <h2 className="adding-popup__title">Какое слово хочешь добавить?</h2>
                <form className="adding-popup__form" onSubmit={handleSubmit}>
                    <div className="adding-popup__input-container">
                        <input className="adding-popup__input" placeholder="Слово на английском" type="text"
                               pattern="^[A-Za-z]+$" value={word.value || ""} onBlur={word.onBlur}
                               onChange={word.onChange}
                               required/>
                        {(word.isDirty && word.isEmpty) && <p className="adding-popup__input-error">
                            Поле не может быть пустым</p>}
                        {(word.isDirty && word.englishWordError && !word.isEmpty) &&
                        <p className="adding-popup__input-error">Введите слово на английском</p>}
                    </div>
                    <div className="adding-popup__input-container">
                        <input className="adding-popup__input" placeholder="Перевод" type="text"
                               onBlur={translation.onBlur}
                               pattern="^[А-Яа-яЁё]+$" onChange={translation.onChange}
                               value={translation.value || ""}
                               required/>
                        {(translation.isDirty && translation.isEmpty) && <p className="adding-popup__input-error">
                            Поле не может быть пустым</p>}
                        {(translation.isDirty && translation.translationError && !translation.isEmpty) &&
                        <p className="adding-popup__input-error">Введите перевод на русском</p>}
                    </div>
                    <button className={`adding-popup__button ${isDisabled && "adding-popup__button_disabled"}` }
                            disabled={isDisabled}>Добавить слово</button>
                </form>
            </section>
        </div>
    )
}

export default AddingPopup;
