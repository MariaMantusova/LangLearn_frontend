import {IWord} from "../interfaces/mainInterfaces";

export function getThreeRandomWords(wordsArray: IWord[]): string[] | string {
    const randomWords: string[] = []

    if (wordsArray.length <= 0) {
        return "У вас пока нет таких слов"
    }

    if (wordsArray.length <= 3) {
        const threeWordsArray: string[] = []

        for (let i = 0; i <= wordsArray.length; i++) {
            threeWordsArray.push(wordsArray[i].word)
        }

        return threeWordsArray;
    }

    while (randomWords.length < 3) {
        const currentWord = wordsArray[Math.floor(Math.random()*wordsArray.length)].word

        if (!randomWords.includes(currentWord)) {
            randomWords.push(currentWord)
        }
    }

    return randomWords
}
