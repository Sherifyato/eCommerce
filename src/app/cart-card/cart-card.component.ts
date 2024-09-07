import { Component, Input} from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css'
})
export class CartCardComponent {
  @Input() image !: string
  @Input() title !: string
  @Input() quantity !: number
  @Input() price !: number
  @Input() id !: number
  constructor(private localStorage: LocalStorageService){}

  public remove()
  {
    console.log('reach here')
    var cart = JSON.parse(this.localStorage.getItem("Cart"))
    cart = cart.filter((item: {id: number, qunatity: number}) => +item.id !== this.id)
    location.reload()
    this.localStorage.setItem("Cart", JSON.stringify(cart))
  }

}
