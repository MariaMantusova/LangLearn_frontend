import {ReactNode} from "react";

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
