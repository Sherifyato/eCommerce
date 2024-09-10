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
          console.log(key)
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
    var quantity : any = (document.querySelector("input")?.value)
    var cart : any = (this.localStorage.getItem("Cart"))
    if (cart != '{}')
      cart = JSON.parse(cart)
    else
      cart = []
    if (cart.isArray == false)
    {

    }
    var found :boolean = false;
    cart.forEach((element: {id:number, quantity:number}) => {
      if (+element.id == this.id)
      {
        element.quantity = +(element.quantity) + +(quantity)
        this.localStorage.setItem("Cart", JSON.stringify(cart))
        alert("added to cart")
        found = true;
      }
    });
    if (!found)
    {

      cart.push({id:this.id, quantity:quantity})
      this.localStorage.setItem("Cart", JSON.stringify(cart))
      alert("added to cart")
    }
  }
  refreshCarousel(): void {
    const nativeElement = this.carousel.nativeElement

    $(nativeElement).carousel('dispose')
    $(nativeElement).carousel()
  }
}
