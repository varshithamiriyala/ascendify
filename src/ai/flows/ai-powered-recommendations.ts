// This is a server-side file.
'use server';

/**
 * @fileOverview AI-powered recommendation flow for personalized training, mentorship, and project opportunities.
 *
 * - generateRecommendations - A function that generates personalized recommendations.
 * - RecommendationInput - The input type for the generateRecommendations function.
 * - RecommendationOutput - The return type for the generateRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendationInputSchema = z.object({
  employeeId: z.string().describe('The ID of the employee.'),
  competencyGaps: z.array(z.string()).describe('The competency gaps of the employee.'),
  experienceGaps: z.array(z.string()).describe('The experience gaps of the employee.'),
  targetRole: z.string().describe('The target role of the employee.'),
});
export type RecommendationInput = z.infer<typeof RecommendationInputSchema>;

const RecommendationOutputSchema = z.object({
  trainingRecommendations: z.array(z.string()).describe('Recommended training programs.'),
  mentorshipRecommendations: z.array(z.string()).describe('Recommended mentors.'),
  projectRecommendations: z.array(z.string()).describe('Recommended projects.'),
});
export type RecommendationOutput = z.infer<typeof RecommendationOutputSchema>;


const getTrainingRecommendation = ai.defineTool({
  name: 'getTrainingRecommendation',
  description: 'Recommends training programs based on competency and experience gaps.',
  inputSchema: z.object({
    gap: z.string().describe('A specific competency or experience gap to address.'),
    targetRole: z.string().describe('The target role of the employee.'),
  }),
  outputSchema: z.string(),
}, async (input) => {
  // In a real application, this would fetch training recommendations from a database or API.
  // For this example, we'll just return a placeholder.
  return `Recommended Training for ${input.gap} to achieve ${input.targetRole}: [Placeholder Training]`;
});

const getMentorshipRecommendation = ai.defineTool({
  name: 'getMentorshipRecommendation',
  description: 'Recommends mentors based on competency and experience gaps.',
  inputSchema: z.object({
    gap: z.string().describe('A specific competency or experience gap to address.'),
    targetRole: z.string().describe('The target role of the employee.'),
  }),
  outputSchema: z.string(),
}, async (input) => {
  // In a real application, this would fetch mentor recommendations from a database or API.
  // For this example, we'll just return a placeholder.
  return `Recommended Mentor for ${input.gap} to achieve ${input.targetRole}: [Placeholder Mentor]`;
});

const getProjectRecommendation = ai.defineTool({
  name: 'getProjectRecommendation',
  description: 'Recommends projects based on competency and experience gaps.',
  inputSchema: z.object({
    gap: z.string().describe('A specific competency or experience gap to address.'),
    targetRole: z.string().describe('The target role of the employee.'),
  }),
  outputSchema: z.string(),
}, async (input) => {
  // In a real application, this would fetch project recommendations from a database or API.
  // For this example, we'll just return a placeholder.
  return `Recommended Project for ${input.gap} to achieve ${input.targetRole}: [Placeholder Project]`;
});

const recommendationPrompt = ai.definePrompt({
  name: 'recommendationPrompt',
  input: { schema: RecommendationInputSchema },
  output: { schema: RecommendationOutputSchema },
  tools: [getTrainingRecommendation, getMentorshipRecommendation, getProjectRecommendation],
  system: `You are an AI career coach providing personalized recommendations for training, mentorship, and projects to address competency and experience gaps.
  The employee's goal is the target role: {{{targetRole}}}.
  Use the provided tools to identify specific opportunities that align with their development needs.
  Decide, based on the competency and experience gaps, whether a training, mentorship, or project opportunity would be most appropriate. 
  Return all three, but tailor the recommendation to focus on the most relevant type of opportunity.`,
  prompt: `Employee ID: {{{employeeId}}}
Competency Gaps: {{#each competencyGaps}}{{{this}}}, {{/each}}
Experience Gaps: {{#each experienceGaps}}{{{this}}}, {{/each}}`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const generateRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateRecommendationsFlow',
    inputSchema: RecommendationInputSchema,
    outputSchema: RecommendationOutputSchema,
  },
  async input => {
    const { output } = await recommendationPrompt(input);
    return output!;
  }
);

export async function generateRecommendations(input: RecommendationInput): Promise<RecommendationOutput> {
  return generateRecommendationsFlow(input);
}

export type {RecommendationInput, RecommendationOutput};
