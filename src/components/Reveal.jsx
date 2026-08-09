import { motion } from "framer-motion";

/**
 * Wraps children in a subtle fade + rise animation that plays once
 * when the element enters the viewport. Kept deliberately small
 * (12px, 0.5s) so it reads as polish, not decoration.
 */
export default function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const MotionTag = motion[Tag] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
