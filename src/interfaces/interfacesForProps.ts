import React, {ReactNode} from "react";
import {IWord} from "./mainInterfaces";

export interface IHeaderProps {
    path: string
    linkName: string
    isAuthorized: boolean
    currentUser: string
    exitUser: () => void
}

export interface IProfileMenuProps {
    path: string
    linkName: string
    currentUser: string
    exitUser: () => void
}

export interface ICardProps {
    word: string
    translation: string
    isLearned: boolean
}

export interface IAuthFormProps {
    children?: ReactNode
    buttonText: string
    linkText: string
    name?: any
    handleSubmit: (evt: any) => void
    email: any
    password: any
    onClick: () => void
}

export interface IFormButtonProps {
    buttonText: string
    linkText: string
    onClick: () => void
    nameValidity: any
    emailValidity: any
    passwordValidity: any
}

export interface IRegisterFormProps {
    onClick: () => void
    registerSubmit: (name: string, email: string, password: string) => void
}

export interface ILoginFormProps {
    onClick: () => void
    loginSubmit: (email: string, password: string) => void
}

export interface IAuthPageProps {
    children: ReactNode
    title: string
    isAuthorized: boolean
    currentUser: string
    exitUser: () => void
}

export interface IWordsBlockProps {
    buttonText: string
    words: string[] | string
    wordClass: string
    buttonClass: string
    title: string
    openingPopupFunc: () => void
    linkName: string
}

export interface IProfilePageProps {
    newWords: IWord[]
    learnedWords: IWord[]
    isAuthorized: boolean
    currentUser: string
    exitUser: () => void
}

export interface IWordLineProps {
    word: string
    translation: string
    isLearned: boolean
}

export interface IWordsPageProps {
    wordsType: string
    buttonText: string
    children?: ReactNode
    words: IWord[]
    isAuthorized: boolean
    linkName: string
    currentUser: string
    exitUser: () => void
}

export interface IOpportunitiesProps {
    openingPopupFunc: () => void
}

export interface IAddingPopupProps {
    isPopupOpen: boolean
    onClose: () => void
}

export interface IPropsLearningPage {
    words: IWord[]
    isAuthorized: boolean
    currentUser: string
    exitUser: () => void
}

export interface IPropsPagination {
    wordsPerPage: number
    totalWords: number
    paginate: (pageNumber: number) => void
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    currentPage: number
}

export interface IPropsWordTools {
    isLearned: boolean
}

export interface IPropsProtectedRoute {
    isAuthorized: boolean
    children: JSX.Element
    navigateLink: string
}

export interface IPropsMain {
    isAuthorized: boolean
    currentUser: string
    exitUser: () => void
    registerFunction: (name: string, email: string, password: string) => void
    loginFunction: (email: string, password: string) => void
}

export interface IPropsLoginPage {
    isAuthorized: boolean
    loginSubmit: (email: string, password: string) => void
    currentUser: string
    exitUser: () => void
}

export interface IPropsRegisterPage {
    isAuthorized: boolean
    registerSubmit: (name: string, email: string, password: string) => void
    currentUser: string
    exitUser: () => void
}

export interface IPropsAuthBlock {
    registerFunction: (name: string, email: string, password: string) => void
    loginFunction: (email: string, password: string) => void
}
