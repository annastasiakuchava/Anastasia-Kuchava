import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(2, "სახელი უნდა იყოს მინიმუმ 2 სიმბოლო"),
  email: z.string().email("არასწორი იმეილის ფორმატი"),
  password: z.string().min(6, "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო"),
  birthDate: z.string().transform((str) => new Date(str))
});

export const loginSchema = z.object({
  email: z.string().email("არასწორი იმეილის ფორმატი"),
  password: z.string().min(1, "პაროლი სავალდებულოა")
});