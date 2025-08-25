import * as React from "react"
import { cn } from "@/lib/utils"

// Lightweight noop tooltip implementation to avoid runtime crashes
// Exposes the same API surface so existing imports keep working

type TooltipProps = React.HTMLAttributes<HTMLDivElement>

type TooltipContentProps = React.HTMLAttributes<HTMLDivElement> & {
  side?: "top" | "right" | "bottom" | "left"
  align?: "center" | "start" | "end"
}

export const TooltipProvider: React.FC<{ children: React.ReactNode; delayDuration?: number }>
  = ({ children }) => <>{children}</>

export const Tooltip: React.FC<TooltipProps> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
)

export const TooltipTrigger: React.FC<React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }>
  = ({ children }) => <>{children}</>

export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, children, side, align, ...props }, ref) => (
    // Render a visually-hidden element to satisfy structure without JS positioning
    <div
      ref={ref}
      className={cn("sr-only", className)}
      data-side={side}
      data-align={align}
      {...props}
    >
      {children}
    </div>
  )
)
TooltipContent.displayName = "TooltipContent"
