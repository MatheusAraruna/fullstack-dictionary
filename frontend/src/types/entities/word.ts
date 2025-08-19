export type Dictionary = {
    word: string
    phonetic: string
    phonetics: {
        text: string
        audio: string
        sourceUrl: string
        license: {
            name: string
            url: string
        }
    }[]
    meanings: {
        partOfSpeech: string
        definitions: {
            definition: string
            synonyms: string[]
            antonyms: string[]
            example?: string
        }[]
    }[]
}


export type Word = {
    word: string
    added?: Date
}



