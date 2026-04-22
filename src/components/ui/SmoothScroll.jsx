import { ReactLenis } from 'lenis/react'

export function SmoothScroll({ children }) {
    return (
        <ReactLenis
            root
            options={{
                duration: 1.2,
                lerp: 0.1,
                smoothWheel: true,
                wheelMultiplier: 1.0,
                touchMultiplier: 2.0,
                infinite: false,
            }}
        >
            {children}
        </ReactLenis>
    )
}
