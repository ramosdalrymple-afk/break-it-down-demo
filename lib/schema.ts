import { z } from 'zod';

// 1. Define the shape of a single sub-task
export const subtaskSchema = z.object({
  id: z.string().describe("A unique identifier for the task (e.g., 'task-1')"),
  title: z.string().describe("Clear, actionable title for the task"),
  description: z.string().describe("A brief, helpful tip on how to complete this task"),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe("Estimated effort level"),
});

// 2. Define the shape of the entire response
export const planSchema = z.object({
  goalTitle: z.string().describe("A refined, catchy title for the user's goal"),
  emoji: z.string().describe("A relevant emoji for the goal"),
  tasks: z.array(subtaskSchema).describe("An ordered list of steps to achieve the goal"),
});

// 3. Export the type so we can use it in our UI components later
export type Plan = z.infer<typeof planSchema>;