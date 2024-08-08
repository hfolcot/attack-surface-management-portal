import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { VulnerabilitiesService } from '../../services/vulnerabilities.service';
import { IVulnerabilities, IVulnerability } from '../../interfaces/IVulnerabilities.interface';
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
  loading: boolean = false;

  // UI
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  tableColumns: string[] = ["cveID", "vendorProject", "product", "dateAdded", "shortDescription"];
  dataSource!: MatTableDataSource<IVulnerability>;
  tableTitle!: string;
  error!: string;
  dialog = inject(MatDialog);

  // Charts
  vendorProjectChartData!: ChartData;
  vulnerabilitiesByMonthChartData!: ChartData;

  ngOnInit(): void {
    this.getData();
  }

  //--

  private getData(): void {
    this.loading = true;

    const dataSubscription = this.vulnerabilitiesService.getVulnerabilities()
      .subscribe({
        next: data => {
          this.vulnerabilities = data.vulnerabilities;
          this.createTableOptions(data);
          this.createChartOptions();
        },
        error: (err) => {
          this.handleError();
        },
        complete: () => this.loading = false
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

  private createTableOptions(data: IVulnerabilities): void {
    this.dataSource = new MatTableDataSource<IVulnerability>(data.vulnerabilities)
    this.dataSource.paginator = this.paginator;
    this.tableTitle = data.title;
  }

  private createChartOptions(): void {
    this.vendorProjectChartData = this.vulnerabilitiesService.createTopTenVendorProjectsChartOptions(this.vulnerabilities);
    this.vulnerabilitiesByMonthChartData = this.vulnerabilitiesService.createVulnerabilitiesPerMonthChartOptions(this.vulnerabilities);
  }

}
