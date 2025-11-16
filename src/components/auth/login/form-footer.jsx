import Link from "next/link";
import { motion } from "framer-motion";

const FormFooter = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="mt-6 text-center"
    >
      <p className="text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-primary hover:underline font-semibold transition-colors"
        >
          Sign up here
        </Link>
      </p>
    </motion.div>
  );
};

export default FormFooter;
