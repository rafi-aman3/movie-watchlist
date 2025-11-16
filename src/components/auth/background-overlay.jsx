import Image from "next/image";
import { motion } from "framer-motion";

const BackgroundOverlay = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src="https://image.tmdb.org/t/p/original/eOkcT93n6tztcvVRSniL7DX9ah9.jpg"
        alt="Background"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/60 to-black/55" />
      <motion.div
        className="absolute inset-0 bg-linear-to-tr from-primary/20 via-transparent to-purple-500/20"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default BackgroundOverlay;
