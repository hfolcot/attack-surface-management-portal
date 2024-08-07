import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { VulnerabilitiesService } from '../../services/vulnerabilities.service';
import { IVulnerability } from '../../interfaces/IVulnerabilities.interface';
import { DialogComponent } from '../../../core-components/dialog/dialog.component';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-vulnerabilities-dashboard',
  templateUrl: './vulnerabilities-dashboard.component.html',
  styleUrl: './vulnerabilities-dashboard.component.scss'
})
export class VulnerabilitiesDashboardComponent {

  //Services
  vulnerabilitiesService = inject(VulnerabilitiesService);
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
  vulnerabilitiesByMonthChartData!: ChartData;
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  ngOnInit(): void {
    this.getData();
  }

  //--

  private getData(): void {
    const dataSubscription = this.vulnerabilitiesService.getVulnerabilities()
      .subscribe({
        next: data => {
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
    this.createTopTenVendorProjectsChartOptions();
    this.vulnerabilitiesByMonthChartData = this.createVulnerabilitiesPerMonthChartOptions();
  }

  private createTopTenVendorProjectsChartOptions(): void {
    const topTenVendorProjects = this.vulnerabilitiesService.getTopXVendorProjects(this.vulnerabilities, 10);

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

  private createVulnerabilitiesPerMonthChartOptions(): ChartData {
    return {
      labels: this.months,
      datasets: [{
        label: 'Count',
        data: this.vulnerabilitiesService.getVulnerabilitiesPerMonth(this.vulnerabilities)
      }]}
  }
}
