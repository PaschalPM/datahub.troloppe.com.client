import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_API_URL, apiHttpOptions } from '../../configs/global';

@Injectable({
  providedIn: 'root',
})
export class TempImageUploaderService {
  constructor(private http: HttpClient) {}

  store(formData: FormData) {
    return this.http.post<{ image_tmp_url: string }>(
      `${BASE_API_URL}/store-temp-image`,
      formData,
    );
  }

}
