import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class HttpsService {

  constructor(private httpClient: HttpClient) {}

  getEngWords(word: string): Observable<any> {
    return this.httpClient.get(`http://beamlab.com/api/get-eng.php?sana=${word}`);
  }

  getFinWords(word: string): Observable<any> {
    return this.httpClient.get(`http://beamlab.com/api/get-fin.php?sana=${word}`);
  }
}
