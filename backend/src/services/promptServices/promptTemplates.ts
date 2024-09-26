import { ContentType } from './contentTypes';

type PromptParams = {
  [ContentType.BLOG_POST]: { topic: string; keywords: string[] };
  [ContentType.SOCIAL_MEDIA]: { platform: string; goal: string; targetAudience: string };
  [ContentType.PRODUCT_DESCRIPTION]: { productName: string; features: string[]; benefits: string[] };
  [ContentType.EMAIL_NEWSLETTER]: { subject: string; keyPoints: string[]; audience: string };
  [ContentType.PRESS_RELEASE]: { announcement: string; companyInfo: string; quotes: string[] };
};

export const promptTemplates: {
  [K in ContentType]: (params: PromptParams[K]) => string;
} = {
  [ContentType.BLOG_POST]: ({ topic, keywords }) => `
Write a comprehensive blog post on the topic: "${topic}".
Incorporate the following keywords: ${keywords.join(', ')}.
Structure the post with an engaging introduction, 3-5 main points with subheadings, and a conclusion.
Use a conversational yet informative tone, and include relevant examples or statistics where appropriate.
Aim for a word count of approximately 800-1200 words.
`,
  [ContentType.SOCIAL_MEDIA]: ({ platform, goal, targetAudience }) => `
Create a ${platform} post with the goal of ${goal}.
Target audience: ${targetAudience}
Use an appropriate tone and style for ${platform}.
Include relevant hashtags and a call-to-action.
Keep the content concise and engaging, optimized for ${platform}'s best practices.
`,
  [ContentType.PRODUCT_DESCRIPTION]: ({ productName, features, benefits }) => `
Write a compelling product description for ${productName}.
Key features:
${features.map(feature => `- ${feature}`).join('\n')}
Key benefits:
${benefits.map(benefit => `- ${benefit}`).join('\n')}
Highlight the unique selling points and how the product solves customer problems.
Use persuasive language and sensory details where appropriate.
Include a strong call-to-action at the end.
`,
  [ContentType.EMAIL_NEWSLETTER]: ({ subject, keyPoints, audience }) => `
Craft an engaging email newsletter on the subject: "${subject}"
Key points to cover:
${keyPoints.map(point => `- ${point}`).join('\n')}
Target audience: ${audience}
Use a friendly yet professional tone. Start with an attention-grabbing opening.
Break the content into scannable sections with subheadings.
Include a clear call-to-action and sign off with a personal touch.
`,
  [ContentType.PRESS_RELEASE]: ({ announcement, companyInfo, quotes }) => `
Write a press release for the following announcement: "${announcement}"
Company Information: ${companyInfo}
Include the following quotes:
${quotes.map(quote => `- "${quote}"`).join('\n')}
Follow the inverted pyramid structure: start with the most important information.
Use a formal, objective tone. Include a dateline and 'For Immediate Release' at the top.
End with contact information and a brief company boilerplate.
`
};