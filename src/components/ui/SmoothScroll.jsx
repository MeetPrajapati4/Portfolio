import { ReactLenis } from 'lenis/react'

export function SmoothScroll({ children }) {
    return (
        <ReactLenis
            root
            options={{
                duration: 2.5,
                lerp: 0.05,
                smoothWheel: true,
                wheelMultiplier: 0.8,
                touchMultiplier: 1.5,
                infinite: false,
            }}
        >
            {children}
        </ReactLenis>
    )
}
