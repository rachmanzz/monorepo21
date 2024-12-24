import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters."),
  lastName: z.string().optional(),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string()
    .regex(/^\d+$/, "phone number not valid")
    .min(6, "Phone number is required and must be at least 3 characters"),
  gender: z.enum(["male", "female"],
    { message: "Gender is required, and value must be male or female" }
  ),
});

export type UserSchemaType = z.infer<typeof userSchema>;