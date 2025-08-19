import { Grid } from "../elements/grid"

const wordList = [
    { id: "1e8a1b10-1a2b-4c3d-8e9f-1a2b3c4d5e6f", word: "hello", translation: "hoi lau", meaning: 'With "hello" or an equivalent greeting' },
    { id: "2b7c2d20-2b3c-5d4e-9f0a-2b3c4d5e6f7a", word: "today", translation: "gam yat", meaning: "The present day" },
    { id: "3c8d3e30-3c4d-6e5f-0a1b-3c4d5e6f7a8b", word: "great", translation: "hou", meaning: "Very good; excellent" },
    { id: "4d9e4f40-4d5e-7f6a-1b2c-4d5e6f7a8b9c", word: "logic", translation: "loi kap", meaning: "Reasoning conducted according to principles" },
    { id: "5eaf5060-5e6f-8a7b-2c3d-5e6f7a8b9c0d", word: "never", translation: "mou si", meaning: "At no time; not ever" },
    { id: "6fb05170-6f7a-9b8c-3d4e-6f7a8b9c0d1e", word: "peace", translation: "wo ping", meaning: "Freedom from disturbance; tranquility" },
    { id: "7ac16280-7a8b-0c9d-4e5f-7a8b9c0d1e2f", word: "chair", translation: "yi zi", meaning: "A seat for one person" },
    { id: "8bd27390-8b9c-1d0e-5f6a-8b9c0d1e2f3a", word: "diary", translation: "yat gei", meaning: "A book for recording daily events" },
    { id: "9ce384a0-9c0d-2e1f-6a7b-9c0d1e2f3a4b", word: "value", translation: "ga zi", meaning: "The importance or worth of something" },
    { id: "0df495b1-0d1e-3f2a-7b8c-0d1e2f3a4b5c", word: "common", translation: "pou tung", meaning: "Occurring frequently; usual" },
    { id: "1e05a6c2-1e2f-4a3b-8c9d-1e2f3a4b5c6d", word: "stop", translation: "ting", meaning: "Come to an end; cease" },
    { id: "2f16b7d3-2f3a-5b4c-9d0e-2f3a4b5c6d7e", word: "watch", translation: "tai", meaning: "Look at attentively" },
    { id: "3a27c8e4-3a4b-6c5d-0e1f-3a4b5c6d7e8f", word: "sun", translation: "yat tau", meaning: "The star around which Earth orbits" },
    { id: "4b38d9f5-4b5c-7d6e-1f2a-4b5c6d7e8f9a", word: "review", translation: "fuk jaap", meaning: "Examine again; reconsider" },
    { id: "5c49ea06-5c6d-8e7f-2a3b-5c6d7e8f9a0b", word: "bass", translation: "dai yam", meaning: "Low-frequency sound or voice" },
]


export function Wordlist() {
    return (
        <Grid items={wordList} />
    )
}