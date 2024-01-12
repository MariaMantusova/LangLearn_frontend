import {IApiOptions} from "../interfaces/mainInterfaces";

class WordsApi {
    private _url: string;
    private _token: string | null
    private _header: { "Content-Type": string };

    constructor(options: IApiOptions) {
        this._url = options.url;
        this._token = '';
        this._header = options.headers;
    }

    getCardsByType(type: string) {
        return fetch(`${this._url}/my/${type}`, {
            credentials: 'include',
            headers: {
                "Authorization": `${this.getAuthHeader()}`
            }
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

    getAuthHeader() {
        if (this._token !== '') {
            return this._token
        }

        if (localStorage.getItem("token")) {
            this._token = localStorage.getItem("token")
            return this._token
        }

        return ''
    }
}

const WordsApiOptions = {
    url: "https://lang-learning.onrender.com/cards",
    headers: {
        "Content-Type": "application/json",
    },
}

export const wordsApi = new WordsApi(WordsApiOptions);
