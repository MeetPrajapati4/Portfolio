import { ReactLenis } from 'lenis/react'

export function SmoothScroll({ children }) {
    return (
        <ReactLenis
            root
            options={{
                duration: 1.5,
                lerp: 0.1,
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                infinite: false,
            }}
        >
            {children}
        </ReactLenis>
    )
}
