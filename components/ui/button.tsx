import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/strings";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border-2 rounded-none font-mono font-black uppercase tracking-widest transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-foreground border-2 border-foreground hover:bg-primary hover:text-background active:shadow-none active:translate-x-0 active:translate-y-0",
        primary:
          "bg-primary text-primary-foreground border-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -translate-x-0.5 -translate-y-0.5 active:shadow-none active:translate-x-0 active:translate-y-0",
        neutral:
          "bg-transparent text-foreground border-2 border-foreground hover:bg-foreground hover:text-background active:shadow-none active:translate-x-0 active:translate-y-0",
        outline: "bg-transparent border-border hover:bg-accent",
        ghost: "bg-transparent border-transparent hover:bg-muted font-black",
        destructive:
          "bg-red-500 text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -translate-x-0.5 -translate-y-0.5 active:shadow-none active:translate-x-0 active:translate-y-0",
      },
      size: {
        default: "h-10 px-4 py-2 text-[10px]",
        sm: "h-8 px-3 text-[9px]",
        lg: "h-12 px-6 text-[11px]",
        icon: "h-10 w-10",
        square: "aspect-square p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
