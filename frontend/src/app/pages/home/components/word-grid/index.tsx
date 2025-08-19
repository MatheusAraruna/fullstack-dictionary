import { useState } from "react"
import TabMenu from "@/components/tabs"
import { cn } from "@/utils/cn"
import { Favorites } from "./sections/favorites"
import { Wordlist } from "./sections/wordlist"
import { History } from "./sections/history"
import { SectionEnum } from "../../types"

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
    const [section, setSection] = useState<SectionEnum>(SectionEnum.Wordlist)
    const handleTabSelect = (selectedTab: string) => {
        setSection(selectedTab as SectionEnum)
    }
    
    return (
        <div className={cn("flex flex-col", className)}>
            <TabMenu 
                tabs={tabOptions} 
                selected={section} 
                onHandleSelect={handleTabSelect} 
                className="w-full"
            />
            <ActiveSection section={section} />
        </div>
    )
}