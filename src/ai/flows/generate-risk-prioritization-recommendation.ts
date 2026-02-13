'use server';
/**
 * @fileOverview An AI agent that analyzes global risk problems and recommends a prioritization status.
 *
 * - generateRiskPrioritizationRecommendation - A function that handles the risk prioritization recommendation process.
 * - GenerateRiskPrioritizationRecommendationInput - The input type for the generateRiskPrioritizationRecommendation function.
 * - GenerateRiskPrioritizationRecommendationOutput - The return type for the generateRiskPrioritizationRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRiskPrioritizationRecommendationInputSchema = z.object({
  title: z.string().describe('The title of the global risk problem.'),
  description: z.string().describe('A detailed description of the global risk problem.'),
  location: z.string().describe('The geographical location where the problem is occurring.'),
  category: z.string().describe('The category of the problem (e.g., Social, Environmental, Health, Technology, Economy).'),
  tags: z.array(z.string()).describe('A list of relevant tags or keywords associated with the problem.'),
});
export type GenerateRiskPrioritizationRecommendationInput = z.infer<typeof GenerateRiskPrioritizationRecommendationInputSchema>;

const PrioritizationStatusSchema = z.enum(['CRITICAL', 'WARNING', 'NORMAL']);

const GenerateRiskPrioritizationRecommendationOutputSchema = z.object({
  prioritizationStatus: PrioritizationStatusSchema.describe('The recommended prioritization status for the problem.'),
  explanation: z.string().describe('A brief explanation of the reasoning behind the recommended prioritization status.'),
});
export type GenerateRiskPrioritizationRecommendationOutput = z.infer<typeof GenerateRiskPrioritizationRecommendationOutputSchema>;

export async function generateRiskPrioritizationRecommendation(input: GenerateRiskPrioritizationRecommendationInput): Promise<GenerateRiskPrioritizationRecommendationOutput> {
  return generateRiskPrioritizationRecommendationFlow(input);
}

const prioritizationPrompt = ai.definePrompt({
  name: 'prioritizationPrompt',
  input: {schema: GenerateRiskPrioritizationRecommendationInputSchema},
  output: {schema: GenerateRiskPrioritizationRecommendationOutputSchema},
  prompt: `You are an expert global risk analyst for ProblemPulse. Your task is to analyze submitted global risk problems and assign a prioritization status (CRITICAL, WARNING, or NORMAL) along with a brief explanation.

Consider the title, description, location, category, and tags to determine the appropriate status. A CRITICAL status indicates an immediate and severe threat requiring urgent attention. A WARNING status suggests a significant potential risk that needs monitoring. A NORMAL status indicates a lower-level risk or one that is currently stable.

Problem Details:
Title: {{{title}}}
Description: {{{description}}}
Location: {{{location}}}
Category: {{{category}}}
Tags: {{#each tags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
`,
});

const generateRiskPrioritizationRecommendationFlow = ai.defineFlow(
  {
    name: 'generateRiskPrioritizationRecommendationFlow',
    inputSchema: GenerateRiskPrioritizationRecommendationInputSchema,
    outputSchema: GenerateRiskPrioritizationRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prioritizationPrompt(input);
    return output!;
  }
);
