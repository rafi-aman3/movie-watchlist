import { SignUpPagefadeInLeft } from "@/lib/animation/signup";
import { motion } from "framer-motion";

const ErrorAlert = ({ message }) => {
  return (
    <motion.div
      {...SignUpPagefadeInLeft}
      className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg mb-6 text-sm flex items-start gap-2"
    >
      <span className="text-lg">⚠️</span>
      <span>{message}</span>
    </motion.div>
  );
};

export default ErrorAlert;
