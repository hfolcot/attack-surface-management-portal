import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { IVulnerability } from '../../interfaces/IVulnerabilities.interface';
import { DialogComponent } from '../../../core-components/dialog/dialog.component';
import { Chart, ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-vulnerabilities-dashboard',
  templateUrl: './vulnerabilities-dashboard.component.html',
  styleUrl: './vulnerabilities-dashboard.component.scss'
})
export class VulnerabilitiesDashboardComponent {

  //Services
  dataService = inject(DataService);
  destroyRef = inject(DestroyRef);

  //Data
  vulnerabilities!: IVulnerability[];

  // UI
  tableColumns: string[] = ["cveID", "vendorProject", "product", "dateAdded", "shortDescription"];
  dataSource!: MatTableDataSource<IVulnerability>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  tableTitle!: string;
  error!: string;
  dialog = inject(MatDialog);

  // Charts
  vendorProjectChartData!: ChartData;

  ngOnInit(): void {
    this.getData();
  }

  //--

  private getData(): void {
    const dataSubscription = this.dataService.getVulnerabilities()
      .subscribe({
        next: data => {
          console.log(data);
          this.vulnerabilities = data.vulnerabilities;
          this.dataSource = new MatTableDataSource<IVulnerability>(data.vulnerabilities)
          this.dataSource.paginator = this.paginator;
          this.tableTitle = data.title;
          this.createChartOptions();
        },
        error: (err) => {
          this.handleError();
        }
      })

    this.destroyRef.onDestroy(() => {
      dataSubscription.unsubscribe();
    })
  }

  private handleError(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: "An Error Occurred", message: "There was an error retrieving the data. Please try again.", confirmation: "Retry" },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getData();
    });
  }

  private createChartOptions(): void {
    const topTenVendorProjects = this.getTopTenVendorProjects();
    console.log(topTenVendorProjects)

    const labels = topTenVendorProjects.map(item => item.vendorProject);

    const data = topTenVendorProjects.map(item => item.count);

    this.vendorProjectChartData = {
      labels,
      datasets: [{
        label: 'Count',
        data
      }]
  
    };
  
  }

  private getTopTenVendorProjects(): {vendorProject: string, count: number}[] {
    const vendorProjectCounts = this.vulnerabilities.reduce((acc, vulnerability) => {
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
    })).sort((a, b) => b.count - a.count).slice(0, 10);
  }
}
