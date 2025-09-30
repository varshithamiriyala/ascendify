'use server';

/**
 * @fileOverview Generates a personalized career roadmap for an employee, including trainings, projects, and mentorship opportunities.
 *
 * - generateCareerRoadmap - A function that generates the career roadmap.
 * - CareerRoadmapInput - The input type for the generateCareerRoadmap function.
 * - CareerRoadmapOutput - The return type for the generateCareerRoadmap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerRoadmapInputSchema = z.object({
  employeeName: z.string().describe('The name of the employee.'),
  targetRole: z.string().describe('The target role for the employee.'),
  competencyGaps: z.string().describe('A description of the employee\'s competency gaps.'),
  experienceGaps: z.string().describe('A description of the employee\'s experience gaps.'),
});
export type CareerRoadmapInput = z.infer<typeof CareerRoadmapInputSchema>;

const CareerRoadmapOutputSchema = z.object({
  roadmap: z.string().describe('A visual roadmap of the employee\'s career progression, including milestones like trainings, projects, and mentorship opportunities.'),
});
export type CareerRoadmapOutput = z.infer<typeof CareerRoadmapOutputSchema>;

export async function generateCareerRoadmap(input: CareerRoadmapInput): Promise<CareerRoadmapOutput> {
  return generateCareerRoadmapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerRoadmapPrompt',
  input: {schema: CareerRoadmapInputSchema},
  output: {schema: CareerRoadmapOutputSchema},
  prompt: `You are a career development expert. Generate a personalized career roadmap for {{employeeName}} to reach the target role of {{targetRole}}. Consider the following competency and experience gaps:

Competency Gaps: {{competencyGaps}}
Experience Gaps: {{experienceGaps}}

Include specific trainings, projects, and mentorship opportunities as milestones in the roadmap. The roadmap should be easy to understand and visually appealing.`,
});

const generateCareerRoadmapFlow = ai.defineFlow(
  {
    name: 'generateCareerRoadmapFlow',
    inputSchema: CareerRoadmapInputSchema,
    outputSchema: CareerRoadmapOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
