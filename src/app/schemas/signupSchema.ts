import { z } from "zod";
export const SignupSchema = z.object({
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z
    .string()
    .min(4, { message: "password must be atleast 4 characters" }),
});
