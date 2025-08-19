import TabMenu from "@/components/tabs"
import { cn } from "@/utils/cn"
import { Favorites } from "./sections/favorites"
import { Wordlist } from "./sections/wordlist"
import { History } from "./sections/history"
import { SectionEnum } from "../../types"
import { useParams } from "@/hooks/useParams"
import { useSearchParams } from "react-router"

const tabOptions = [
  { id: SectionEnum.Wordlist, label: 'Wordlist' },
  { id: SectionEnum.Favorites, label: 'Favorites' },
  { id: SectionEnum.History, label: 'History' },
]

const sectionMapperComponents = new Map([
    [SectionEnum.Wordlist, Wordlist],
    [SectionEnum.Favorites, Favorites],
    [SectionEnum.History, History],
])

const ActiveSection = ({ section }: { section: SectionEnum }) => {
    const Section = sectionMapperComponents.get(section);
    return Section ? <Section /> : <div>No content available</div>;
}

export function WordGrid({ className }: { className?: string }) {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [section, setSection] = useParams({
        initialValue: SectionEnum.Wordlist,
        paramName: 'section',
        searchParams,
        setSearchParams,
        type: 'string',
    })

    return (
        <div className={cn("flex flex-col", className)}>
            <TabMenu 
                tabs={tabOptions} 
                selected={section as SectionEnum} 
                onHandleSelect={setSection} 
                className="w-full"
            />
            <ActiveSection section={section as SectionEnum} />
        </div>
    )
}
