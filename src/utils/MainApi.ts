import {IMainApiOptions} from "../interfaces/mainInterfaces";

class MainApi {
    private _url: string;
    private _header: { "Content-Type": string };

    constructor(options: IMainApiOptions) {
        this._url = options.url;
        this._header = options.headers;
    }

    registerUser(name: string, email: string, password: string) {
        return fetch(`${this._url}/auth/registration`, {
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

    loginUser(name: string, email: string, password: string) {

    }
}

const MainApiOptions = {
    url: "https://lang-learning.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
}

export const mainApi = new MainApi(MainApiOptions);
