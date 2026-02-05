import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLenis } from 'lenis/react';
import "./ScrollToTop.css";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const lenis = useLenis();

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        if (lenis) {
            lenis.scrollTo(0);
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="scroll-to-top-btn"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={20} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
