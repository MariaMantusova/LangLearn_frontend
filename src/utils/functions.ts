import {IWordInterface} from "../interfaces/mainInterfaces";

export function findLearnedWords(wordsArray: IWordInterface[]): IWordInterface[] {
    return wordsArray.filter((word) => word.isLearned)
}

export function findNewWords(wordsArray: IWordInterface[]): IWordInterface[] {
    return wordsArray.filter((word) => !word.isLearned)
}
