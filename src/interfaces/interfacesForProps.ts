import React, {ReactNode} from "react";
import {IWord} from "./mainInterfaces";

export interface IHeaderProps {
    path: string
    linkName: string
}

export interface IProfileMenuProps {
    path: string
    linkName: string
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
    nameValidity?: any
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
}

export interface ILoginFormProps {
    onClick: () => void
}

export interface IAuthPageProps {
    children: ReactNode
    title: string
}

export interface IWordsBlockProps {
    buttonText: string
    words: string[] | string
    wordClass: string
    buttonClass: string
    title: string
    openingPopupFunc: () => void
}

export interface IProfilePageProps {
    newWords: IWord[]
    learnedWords: IWord[]
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
