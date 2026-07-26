export interface DocumentModel {

  id: number;

  title: string;

  description: string;

  category: string;

  fileName: string;

  fileType: string;

  fileSize: number;

  uploadedBy: string;

  uploadedDate: Date;

  fileUrl: string;
}