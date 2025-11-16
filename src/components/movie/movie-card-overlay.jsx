import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const overlayVariants = {
  initial: { opacity: 0 },
  hover: { opacity: 1 },
};

const MovieCardOverlay = ({ isHovered }) => {
  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent"
          variants={overlayVariants}
          initial="initial"
          animate="hover"
          exit="initial"
          transition={{ duration: 0.2 }}
        />
      )}
    </AnimatePresence>
  );
};

export default MovieCardOverlay;
