export interface IWord {
    word: string
    translation: string
    isLearned: boolean
    userId: string
    _id: string
}

export interface IValidations {
    isEmpty: boolean
    isEmail?: boolean
    minLength: number
    isName?: boolean
    isTranslation?: boolean
    isEnglishWord?: boolean
}

export interface IApiOptions {
    url: string
    headers: {
        "Content-Type": string
    }
}

export interface IAuthAnswer {
    "userName": string
    "message": string
}
