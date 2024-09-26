'use client';

import React, { useState } from 'react';
import { generateContent, analyzeContent } from '@/utils/api';
import { ContentType, ContentGenerationParams } from '@/types/content';
import ContentTypeSelector from './ContentTypeSelector';
import BlogPostForm from './BlogPostForm';
import SocialMediaForm from './SocialMediaForm';
import ProductDescriptionForm from './ProductDescriptionForm';
import EmailNewsletterForm from './EmailNewsletterForm';
import PressReleaseForm from './PressReleaseForm';

const Editor: React.FC = () => {
  const [contentType, setContentType] = useState<ContentType>(ContentType.BLOG_POST);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // State for BlogPost
  const [blogTopic, setBlogTopic] = useState('');
  const [blogKeywords, setBlogKeywords] = useState<string[]>([]);

  // State for SocialMedia
  const [platform, setPlatform] = useState('');
  const [goal, setGoal] = useState('');
  const [targetAudience, setTargetAudience] = useState('');

  // State for ProductDescription
  const [productName, setProductName] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);

  // State for EmailNewsletter
  const [subject, setSubject] = useState('');
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [audience, setAudience] = useState('');

  // State for PressRelease
  const [announcement, setAnnouncement] = useState('');
  const [companyInfo, setCompanyInfo] = useState('');
  const [quotes, setQuotes] = useState<string[]>([]);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      let params: ContentGenerationParams;

      switch (contentType) {
        case ContentType.BLOG_POST:
          params = {
            contentType: ContentType.BLOG_POST,
            topic: blogTopic,
            keywords: blogKeywords,
          };
          break;
        case ContentType.SOCIAL_MEDIA:
          params = {
            contentType: ContentType.SOCIAL_MEDIA,
            platform,
            goal,
            targetAudience,
          };
          break;
        case ContentType.PRODUCT_DESCRIPTION:
          params = {
            contentType: ContentType.PRODUCT_DESCRIPTION,
            productName,
            features,
            benefits,
          };
          break;
        case ContentType.EMAIL_NEWSLETTER:
          params = {
            contentType: ContentType.EMAIL_NEWSLETTER,
            subject,
            keyPoints,
            audience,
          };
          break;
        case ContentType.PRESS_RELEASE:
          params = {
            contentType: ContentType.PRESS_RELEASE,
            announcement,
            companyInfo,
            quotes,
          };
          break;
        default:
          throw new Error('Unsupported content type');
      }

      const { content, executionTime } = await generateContent(params);
      setGeneratedContent(content); // Only set the content string, not the entire object
      console.log(`Content generation took ${executionTime} ms`);
    } catch (error) {
      console.error('Error generating content:', error);
    }
    setIsLoading(false);
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const { analysis: analysisResult, executionTime } = await analyzeContent(generatedContent);
      setAnalysis(analysisResult);
      console.log(`Content analysis took ${executionTime} ms`);
    } catch (error) {
      console.error('Error analyzing content:', error);
    }
    setIsLoading(false);
  };

  const renderForm = () => {
    switch (contentType) {
      case ContentType.BLOG_POST:
        return (
          <BlogPostForm
            topic={blogTopic}
            keywords={blogKeywords}
            onTopicChange={setBlogTopic}
            onKeywordsChange={setBlogKeywords}
          />
        );
      case ContentType.SOCIAL_MEDIA:
        return (
          <SocialMediaForm
            platform={platform}
            goal={goal}
            targetAudience={targetAudience}
            onPlatformChange={setPlatform}
            onGoalChange={setGoal}
            onTargetAudienceChange={setTargetAudience}
          />
        );
      case ContentType.PRODUCT_DESCRIPTION:
        return (
          <ProductDescriptionForm
            productName={productName}
            features={features}
            benefits={benefits}
            onProductNameChange={setProductName}
            onFeaturesChange={setFeatures}
            onBenefitsChange={setBenefits}
          />
        );
      case ContentType.EMAIL_NEWSLETTER:
        return (
          <EmailNewsletterForm
            subject={subject}
            keyPoints={keyPoints}
            audience={audience}
            onSubjectChange={setSubject}
            onKeyPointsChange={setKeyPoints}
            onAudienceChange={setAudience}
          />
        );
      case ContentType.PRESS_RELEASE:
        return (
          <PressReleaseForm
            announcement={announcement}
            companyInfo={companyInfo}
            quotes={quotes}
            onAnnouncementChange={setAnnouncement}
            onCompanyInfoChange={setCompanyInfo}
            onQuotesChange={setQuotes}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg p-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Content Editor</h3>
      <ContentTypeSelector selectedType={contentType} onTypeChange={setContentType} />
      {renderForm()}
      <div className="mt-4 space-y-4">
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate Content
        </button>
        {generatedContent && (
          <>
            <div>
    <h4 className="text-md font-medium text-gray-900 mb-2">Generated Content:</h4>
    <p className="text-sm text-gray-600">{generatedContent}</p>
  </div>
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Analyze Content
            </button>
          </>
        )}
        {analysis && (
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-2">Content Analysis:</h4>
            <p className="text-sm text-gray-600">{analysis}</p>
          </div>
        )}
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Editor;