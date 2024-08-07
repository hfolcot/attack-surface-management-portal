import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IVulnerabilities } from '../interfaces/IVulnerabilities.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private readonly http: HttpClient) { } 

  getVulnerabilities(): Observable<IVulnerabilities> { 
      return this.http.get<{vulnerabilitiesObject: IVulnerabilities}>( 
        'http://localhost:3000/api/vulnerabilities').pipe(map(
          response => {
            console.log(response);
            return response.vulnerabilitiesObject;
          }
        ));
  } 
}
