import { Film } from "lucide-react";
import { motion } from "framer-motion";

const FormHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-center mb-8"
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <Film className="size-6 text-primary" />
        <h1 className="text-3xl font-bold bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Welcome Back
        </h1>
      </div>
      <p className="text-muted-foreground">
         Sign in to your account
      </p>
    </motion.div>
  );
};

export default FormHeader;
