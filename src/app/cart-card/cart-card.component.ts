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
    fetch(`http://localhost:3000/cart/${this.id}`, {
      method: 'PUT',
      headers: {
        accesstoken: this.localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success)
        location.reload()
      else
        alert(data.message)
  })
  }
}
