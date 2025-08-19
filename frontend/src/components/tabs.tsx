import { twMerge } from 'tailwind-merge'
import { cn } from '@/utils/cn'

export type Tabs = {
  id: string
  label: string
}

interface SectionProps {
  id: string
  label: string
  isSelected: boolean
  className?: string
  onSelect: (id: string) => void
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  selected: string
  tabs: Tabs[]
  onHandleSelect: (e: string) => void
}

function Section({ id, label, isSelected, className, onSelect }: SectionProps) {
  return (
    <div
      className={twMerge(
        'cursor-pointer border border-neutral-200',
        isSelected ? 'bg-neutral-200' : 'bg-white',
        className
      )}
      onClick={() => onSelect(id)}
    >
      <p className={twMerge(
          'text-nowrap block text-sm py-2 px-4 text-center',
          isSelected && 'text-primary font-medium'
        )}
      >
        {label}
      </p>
    </div>
  )
}

export default function TabMenu({
  tabs,
  selected,
  onHandleSelect,
  className
}: TabsProps) {
  return (
    <>
      <div className={cn("flex justify-center items-center md:ml-4 md:justify-start", className)}>
        {tabs?.map(({ id, label }) => (
          <Section
            key={id}
            id={id}
            label={label}
            isSelected={selected === id}
            onSelect={onHandleSelect} 
            className="flex-1 md:flex-none"
            />
        ))}
      </div>
    </>
  )
}
