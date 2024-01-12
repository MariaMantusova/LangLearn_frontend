import {IApiOptions} from "../interfaces/mainInterfaces";

class AuthApi {
    private _url: string;
    private _header: { "Content-Type": string };

    constructor(options: IApiOptions) {
        this._url = options.url;
        this._header = options.headers;
    }

    registerUser(name: string, email: string, password: string) {
        return fetch(`${this._url}/registration`, {
            credentials: 'include',
            method: 'POST',
            headers: this._header,
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
            .then((res) => {
                if (res.ok || res.status === 409) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(res.status.toString()));
                }
            })
            .catch((err) => console.log(err));
    }

    loginUser(email: string, password: string) {
        return fetch(`${this._url}/login`, {
            credentials: 'include',
            method: 'POST',
            headers: this._header,
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(res.status.toString()));
                }
            })
            .catch((err) => console.log(err));
    }

    validityCheck(JWT: string) {
        return fetch(`${this._url}/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": JWT
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(res.status.toString()));
                }
            })
            .catch((err) => console.log(err));
    };
}

const AuthApiOptions = {
    url: "https://lang-learning.onrender.com/auth",
    headers: {
        "Content-Type": "application/json",
    },
}

export const authApi = new AuthApi(AuthApiOptions);
