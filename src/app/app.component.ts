import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';
import { HeaderComponent } from './core-components/header/header.component';
import { CardComponent } from './core-components/card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  dataService = inject(DataService);

  ngOnInit(): void {
    this.dataService.getMessage().subscribe(data => console.log(data))
  }

  //--

  private getData(): void {
    
  }
}
