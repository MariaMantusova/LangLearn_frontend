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
}
