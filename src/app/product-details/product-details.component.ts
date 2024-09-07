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
  @ViewChild(ImagesComponent) imagesComponent !: ImagesComponent
  @ViewChild('carousel', { static: true }) carousel!: ElementRef

  constructor(private route: ActivatedRoute, private jsonReader: JsonReaderService, private localStorage: LocalStorageService)
  {
    this.route.params.subscribe(params => {this.id= params['id']})
  }
  ngAfterViewInit(): void {
    this.jsonReader.getJsonData('products.json').subscribe(data => {
      var f : boolean = true
      data.forEach((element : any) => {
        if(element.id == this.id)
        {
          this.title = element.title
          this.description = element.description
          this.category = element.category
          this.price = element.price
          for (const key of element.images)
          {
            const ComponentRef = this.imagesComponent.container.createComponent(ImageComponent);
            ComponentRef.instance.image = key
            const cardElement = ComponentRef.location.nativeElement;
            cardElement.classList.add('carousel-item')
            if (f)
              cardElement.classList.add('active'), f = false
          }
        }
      });
    });
    this.refreshCarousel()
  }
  public addToCart() : void{
    var cart : any = (this.localStorage.getItem("Cart"))
    console.log(cart)
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
        element.quantity++
        this.localStorage.setItem("Cart", JSON.stringify(cart))
        alert("added to cart")
        found = true;
      }
    });
    if (!found)
    {

      cart.push({id:this.id, quantity:1})
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
