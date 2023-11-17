import React from "react";
import "./FormButton.scss";
import {IFormButtonProps} from "../../interfaces/interfacesForProps";

function FormButton(props: IFormButtonProps) {
    const isDisabled = !props.emailValidity.inputValid || !props.nameValidity.inputValid || !props.passwordValidity.inputValid

    return(
        <div className="form-button__container">
            <button className={`form-button ${isDisabled && "form-button_disabled"}`}
                    disabled={isDisabled}>
                {props.buttonText}
            </button>
            <button className="form-button__link" onClick={props.onClick}>{props.linkText}</button>
        </div>
    )
}

export default FormButton;
