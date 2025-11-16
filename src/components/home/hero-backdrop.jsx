import { getBackdropUrl } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const HeroBackdrop = ({ direction, currentIndex, currentMovie }) => {
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 5000 : -5000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 5000 : -5000,
      opacity: 0,
    }),
  };

  const backdropUrl = getBackdropUrl(currentMovie.backdrop_path);

  return (
    <AnimatePresence mode="wait" custom={direction}>
      {backdropUrl ? (
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
        >
          <Image
            src={backdropUrl}
            alt={currentMovie.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-muted" />
      )}
    </AnimatePresence>
  );
};

export default HeroBackdrop;
