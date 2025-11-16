import { motion } from "framer-motion";
import { SignUpPagefadeInLeft } from "@/lib/animation/signup";
import { Input } from "../ui/input";

const FormField = ({ field, value, onChange, disabled, error }) => {
  const Icon = field.icon;

  return (
    <motion.div {...SignUpPagefadeInLeft} transition={{ delay: field.delay }}>
      <label htmlFor={field.id} className="block text-sm font-medium mb-2">
        {field.label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          id={field.id}
          type={field.type}
          placeholder={field.placeholder}
          value={value}
          onChange={onChange}
          required
          disabled={disabled}
          className={`pl-10 h-11 bg-background/50 ${
            error ? "border-destructive focus-visible:ring-destructive" : ""
          }`}
        />
      </div>
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
      {field.helper && !error && (
        <p className="text-xs text-muted-foreground mt-1">{field.helper}</p>
      )}
    </motion.div>
  );
};

export default FormField;
