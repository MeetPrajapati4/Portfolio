import React, { useEffect, useRef, useCallback } from 'react';

/**
 * TubesCursor - An interactive 3D tube animation component
 * Tubes follow mouse movement and colors change on click
 * Displays as a fixed fullscreen background across entire page
 * 
 * Forces Dark Theme colors permanently for consistent aesthetic
 */
function TubesCursorInternal() {
    const canvasRef = useRef(null);
    const appRef = useRef(null);
    const isInitialized = useRef(false);

    // Fixed Dark Theme Palette
    const palette = {
        tubes: ["#ffffff", "#21d4fd", "#b721ff", "#f4d03f", "#11cdef"], // White + Neons
        lights: ["#21d4fd", "#b721ff", "#f4d03f", "#11cdef"]
    };

    /**
     * Generates an array of completely random hex colors on click.
     */
    const randomHexcolors = useCallback((count) => {
        return new Array(count)
            .fill(0)
            .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
    }, []);

    useEffect(() => {
        if (isInitialized.current || !canvasRef.current) return;

        const loadAndInit = async () => {
            try {
                // Dynamically import the library
                const module = await import('threejs-components/build/cursors/tubes1.min.js');
                const TubesCursor1 = module.default;

                if (canvasRef.current && !isInitialized.current) {
                    isInitialized.current = true;

                    const app = TubesCursor1(canvasRef.current, {
                        tubes: {
                            count: 20,
                            radius: 0.02,
                            colors: palette.tubes,
                            lights: {
                                intensity: 120,
                                colors: palette.lights
                            }
                        }
                    });
                    appRef.current = app;

                    // Simulate movement to cover screen initially
                    const width = window.innerWidth;
                    const height = window.innerHeight;

                    // Specific "wide" movements to cover screen
                    const points = [
                        { x: width * 0.1, y: height * 0.1 },
                        { x: width * 0.9, y: height * 0.1 },
                        { x: width * 0.9, y: height * 0.9 },
                        { x: width * 0.1, y: height * 0.9 },
                        { x: width * 0.5, y: height * 0.5 },
                    ];

                    let i = 0;
                    const interval = setInterval(() => {
                        if (i >= points.length) {
                            clearInterval(interval);
                            return;
                        }
                        const point = points[i];
                        window.dispatchEvent(new MouseEvent('mousemove', {
                            clientX: point.x,
                            clientY: point.y,
                            bubbles: true
                        }));
                        i++;
                    }, 300);
                }
            } catch (err) {
                console.error('Error initializing TubesCursor:', err);
            }
        };

        // Delay to ensure DOM is ready
        const timer = setTimeout(loadAndInit, 150);

        return () => {
            clearTimeout(timer);
            if (appRef.current && typeof appRef.current.dispose === 'function') {
                try {
                    appRef.current.dispose();
                } catch (e) {
                    // Ignore disposal errors
                }
            }
        };
    }, []);

    const handleClick = useCallback(() => {
        if (appRef.current?.tubes) {
            try {
                // Generate completely random colors for variety on click
                const newTubeColors = randomHexcolors(4);
                const newLightColors = randomHexcolors(4);

                appRef.current.tubes.setColors(newTubeColors);
                appRef.current.tubes.setLightsColors(newLightColors);
            } catch (err) {
                console.error('Error changing colors:', err);
            }
        }
    }, [randomHexcolors]);

    useEffect(() => {
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [handleClick]);

    return (
        <div
            id="tubes-cursor-wrapper"
            style={{
                position: 'fixed',
                inset: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                overflow: 'hidden',
                background: 'transparent',
                pointerEvents: 'none'
            }}
        >
            <canvas
                ref={canvasRef}
                id="tubes-cursor-canvas"
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%'
                }}
            />
        </div>
    );
}

export const TubesCursor = React.memo(TubesCursorInternal);
export default TubesCursor;
