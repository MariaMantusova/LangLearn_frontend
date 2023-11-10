import React from "react";
import "./FormButton.scss";
import {IFormButtonProps} from "../../interfaces/interfacesForProps";

function FormButton(props: IFormButtonProps) {
    return(
        <div className="form-button__container">
            <button className="form-button">{props.buttonText}</button>
            <button className="form-button__link" onClick={props.onClick}>{props.linkText}</button>
        </div>
    )
}

export default FormButton;
