import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  SocietyStep1Model,
  SocietyStep1Files,
  SocietyStep2Model,
  SocietyStep3Model,
  SocietyStep3Files,
  SocietyStep4Model,
  SocietyStep4Files,
  StepSaveResponse
} from '../features/society/create-society/models';

export interface CreateSocietyResponse {
  id: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class SocietyService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * API 1: Save Step 1 - Basic Information, Address, Bank & Documents
   * POST /v1/societies/step1
   */
  saveStep1(data: SocietyStep1Model, files?: SocietyStep1Files): Observable<StepSaveResponse> {
    const formData = new FormData();
    formData.append('payload', JSON.stringify(data));

    if (files?.societyLogo) {
      formData.append('societyLogo', files.societyLogo, files.societyLogo.name);
    }
    if (files?.registrationCertificate) {
      formData.append('registrationCertificate', files.registrationCertificate, files.registrationCertificate.name);
    }

    return this.http.post<StepSaveResponse>(`${this.apiUrl}/v1/societies/step1`, formData);
  }

  /**
   * API 2: Save Step 2 - Building Configuration, Amenities & Facilities
   * POST /v1/societies/step2
   */
  saveStep2(data: SocietyStep2Model): Observable<StepSaveResponse> {
    return this.http.post<StepSaveResponse>(`${this.apiUrl}/v1/societies/step2`, data);
  }

  /**
   * API 3: Save Step 3 - Managing Committee Members & Admin Staff
   * POST /v1/societies/step3
   */
  saveStep3(data: SocietyStep3Model, files?: SocietyStep3Files): Observable<StepSaveResponse> {
    const formData = new FormData();
    formData.append('payload', JSON.stringify(data));

    if (files) {
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          formData.append(key, file, file.name);
        }
      });
    }

    return this.http.post<StepSaveResponse>(`${this.apiUrl}/v1/societies/step3`, formData);
  }

  /**
   * API 4: Save Step 4 - Society Staff, Final Review & Declaration
   * POST /v1/societies/step4
   */
  saveStep4(data: SocietyStep4Model, files?: SocietyStep4Files): Observable<StepSaveResponse> {
    const formData = new FormData();
    formData.append('payload', JSON.stringify(data));

    if (files) {
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          formData.append(key, file, file.name);
        }
      });
    }

    return this.http.post<StepSaveResponse>(`${this.apiUrl}/v1/societies/step4`, formData);
  }

  /**
   * Legacy / One-shot Transactional Society Creation
   */
  createSociety(
    values: Record<string, unknown>,
    additionalFiles: Record<string, File | null>
  ): Observable<CreateSocietyResponse> {
    const formData = new FormData();
    const payload: Record<string, unknown> = {};

    Object.entries(values).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value, value.name);
      } else {
        payload[key] = value;
      }
    });

    Object.entries(additionalFiles).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file, file.name);
      }
    });

    formData.append('payload', JSON.stringify(payload));
    return this.http.post<CreateSocietyResponse>(`${this.apiUrl}/v1/societies`, formData);
  }
}
