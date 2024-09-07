import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonReaderService {
  constructor(private http: HttpClient) {}

  getJsonData(path : string): Observable<any> {
    console.log(this.http.get(path));
    return this.http.get(path);
  }
}
