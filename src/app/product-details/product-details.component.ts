import { Component, Input, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonReaderService } from '../services/json-reader.service';
import { ImagesComponent } from '../images/images.component';
import { ImageComponent } from '../image/image.component';
import { LocalStorageService } from '../local-storage.service';
declare var $: any;
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ImagesComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements AfterViewInit {
  @Input() id!: number
  @Input() title!: string
  @Input() category!: string
  @Input() description!: string
  @Input() price!: number
  @Input() stock!: number
  @ViewChild(ImagesComponent) imagesComponent !: ImagesComponent
  @ViewChild('carousel', { static: true }) carousel!: ElementRef

  constructor(private route: ActivatedRoute, private jsonReader: JsonReaderService, private localStorage: LocalStorageService)
  {
    this.route.params.subscribe(params => {this.id= params['id']})
  }
  ngAfterViewInit(): void {
    fetch(`http://localhost:3000/product/${this.id}`)
    .then(response => {
      var f : boolean = true
      response.json().then(element =>{
        element = element.data
        this.title = element.title
        this.description = element.description
        this.category = element.category
        this.price = element.price
        this.stock = +element.stock
        if (this.stock)
        {
          const button = document.getElementById("AddToCart")
          button?.classList.remove("disabled")
          button?.classList.add("active")
        }
        for (const key of element.images)
        {
          const ComponentRef = this.imagesComponent.container.createComponent(ImageComponent);
          ComponentRef.instance.image = key
          const cardElement = ComponentRef.location.nativeElement;
          cardElement.classList.add('carousel-item')
          if (f)
            cardElement.classList.add('active'), f = false
        }
      })
      })
      this.refreshCarousel()
    }
    public addToCart() : void{
      fetch('http://localhost:3000/user', {
        method: 'GET',
        headers: {
          accesstoken: this.localStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .then(data => {
        if (!data.success)
        {
          alert('Please login to add products to cart')
          return
        }
      var quantity : any = (document.querySelector("input")?.value)
      fetch('http://localhost:3000/cart', {
        method: 'POST',
        headers: {
          accesstoken: this.localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({productId: this.id, quantity})
      })
      .then(response => response.json())
      .then(data => {
        if (data.success)
        alert('Product added to cart')
        else
        alert(data.message)
      })
    })
  }

  refreshCarousel(): void {
    const nativeElement = this.carousel.nativeElement

    $(nativeElement).carousel('dispose')
    $(nativeElement).carousel()
  }
}
