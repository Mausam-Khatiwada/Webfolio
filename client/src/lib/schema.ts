
import { z } from "zod";

export const insertMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
}
