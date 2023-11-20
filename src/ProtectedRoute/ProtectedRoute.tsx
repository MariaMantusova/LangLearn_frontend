import React from "react";
import {Navigate} from "react-router-dom";
import {IPropsProtectedRoute} from "../interfaces/interfacesForProps";

function ProtectedRoute(props: IPropsProtectedRoute) {
    if (!props.isAuthorized) {
        return <Navigate to={props.navigateLink} replace={true}/>
    }

    return props.children;
}

export default ProtectedRoute;
