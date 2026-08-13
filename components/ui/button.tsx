import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/strings";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-xs font-semibold tracking-normal transition-all duration-150 cursor-pointer disabled:pointer-events-none disabled:opacity-40 select-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background shadow-xs hover:bg-foreground/90 active:bg-foreground",
        primary:
          "bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/92 active:bg-primary/85",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",
        outline:
          "border border-border bg-card text-foreground shadow-xs hover:bg-secondary/50 hover:border-border/80 active:bg-secondary/70",
        neutral:
          "border border-border/80 bg-white/70 text-foreground/80 hover:text-foreground hover:bg-white hover:border-border shadow-xs",
        ghost:
          "text-foreground/80 hover:text-foreground hover:bg-secondary/60 active:bg-secondary/80",
        subtle:
          "bg-accent text-accent-foreground hover:bg-accent/80 active:bg-accent/90 font-medium",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 active:bg-destructive/80",
      },
      size: {
        default: "h-9 px-3.5 py-2",
        sm: "h-7.5 px-2.5 text-[11px] rounded-lg",
        lg: "h-11 px-5 text-sm rounded-xl",
        icon: "h-9 w-9 p-0",
        square: "aspect-square p-1 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, reference): React.JSX.Element => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        className={cn(buttonVariants({ variant, size, className }))}
        ref={reference}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

