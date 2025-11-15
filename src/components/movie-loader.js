import { Film } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const filmyDialogues = [
  "Lights, Camera, Action! 🎬",
  "Rolling the reels... 🎞️",
  "Picture abhi baaki hai mere dost! 🎭",
  "Loading your entertainment... ✨",
  "Bringing cinema to life... 🌟",
  "Fetching blockbusters... 🎪",
  "Curtains opening soon... 🎭",
  "Your movies are on the way! 🚀",
];

export default function MovieLoader() {
  const [dialogueIndex, setDialogueIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDialogueIndex((prev) => (prev + 1) % filmyDialogues.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black">
      <div className="relative">
        {/* Animated Film Reel Background */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-64 h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl" />
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col items-center gap-8 p-8">
          {/* Rotating Film Reel */}
          <div className="relative">
            {/* Outer Ring */}
            <motion.div
              className="absolute inset-0 w-32 h-32 border-4 border-purple-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-purple-400 rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${i * 45}deg) translateY(-60px)`,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.125,
                  }}
                />
              ))}
            </motion.div>

            {/* Center Film Icon */}
            <motion.div
              className="relative w-32 h-32 flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Film className="w-16 h-16 text-purple-300" strokeWidth={1.5} />
              </motion.div>
            </motion.div>
          </div>

          {/* Film Strip Animation */}
          <div className="flex gap-2 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-12 h-16 bg-gradient-to-b from-purple-600 to-purple-800 rounded border-2 border-purple-400"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <div className="h-full flex flex-col justify-between p-1">
                  <div className="w-full h-1 bg-purple-300 rounded" />
                  <div className="w-full h-1 bg-purple-300 rounded" />
                  <div className="w-full h-1 bg-purple-300 rounded" />
                  <div className="w-full h-1 bg-purple-300 rounded" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Animated Dialogue */}
          <div className="h-16 flex items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={dialogueIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-center"
              >
                {filmyDialogues[dialogueIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Loading Dots */}
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-purple-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Spotlight Effect */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-32 bg-gradient-to-b from-yellow-300/50 to-transparent blur-sm"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scaleY: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
