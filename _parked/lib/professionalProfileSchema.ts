// schemas/professionalProfileSchema.ts (or directly in your component file)
import { z } from "zod";

export const professionalProfileSchema = z.object({
  jobTitle: z.string().min(1, "Job Title is required").default(""),
  company: z.string().min(1, "Company is required").default(""),
  experience: z.number().min(0, "Experience cannot be negative").default(0),
});

export type ProfessionalProfileFormValues = z.infer<typeof professionalProfileSchema>;