import React, {ReactNode} from "react";
import {IWordInterface} from "./mainInterfaces";

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
}

export interface IAuthFormProps {
    children?: ReactNode
    buttonText: string
    linkText: string
    onClick: () => void
}

export interface IFormButtonProps {
    buttonText: string
    linkText: string
    onClick: () => void
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
    newWords: IWordInterface[]
    learnedWords: IWordInterface[]
}

export interface IWordLineProps {
    word: string
    translation: string
}

export interface IWordsPageProps {
    wordsType: string
    buttonText: string
    children?: ReactNode
    words: IWordInterface[]
}

export interface IOpportunitiesProps {
    openingPopupFunc: () => void
}

export interface IAddingPopupProps {
    isPopupOpen: boolean
    onClose: () => void
}

export interface IPropsLearningPage {
    words: IWordInterface[]
}

export interface IPropsPagination {
    wordsPerPage: number
    totalWords: number
    paginate: (pageNumber: number) => void
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    currentPage: number
}
