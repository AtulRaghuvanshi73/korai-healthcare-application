'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HealthParameterSchema = z.object({
  name: z.string().describe('The name of the health parameter.'),
  value: z.string().describe('The value of the health parameter.'),
  unit: z.string().describe('The unit of the health parameter.'),
  normalRange: z.string().describe('The normal range for the health parameter, including units.'),
});

export type HealthParameter = z.infer<typeof HealthParameterSchema>;

const FlagAbnormalValuesInputSchema = z.array(HealthParameterSchema).describe('An array of health parameters to check.');
export type FlagAbnormalValuesInput = z.infer<typeof FlagAbnormalValuesInputSchema>;

const FlagAbnormalValuesOutputSchema = z.array(
  HealthParameterSchema.extend({
    needsAttention: z.boolean().describe('Whether the health parameter value is outside the normal range and needs attention.'),
  })
);

export type FlagAbnormalValuesOutput = z.infer<typeof FlagAbnormalValuesOutputSchema>;

export async function flagAbnormalValues(input: FlagAbnormalValuesInput): Promise<FlagAbnormalValuesOutput> {
  return flagAbnormalValuesFlow(input);
}

const flagAbnormalValuesPrompt = ai.definePrompt({
  name: 'flagAbnormalValuesPrompt',
  input: {schema: FlagAbnormalValuesInputSchema},
  output: {schema: FlagAbnormalValuesOutputSchema},
  prompt: `You are a medical expert reviewing health parameters and flagging values that are outside the normal range.

For each health parameter in the input, determine if the value is within the normal range. If it is not, set the needsAttention field to true. Otherwise, set it to false. Preserve all the other fields of the input.

Input:
{{#each this}}
  Name: {{name}}
  Value: {{value}} {{unit}}
  Normal Range: {{normalRange}}
{{/each}}`,
});

const flagAbnormalValuesFlow = ai.defineFlow(
  {
    name: 'flagAbnormalValuesFlow',
    inputSchema: FlagAbnormalValuesInputSchema,
    outputSchema: FlagAbnormalValuesOutputSchema,
  },
  async input => {
    const {output} = await flagAbnormalValuesPrompt(input);
    return output!;
  }
);
