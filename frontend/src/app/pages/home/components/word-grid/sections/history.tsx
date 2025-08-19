import { Grid } from "../elements/grid";

const wordList = [
    { id: "1e8a1b10-1a2b-4c3d-8e9f-1a2b3c4d5e6f", word: "hello", translation: "hoi lau", meaning: 'With "hello" or an equivalent greeting' },
    { id: "2b7c2d20-2b3c-5d4e-9f0a-2b3c4d5e6f7a", word: "today", translation: "gam yat", meaning: "The present day" },
    { id: "3c8d3e30-3c4d-6e5f-0a1b-3c4d5e6f7a8b", word: "great", translation: "hou", meaning: "Very good; excellent" },
    { id: "4d9e4f40-4d5e-7f6a-1b2c-4d5e6f7a8b9c", word: "logic", translation: "loi kap", meaning: "Reasoning conducted according to principles" },
    { id: "5eaf5060-5e6f-8a7b-2c3d-5e6f7a8b9c0d", word: "never", translation: "mou si", meaning: "At no time; not ever" },
    { id: "6fb05170-6f7a-9b8c-3d4e-6f7a8b9c0d1e", word: "peace", translation: "wo ping", meaning: "Freedom from disturbance; tranquility" },
    { id: "7ac16280-7a8b-0c9d-4e5f-7a8b9c0d1e2f", word: "chair", translation: "yi zi", meaning: "A seat for one person" },
]

export function History() {
    return (
        <Grid items={wordList} />
    )
}