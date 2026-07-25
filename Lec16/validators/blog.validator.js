import { z } from 'zod';

export const blogCreateSchema = z.object({
  title: z.string().min(3, "სათაური უნდა იყოს მინიმუმ 3 სიმბოლო"),
  content: z.string().min(10, "კონტენტი უნდა იყოს მინიმუმ 10 სიმბოლო")
});