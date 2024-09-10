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

      fetch('http://localhost:3000/cart', {
        method: "GET",
        headers: {
          accesstoken: this.localStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .then(data => {
        if (!data.success && data.error_msg != 'Cart not found')
        {
          alert('Please login to add products to cart')
          return
        }
        data = data.data
        data.products.forEach((element : any) => {
          fetch(`http://localhost:3000/product/${element.productId}`,
          {
            method: "GET"
          })
          .then(response => response.json())
          .then(data => {
            data = data.data
            const componentRef = this.container.createComponent(CartCardComponent)
            componentRef.instance.image = data.images[0]
            componentRef.instance.id = data._id
            componentRef.instance.price = data.price
            componentRef.instance.quantity = element.quantity
            componentRef.instance.title = data.title
          });
          })
        });
      }


  }

