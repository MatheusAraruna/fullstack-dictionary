import { Button } from "@/components/button";

export function Controls() {
    return (
        <div className="flex gap-2">
            <Button variant="outlined" size="md" onClick={() => {}} className="flex-1 bg-transparent text-sm">
                Voltar
            </Button>
            <Button variant="outlined" size="md" onClick={() => {}} className="flex-1 bg-transparent text-sm">
                Próximo
            </Button>
        </div>
    )
}