export enum ContentType {
    BLOG_POST = 'blogPost',
    SOCIAL_MEDIA = 'socialMedia',
    PRODUCT_DESCRIPTION = 'productDescription',
    EMAIL_NEWSLETTER = 'emailNewsletter',
    PRESS_RELEASE = 'pressRelease'
  }
  
  export type ContentGenerationParams = {
    contentType: ContentType;
  } & (
    | { contentType: ContentType.BLOG_POST; topic: string; keywords: string[] }
    | { contentType: ContentType.SOCIAL_MEDIA; platform: string; goal: string; targetAudience: string }
    | { contentType: ContentType.PRODUCT_DESCRIPTION; productName: string; features: string[]; benefits: string[] }
    | { contentType: ContentType.EMAIL_NEWSLETTER; subject: string; keyPoints: string[]; audience: string }
    | { contentType: ContentType.PRESS_RELEASE; announcement: string; companyInfo: string; quotes: string[] }
  );
  
  export interface GeneratedContent {
    id: string;
    content: string;
    contentType: ContentType;
    createdAt: Date;
  }