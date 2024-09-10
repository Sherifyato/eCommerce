import { Component, OnInit} from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  constructor(private localStorageService: LocalStorageService) {}
  logout() {
    this.localStorageService.clear();
    location.reload()
  }
  ngOnInit(): void {
    fetch('http://localhost:3000/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accesstoken': this.localStorageService.getItem('token')
    }}).then(response => {
      if (response.status === 200) {
        console.log(2)
        const doc = document.querySelectorAll('.navbar-nav')
        doc.forEach((ele) => {
          const a = ele?.querySelectorAll('.nav-link')
          a?.forEach((element) => {
            if (element.textContent === 'Login' || element.textContent === 'Register') {
              ele?.removeChild(element)
            }
          })
        })
      }
      else
      {
        console.log(2)
        const doc = document.querySelectorAll('.navbar-nav')
        doc.forEach((ele) => {
          const a = ele?.querySelectorAll('.nav-link')
          a?.forEach((element) => {
            if (element.textContent === 'Logout' || element.textContent === 'Profile') {
              ele?.removeChild(element)
            }
          })
        })
      }
    })
  }
}
