import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const BASE_API_URL = environment.baseApiURL;

export const apiHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
};
