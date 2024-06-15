import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email jest wymagany!",
  }),
  password: z.string().min(2, {
    message: "Hasło jest wymagane!",
  }),
});

export const EmployerSchema = z.object({
  companyName: z.string().min(2).max(150),
  brandLink: z.string().min(2).max(250),
  city: z.string().min(2).max(150),
  occupation: z.string().min(2).max(150),
  specialization: z.string().min(2).max(150),
  responsibilities: z.string().min(2).max(1500),
  requirements: z.string().min(2).max(1500),
  salary: z.string().min(2).max(16),
  contractType: z.string().min(2).max(150),
  hours: z.string().min(1).max(200),
  additional: z.string().min(2).max(500).optional().nullable(),
  role: z.string().min(2).max(50),
  accept: z.boolean().refine((value) => value === true, {
    message: "Aby kontynuować, musisz zaakceptować warunki.",
  }),
});

export const EmployeeSchema = z.object({
  city: z.string().min(2).max(150),
  occupation: z.string().min(2).max(150),
  specialization: z.string().min(2).max(150),
  experience: z.string().min(2).max(1500),
  contractType: z.string().min(2).max(150),
  hours: z.string().min(1).max(200),
  additional: z.string().min(2).max(500).optional().nullable(),
  role: z.string().min(2).max(50),
  accept: z.boolean().refine((value) => value === true, {
    message: "Aby kontynuować, musisz zaakceptować warunki.",
  }),
});

export const ArticleSchema = z.object({
  title: z.string().min(2).max(150),
  image: z.string().min(2).max(150),
  desc: z.string().min(2).max(300),
  description: z.string().min(2).max(3000),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const ProcedureSchema = z.object({
  title: z.string().min(2).max(150),
  desc: z.string().min(2).max(300),
  description: z.string().min(2).max(3000),
  image: z.string().min(2).max(150),
  video: z.string().min(2).max(150),
  sources: z.array(z.string().min(1)).min(1).max(5),
});

export const EventSchema = z.object({
  title: z.string().min(2).max(150),
  desc: z.string().min(2).max(3000),
  src: z.string().min(2).max(150),
  time: z.string().min(2).max(150),
  location: z.string().min(2).max(150),
  date: z.string().min(2).max(50),
});
