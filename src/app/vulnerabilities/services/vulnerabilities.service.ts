import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IVulnerabilities, IVulnerability } from '../interfaces/IVulnerabilities.interface';

@Injectable({
  providedIn: 'root'
})
export class VulnerabilitiesService {
  constructor(private readonly http: HttpClient) { } 

  getVulnerabilities(): Observable<IVulnerabilities> { 
      return this.http.get<{vulnerabilitiesObject: IVulnerabilities}>( 
        'http://localhost:3000/api/vulnerabilities').pipe(map(
          response => {
            return response.vulnerabilitiesObject;
          }
        ));
  } 

  getVulnerabilitiesPerMonth(vulnerabilities: IVulnerability[]): number[] {
    const countPerMonth = vulnerabilities.reduce((acc, vulnerability) => {
      const { dateAdded } = vulnerability;
      const month = new Date(dateAdded).getMonth();
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month]++;
      return acc;
    }, {} as Record<number, number>);

    return Object.entries(countPerMonth).map(item => item[1]);
  }

  getTopXVendorProjects(vulnerabilities: IVulnerability[], count: number): { vendorProject: string, count: number }[] {
    const vendorProjectCounts = vulnerabilities.reduce((acc, vulnerability) => {
      const { vendorProject } = vulnerability;
      if (!acc[vendorProject]) {
        acc[vendorProject] = 0;
      }
      acc[vendorProject]++;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(vendorProjectCounts).map(([vendorProject, count]) => ({
      vendorProject,
      count,
    })).sort((a, b) => b.count - a.count).slice(0, count);
  }
}
