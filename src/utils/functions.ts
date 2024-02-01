import {IWord} from "../interfaces/mainInterfaces";

export async function getThreeRandomWords(wordsArray: IWord[]): Promise<string[]> {
    const randomWords: string[] = []

    if (wordsArray.length <= 0) {
        return randomWords
    }

    if (wordsArray.length <= 3) {
        const threeWordsArray: string[] = []

        for (let i = 0; i < wordsArray.length; i++) {
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
