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
    { id: "6d5a0b17-6d7e-9f8a-3b4c-6d7e8f9a0b1c", word: "apple", translation: "ping gwo", meaning: "A round fruit with red or green skin" },
    { id: "7e6b1c28-7e8f-0a9b-4c5d-7e8f9a0b1c2d", word: "river", translation: "ho", meaning: "A large natural stream of water" },
    { id: "8f7c2d39-8f9a-1b0c-5d6e-8f9a0b1c2d3e", word: "music", translation: "yam ngok", meaning: "Vocal or instrumental sounds" },
    { id: "9a8d3e4a-9a0b-2c1d-6e7f-9a0b1c2d3e4f", word: "book", translation: "syu", meaning: "A written or printed work" },
    { id: "0b9e4f5b-0b1c-3d2e-7f8a-0b1c2d3e4f5a", word: "light", translation: "gwong", meaning: "The natural agent that makes things visible" },
    { id: "1caf506c-1c2d-4e3f-8a9b-1c2d3e4f5a6b", word: "mountain", translation: "saan", meaning: "A large natural elevation of the earth's surface" },
    { id: "2db0517d-2d3e-5f4a-9b0c-2d3e4f5a6b7c", word: "friend", translation: "pung yau", meaning: "A person whom one knows and trusts" },
    { id: "3ec1628e-3e4f-6a5b-0c1d-3e4f5a6b7c8d", word: "school", translation: "hok haau", meaning: "An institution for educating children" },
    { id: "4fd2739f-4f5a-7b6c-1d2e-4f5a6b7c8d9e", word: "family", translation: "ga ting", meaning: "A group of related people" },
    { id: "5ae384a0-5a6b-8c7d-2e3f-5a6b7c8d9e0f", word: "water", translation: "seui", meaning: "A transparent, tasteless liquid" },
    { id: "6bf495b1-6b7c-9d8e-3f4a-6b7c8d9e0f1a", word: "city", translation: "sing si", meaning: "A large town" },
    { id: "7c05a6c2-7c8d-0e9f-4a5b-7c8d9e0f1a2b", word: "teacher", translation: "lou si", meaning: "A person who teaches" },
    { id: "8d16b7d3-8d9e-1f0a-5b6c-8d9e0f1a2b3c", word: "computer", translation: "din nou", meaning: "An electronic device for processing data" },
    { id: "9e27c8e4-9e0f-2a1b-6c7d-9e0f1a2b3c4d", word: "flower", translation: "fa", meaning: "The seed-bearing part of a plant" },
    { id: "0f38d9f5-0f1a-3b2c-7d8e-0f1a2b3c4d5e", word: "road", translation: "lou", meaning: "A wide way leading from one place to another" },
    { id: "10a1b2c3-1a2b-3c4d-5e6f-7a8b9c0d1e2f", word: "window", translation: "cheung", meaning: "An opening in a wall for light or air" },
    { id: "11b2c3d4-2b3c-4d5e-6f7a-8b9c0d1e2f3a", word: "phone", translation: "din waa", meaning: "A device for voice communication" },
    { id: "12c3d4e5-3c4d-5e6f-7a8b-9c0d1e2f3a4b", word: "table", translation: "joi", meaning: "A piece of furniture with a flat top" },
    { id: "13d4e5f6-4d5e-6f7a-8b9c-0d1e2f3a4b5c", word: "pen", translation: "bat", meaning: "An instrument for writing" },
    { id: "14e5f607-5e6f-7a8b-9c0d-1e2f3a4b5c6d", word: "dog", translation: "gau", meaning: "A domesticated carnivorous mammal" },
    { id: "15f60718-6f7a-8b9c-0d1e-2f3a4b5c6d7e", word: "cat", translation: "maau", meaning: "A small domesticated carnivorous mammal" },
    { id: "16a71829-7a8b-9c0d-1e2f-3a4b5c6d7e8f", word: "car", translation: "che", meaning: "A road vehicle with four wheels" },
    { id: "17b8293a-8b9c-0d1e-2f3a-4b5c6d7e8f9a", word: "bird", translation: "niu", meaning: "A warm-blooded egg-laying vertebrate" },
    { id: "18c93a4b-9c0d-1e2f-3a4b-5c6d7e8f9a0b", word: "tree", translation: "syu", meaning: "A perennial plant with an elongated stem" },
    { id: "19d04b5c-0d1e-2f3a-4b5c-6d7e8f9a0b1c", word: "house", translation: "uk", meaning: "A building for human habitation" },
    { id: "20e15c6d-1e2f-3a4b-5c6d-7e8f9a0b1c2d", word: "door", translation: "mun", meaning: "A hinged barrier for closing an opening" },
    { id: "21f26d7e-2f3a-4b5c-6d7e-8f9a0b1c2d3e", word: "food", translation: "sik mat", meaning: "Any nutritious substance that people eat" },
    { id: "22a37e8f-3a4b-5c6d-7e8f-9a0b1c2d3e4f", word: "drink", translation: "yam", meaning: "A liquid that can be swallowed" },
    { id: "23b48f90-4b5c-6d7e-8f9a-0b1c2d3e4f5a", word: "bed", translation: "chong", meaning: "A piece of furniture for sleep" },
    { id: "24c590a1-5c6d-7e8f-9a0b-1c2d3e4f5a6b", word: "shirt", translation: "sam", meaning: "A garment for the upper body" },
]


export function Wordlist() {
    return (
        <Grid items={wordList} />
    )
}