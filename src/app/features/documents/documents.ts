import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocumentModel } from './models/document.model';
import { DocumentService } from '../../services/document.service';
import { AppHeader } from '../../shared/components/app-header/app-header';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, FormsModule, AppHeader],
  templateUrl: './documents.html',
  styleUrls: ['./documents.css']
})
export class Documents {

  //==========================
  // Toolbar
  //==========================

  searchText = '';

  selectedCategory = 'All';

  sortBy = 'Newest';

  categories = [
    'All',
    'Legal',
    'Finance',
    'Maintenance',
    'Safety',
    'General'
  ];

  sortOptions = [
    'Newest',
    'Oldest',
    'Name A-Z',
    'Name Z-A'
  ];

  //==========================
  // Upload Modal
  //==========================

  showUploadModal = false;

  title = '';

  description = '';

  category = 'General';

  selectedFiles: File[] = [];
  //==========================
  // Menu
  //==========================

  activeMenu: number | null = null;

  //==========================
  // Dummy Data
  //==========================

  documents: DocumentModel[] = [
    {
      id: 1,
      title: 'Society Registration Certificate',
      description: 'Government Approved Registration',
      category: 'Legal',
      fileName: 'registration.pdf',
      fileType: 'application/pdf',
      fileSize: 1200000,
      uploadedBy: 'Admin',
      uploadedDate: new Date(),
      fileUrl: ''
    },
    {
      id: 2,
      title: 'Fire Safety Certificate',
      description: 'Municipal Fire Approval',
      category: 'Safety',
      fileName: 'fire-safety.pdf',
      fileType: 'application/pdf',
      fileSize: 2400000,
      uploadedBy: 'Secretary',
      uploadedDate: new Date(),
      fileUrl: ''
    }
  ];

  openUp = false;

  constructor(private documentService: DocumentService){}

  //==========================
  // Statistics
  //==========================

  get totalDocuments(): number {

    return this.documents.length;

  }

  get totalPdf(): number {

    return this.documents.filter(x =>
      x.fileName.toLowerCase().endsWith('.pdf')).length;

  }

  get totalImages(): number {

    return this.documents.filter(x =>
      x.fileType.startsWith('image')).length;

  }

  get recentUploads(): number {

    return this.documents.length;

  }

  //==========================
  // Filtering
  //==========================

  get filteredDocuments(): DocumentModel[] {

    let data = this.documents.filter(document => {

      const search = this.searchText.toLowerCase();

      const matchesSearch =

        document.title.toLowerCase().includes(search)

        ||

        document.description.toLowerCase().includes(search)

        ||

        document.fileName.toLowerCase().includes(search);

      const matchesCategory =

        this.selectedCategory === 'All'

        ||

        document.category === this.selectedCategory;

      return matchesSearch && matchesCategory;

    });

    switch (this.sortBy) {

      case 'Newest':

        data.sort((a, b) =>
          new Date(b.uploadedDate).getTime() -
          new Date(a.uploadedDate).getTime());

        break;

      case 'Oldest':

        data.sort((a, b) =>
          new Date(a.uploadedDate).getTime() -
          new Date(b.uploadedDate).getTime());

        break;

      case 'Name A-Z':

        data.sort((a, b) =>
          a.title.localeCompare(b.title));

        break;

      case 'Name Z-A':

        data.sort((a, b) =>
          b.title.localeCompare(a.title));

        break;

    }

    return data;

  }

  //==========================
  // Upload
  //==========================

  openUploadModal() {

    this.showUploadModal = true;

  }

  closeUploadModal() {

    this.showUploadModal = false;

    this.clearForm();

  }

  onFileSelected(event: Event) {

    const input = event.target as HTMLInputElement;

    if (input.files?.length) {

      this.selectedFiles = [
        ...this.selectedFiles,
        ...Array.from(input.files)
      ];

    }

  }

  uploadDocument() {

    if(this.selectedFiles.length === 0){
      alert('Please select document');
      return;
    }

    const formData = new FormData();

    // Text Data
    formData.append(
      'title',
      this.title
    );

    formData.append(
      'description',
      this.description
    );

    formData.append(
      'category',
      this.category
    );

    formData.append(
      'uploadedBy',
      'Admin'
    );

    formData.append(
      'societyId',
      '101'
    );

    // Multiple Files
    this.selectedFiles.forEach(file => {

      formData.append(
        'files',
        file
      );

    });

    this.documentService.uploadDocuments(formData).subscribe({
        next:(response)=>{
          console.log(
            "Document uploaded",
            response
          );

          this.closeUploadModal();
        }, error:(error)=>{

          console.error(
            "Upload error",
            error
          );
        }
      });

  }

  loadDocuments(){

    this.documentService.getDocuments(101).subscribe({
          next:(res)=>{

            console.log(res);
            this.documents = res.data;
          }, error:(err)=>{

            console.error(err);

          }

        });

  }

  viewDocumentById(document: DocumentModel){

    this.documentService.getDocumentById(document.id).subscribe({
        next:(res)=>{

          console.log(
            "Document Detail",
            res
          );

        }, error:(err)=>{

          console.error(err);

        }

      });

  }

  delete(document: DocumentModel){

    this.documentService.deleteDocument(document.id).subscribe({
      next:(res)=>{
        console.log(
          "Deleted Successfully",
          res
        );
        // remove from UI
        this.documents =
          this.documents.filter(
            x => x.id !== document.id
          );
      }, error:(err)=>{

          console.error(
            "Delete failed",
            err
          )
      }

    });


  }

  //==========================
  // Actions
  //==========================

  download(doc: DocumentModel) {

    this.documentService.downloadDocument(doc.id).subscribe({
      next:(file: Blob)=>{

        const url = window.URL.createObjectURL(file);
        const link = window.document.createElement('a');
        link.href = url;
        link.download = doc.fileName;
        link.click();
        window.URL.revokeObjectURL(url);

      }, error:(error)=>{

        console.error(
          "Download failed",
          error
        );
      }
    });

  }

  toggleMenu(id: number, event: MouseEvent) {

    this.activeMenu =
      this.activeMenu === id ? null : id;

    if (this.activeMenu !== id) {
      return;
    }

    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const menuHeight = 150; // Approximate menu height
    const spaceBelow = window.innerHeight - rect.bottom;
    this.openUp = spaceBelow < menuHeight;

  }

  //==========================
  // Helpers
  //==========================

  formatFileSize(bytes: number): string {

    if (bytes < 1024)

      return bytes + ' B';

    if (bytes < 1024 * 1024)

      return (bytes / 1024).toFixed(1) + ' KB';

    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';

  }

  getFileIcon(fileName: string): string {

    const extension =
      fileName.split('.').pop()?.toLowerCase();

    switch (extension) {

      case 'pdf':

        return 'assets/icons/pdf.png';

      case 'doc':

      case 'docx':

        return 'assets/icons/word.png';

      case 'xls':

      case 'xlsx':

        return 'assets/icons/excel.png';

      case 'png':

      case 'jpg':

      case 'jpeg':

        return 'assets/icons/image.png';

      default:

        return 'assets/icons/file.png';

    }

  }

  clearForm() {

    this.title = '';
    this.description = '';
    this.category = 'General';
    this.selectedFiles = [];
  }

  removeFile(file: File) {

    this.selectedFiles =
      this.selectedFiles.filter(
        x => x !== file
      );

  }

}