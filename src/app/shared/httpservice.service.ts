import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class HttpHelperService {

  private headers = {
    'Content-Type': 'application/json',
    'Authorization': 'AccessToken:navaseelan'
  };

  constructor(private http: HttpClient) {
  }

  get(host: string, url: string, isAuthRequired: boolean): Observable<any> {
    if (isAuthRequired) {
      return this.http.get(host + url, { headers: this.headers });
    }
    return this.http.get(host + url);
  }

  post(host: string, obj: object, url: string, isAuthRequired: boolean): Observable<any> {
    if (isAuthRequired) {
      return this.http.post(host + url, obj, { headers: this.headers });
    }
    return this.http.post(host + url, obj);
  }

  delete(host: string, url: string, isAuthRequired: boolean): Observable<any> {
    if (isAuthRequired) {
      return this.http.delete(host + url, { headers: this.headers });
    }
    return this.http.delete(host + url);
  }

  put(host: string, obj: object, url: string, isAuthRequired: boolean): Observable<any> {
    if (isAuthRequired) {
      return this.http.put(host + url, obj, { headers: this.headers });
    }
    return this.http.put(host + url, obj);
  }
}
