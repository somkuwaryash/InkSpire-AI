// src/services/databaseService.ts

export enum ContentType {
    BLOG_POST = 'BLOG_POST',
    SOCIAL_MEDIA = 'SOCIAL_MEDIA',
    PRODUCT_DESCRIPTION = 'PRODUCT_DESCRIPTION',
    EMAIL_NEWSLETTER = 'EMAIL_NEWSLETTER',
    PRESS_RELEASE = 'PRESS_RELEASE'
  }
  
  interface ContentVersion {
    id: string;
    content: string;
    versionNumber: number;
    createdAt: Date;
  }
  
  interface ContentFile {
    id: string;
    name: string;
    contentType: ContentType;
    projectId: string;
    versions: ContentVersion[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  class DatabaseService {
    private contentFiles: ContentFile[] = [];
  
    private generateId(): string {
      return Math.random().toString(36).substr(2, 9);
    }
  
    async createContentFile(projectId: string, name: string, contentType: ContentType, content: string): Promise<ContentFile> {
      const newFile: ContentFile = {
        id: this.generateId(),
        name,
        contentType,
        projectId,
        versions: [{
          id: this.generateId(),
          content,
          versionNumber: 1,
          createdAt: new Date()
        }],
        createdAt: new Date(),
        updatedAt: new Date()
      };
  
      this.contentFiles.push(newFile);
      return newFile;
    }
  
    async getContentFileById(id: string): Promise<ContentFile | undefined> {
      return this.contentFiles.find(file => file.id === id);
    }
  
    async updateContentFile(id: string, data: { name?: string; content?: string }): Promise<ContentFile | undefined> {
      const fileIndex = this.contentFiles.findIndex(file => file.id === id);
      if (fileIndex === -1) return undefined;
  
      const file = this.contentFiles[fileIndex];
      const latestVersion = file.versions[file.versions.length - 1];
  
      const updatedFile: ContentFile = {
        ...file,
        name: data.name || file.name,
        updatedAt: new Date(),
        versions: [
          ...file.versions,
          {
            id: this.generateId(),
            content: data.content || latestVersion.content,
            versionNumber: latestVersion.versionNumber + 1,
            createdAt: new Date()
          }
        ]
      };
  
      this.contentFiles[fileIndex] = updatedFile;
      return updatedFile;
    }
  
    async getContentVersions(contentFileId: string): Promise<ContentVersion[]> {
      const file = this.contentFiles.find(file => file.id === contentFileId);
      return file ? file.versions : [];
    }
  }
  
  export const databaseService = new DatabaseService();