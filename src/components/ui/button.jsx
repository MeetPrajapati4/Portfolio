import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import "./button.css"

const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? motion.slot : motion.button

    // Map variants to CSS classes
    const variantClass = `btn-${variant}`
    const sizeClass = `btn-size-${size}`

    return (
        <Comp
            className={cn(
                "btn",
                variantClass,
                sizeClass,
                className
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            ref={ref}
            {...props}
        >
            {children}
        </Comp>
    )
})
Button.displayName = "Button"

export { Button }
