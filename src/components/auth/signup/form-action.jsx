import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const FormAction = ({loading}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Button
        type="submit"
        className="w-full h-11 text-base font-semibold group relative overflow-hidden"
        disabled={loading}
      >
        <span className="relative z-10">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </span>
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-primary via-purple-500 to-pink-500"
          initial={{ x: "-100%" }}
          whileHover={{ x: "0%" }}
          transition={{ duration: 0.3 }}
        />
      </Button>
    </motion.div>
  );
};

export default FormAction;
