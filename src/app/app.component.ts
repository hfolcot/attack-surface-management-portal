import { Component, inject, DestroyRef, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';
import { HeaderComponent } from './core-components/header/header.component';
import { CardComponent } from './core-components/card/card.component';
import { IVulnerability } from './interfaces/IVulnerabilities.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './core-components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CardComponent, MatTableModule, MatPaginatorModule, MatSortModule, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  //Services
  dataService = inject(DataService);
  destroyRef = inject(DestroyRef);

  // UI
  tableColumns: string[] = ["cveID", "vendorProject", "product", "dateAdded", "shortDescription"];
  dataSource!: MatTableDataSource<IVulnerability>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  tableTitle!: string;
  error!: string;
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getData();
  }

  //--

  private getData(): void {
    const dataSubscription = this.dataService.getVulnerabilities()
      .subscribe({
        next: data => {
          console.log(data);
          this.dataSource = new MatTableDataSource<IVulnerability>(data.vulnerabilities)
          this.dataSource.paginator = this.paginator;
          this.tableTitle = data.title;
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
}
