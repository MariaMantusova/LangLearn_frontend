import React from "react";
import "./Preloader.scss";
import preloader from "../../images/preloader.svg";

function Preloader() {
    return (
        <div className="preloader__container">
            <img className="preloader" src={preloader} alt="Идет загрузка"/>
        </div>
    )
}

export default Preloader;
