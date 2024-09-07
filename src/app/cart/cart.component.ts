import { Component, AfterViewInit, ViewChild, ViewContainerRef} from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { CartCardComponent } from '../cart-card/cart-card.component';
import { JsonReaderService } from '../services/json-reader.service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements AfterViewInit{
  @ViewChild("dynamicContainer", { read: ViewContainerRef }) container!: ViewContainerRef;
  constructor(private localStorage : LocalStorageService, private jsonReader: JsonReaderService){}
  ngAfterViewInit(): void {
    const cart : Array<{id: number, quantity: number}> = JSON.parse(this.localStorage.getItem("Cart"))
    const products = this.jsonReader.getJsonData('products.json').subscribe()
    cart.forEach((product : {id: number, quantity: number}) =>
    {
      this.jsonReader.getJsonData('products.json').subscribe(data => {
        var f : boolean = true
        data.forEach((element : any) => {
          if(element.id == product.id)
          {
            const componentRef = this.container.createComponent(CartCardComponent)
            componentRef.instance.image = element.thumbnail
            componentRef.instance.id = element.id
            componentRef.instance.price = element.price
            componentRef.instance.quantity = product.quantity
            componentRef.instance.title = element.title

          }
        });
      });
    })
    for (const product  in cart)
    {

    }


  }
}
