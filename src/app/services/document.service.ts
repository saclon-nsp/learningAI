import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


export interface DocumentUpload {

  title: string;

  description: string;

  category: string;

  uploadedBy: string;

  societyId: number;

}


@Injectable({
  providedIn: 'root'
})
export class DocumentService {


  private apiUrl = environment.apiUrl;


  constructor(
    private http: HttpClient
  ) {}

  // =====================================
  // Upload Multiple Documents
  // =====================================

  uploadDocuments(formData: FormData) {

    return this.http.post<any>(
      `${this.apiUrl}/v1/documents/upload`,
      formData
    );

  }

  // =====================================
  // Get All Documents
  // =====================================

  getDocuments(societyId:number) {

    return this.http.get<any>(
      `${this.apiUrl}/v1/documents/${societyId}`
    );

  }

  // =====================================
  // Get Document By Id
  // =====================================

  getDocumentById(id:number) {

    return this.http.get<any>(
      `${this.apiUrl}/v1/documents/${id}`
    );

  }

  // =====================================
  // Download Document
  // =====================================

  downloadDocument(id:number) {

    return this.http.get(
      `${this.apiUrl}/v1/documents/download/${id}`,
      {
        responseType:'blob'
      }
    );

  }
  
  // =====================================
  // Delete Document
  // =====================================

  deleteDocument(id:number) {

    return this.http.delete<any>(
      `${this.apiUrl}/v1/documents/${id}`
    );

  }

}