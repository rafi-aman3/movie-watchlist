import { Lock, Mail, User } from "lucide-react";
import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const FORM_FIELDS = [
    {
        id: "name",
        label: "Full Name",
        type: "text",
        placeholder: "Rafi Aman",
        icon: User,
        delay: 0.3,
    },
    {
        id: "email",
        label: "Email Address",
        type: "email",
        placeholder: "your@email.com",
        icon: Mail,
        delay: 0.4,
    },
    {
        id: "password",
        label: "Password",
        type: "password",
        placeholder: "••••••••",
        icon: Lock,
        delay: 0.5,
        helper: "Must be at least 6 characters long",
    },
];