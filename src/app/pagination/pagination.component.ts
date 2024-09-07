import { Component, ViewChild, ViewContainerRef, AfterViewInit, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @ViewChild("dynamicContainer", { read: ViewContainerRef }) container!: ViewContainerRef;
}



