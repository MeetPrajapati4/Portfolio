import { motion, useInView, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"

export function Reveal({ children, width = "fit-content", delay = 0.25, variant = "slide" }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const mainControls = useAnimation()
    const slideControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
            slideControls.start("visible")
        }
    }, [isInView, mainControls, slideControls])

    const variants = {
        slide: {
            hidden: { opacity: 0, y: 100, filter: "blur(10px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" }
        },
        fade: {
            hidden: { opacity: 0, filter: "blur(10px)" },
            visible: { opacity: 1, filter: "blur(0px)" }
        },
        scale: {
            hidden: { opacity: 0, scale: 0.5, filter: "blur(10px)" },
            visible: { opacity: 1, scale: 1, filter: "blur(0px)" }
        },
        skew: {
            hidden: { opacity: 0, skewY: 12, y: 100, filter: "blur(10px)" },
            visible: { opacity: 1, skewY: 0, y: 0, filter: "blur(0px)" }
        }
    }

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }} className="py-2">
            <motion.div
                variants={variants[variant]}
                initial="hidden"
                animate={mainControls}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: [0.16, 1, 0.3, 1], // Custom "editorial" ease-out
                }}
            >
                {children}
            </motion.div>

            {variant === "slide" && (
                <motion.div
                    variants={{
                        hidden: { left: 0 },
                        visible: { left: "100%" },
                    }}
                    initial="hidden"
                    animate={slideControls}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: delay }}
                    className="absolute top-0 bottom-0 left-0 right-0 bg-primary z-30"
                />
            )}
        </div>
    )
}
