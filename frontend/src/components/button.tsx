import { type ComponentProps } from "react";
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from "@/utils/cn";

const button = tv({
  base: 'rounded-sm cursor-pointer hover:brightness-95',
  variants: {
    variant: {
        tonal:
          'bg-neutral-200 hover:text-primary active:text-neutral-500 focus-visible:bg-neutral-100 focus-visible:text-neutral-500',
        outlined:
          'border border-neutral-400 bg-white text-secondary hover:border-neutral-800 hover:text-primary active:bg-neutral-50 active:text-primary focus-visible:bg-neutral-50 focus-visible:text-primary',
        text: 'hover:text-primary active:bg-neutral-200 active:text-primary focus-visible:text-primary disabled:bg-transparent',
      },
      size: {
        sm: 'p-2 py-1 text-sm',
        md: 'px-3 py-2 text-md'
      }
  },
  defaultVariants: {
    variant: 'outlined',
    size: 'sm'
  }
})

type ButtonVariants = VariantProps<typeof button>

interface ButtonProps extends  ButtonVariants, ComponentProps<'button'> {}

export function Button({ className, variant, size, children, ...props }: ButtonProps) {
    return (
        <button
            className={cn(button({ variant, size }), className)}
            {...props}
        >
            {children}
        </button>
    )
}