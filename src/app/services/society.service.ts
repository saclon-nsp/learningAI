import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CreateSocietyResponse {
  id: string;
  message?: string;
}

/**
 * Creates a society with one transactional request. The API receives a JSON
 * `payload` part and named file parts (for example, `chairmanPhoto`).
 */
@Injectable({ providedIn: 'root' })
export class SocietyService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

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
