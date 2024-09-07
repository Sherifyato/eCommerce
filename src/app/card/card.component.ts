import { Component, Input, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core'; // Correct
import { StarFullComponent } from '../star-full/star-full.component';
import { StarComponent } from '../star/star.component';
import { StarHalfComponent } from '../star-half/star-half.component';
import { OutOfStockComponent } from '../out-of-stock/out-of-stock.component';
import { InStockComponent } from '../in-stock/in-stock.component';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements AfterViewInit {
  @Input() title!: string;
  @Input() stockStatus!: string;
  @Input() price!: string;
  @Input() details!: string;
  @Input() image!: string;
  @Input() reviews!: number;
  @Input() Id!: number;

  @ViewChild('dynamicContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  @ViewChild('dynamicContainer2', { read: ViewContainerRef }) container2!: ViewContainerRef;

  constructor(private localStorage: LocalStorageService) { }
  ngAfterViewInit(): void {
    for (let i:number = 1; i <= 5; ++i)
    {
      if (i <= this.reviews)
        this.container.createComponent(StarFullComponent)
      else if (i - 1 < this.reviews)
        this.container.createComponent(StarHalfComponent)
      else
        this.container.createComponent(StarComponent)
    }
    if (this.stockStatus == "Out of Stock")
      this.container2.createComponent(OutOfStockComponent);
    else
      this.container2.createComponent(InStockComponent);
  }
  public addToCart() : void{
    var cart = JSON.parse(this.localStorage.getItem("Cart"))

    var found :boolean = false;
    cart.forEach((element: {id:number, quantity:number}) => {
      if (+element.id == this.Id)
      {
        element.quantity++
        this.localStorage.setItem("Cart", JSON.stringify(cart))
        alert("added to cart")
        found = true;
      }
    });
    if (!found)
    {

      cart.push({id:this.Id, quantity:1})
      this.localStorage.setItem("Cart", JSON.stringify(cart))
      alert("added to cart")
    }
  }
}

