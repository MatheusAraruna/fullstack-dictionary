interface MeaningsProps {
    meanings: Array<{
        partOfSpeech: string;
        definitions: Array<{
            definition: string;
        }>;
    }>;
}

export function Meanings({ meanings }: MeaningsProps) {
    return (
        <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Meanings</h3>
            {meanings.map((meaning, index) => (
                <div key={index} className="flex gap-2">
                    <p className="text-sm text-gray-600 font-medium first-letter:uppercase">{meaning.partOfSpeech}&nbsp;-&nbsp;</p>
                    <p className="text-sm text-gray-600">{meaning.definitions[0].definition}</p>
                </div>
            ))}
        </div>
    )
}