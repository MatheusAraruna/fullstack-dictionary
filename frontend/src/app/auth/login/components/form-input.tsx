import type { ComponentProps } from "react";

interface FormInputProps extends ComponentProps<'input'> {
    label: string
    error: string | undefined
}

export function FormInput({ label, id, type, error, ...props }: FormInputProps) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id}>
                {label}:
            </label>
            <input 
                id={id}  
                type={type} 
                className='border border-gray-300 p-2 rounded-md' 
                aria-invalid={error ? "true" : "false"}
                {...props} 
            />
            {error && <span className="text-red-500">{error}</span>}
        </div>
    )
}