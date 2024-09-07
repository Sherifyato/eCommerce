import { Component, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [],
  templateUrl: './images.component.html',
  styleUrl: './images.component.css'
})
export class ImagesComponent {
  @ViewChild("dynamicContainer", { read: ViewContainerRef }) container!: ViewContainerRef;
  
}
