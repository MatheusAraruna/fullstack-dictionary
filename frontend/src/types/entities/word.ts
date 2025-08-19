export type DictionaryEntry = {
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

export type Dictionary = {
    dictionary: DictionaryEntry,
    favorited: boolean
}


export type Word = {
    word: string
    added?: Date
}



