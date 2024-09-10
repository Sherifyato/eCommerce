import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  public login()
  {
    const containers = document.querySelectorAll('.test-container');

    const body : any = {}
    var flag : boolean = false
    containers.forEach((container) => {
      const label = container.querySelector('label')?.textContent;
      const input = container.querySelector('input');
      if (!input || input.value === '')
      {
        alert(label + ' is required')
        flag = true
        return
      }
      if (label === 'Email Address')
        body.email = input.value;
      if (label === 'Password')
        body.password = input.value;
      })
    if (flag)
      return
    console.log(body)
    var rememberMe = false
    if ((document.getElementById('rememberMe') as HTMLInputElement).checked)
      rememberMe = true
    fetch(`http://localhost:3000/auth/login?rememberMe=${rememberMe}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    }).then(response => {
      if (response.status === 200)
      {
        alert('logged in successfully')
        response.json().then((data) => {
          const localStorage = new LocalStorageService()
          localStorage.setItem('token', data.data.token)
          location.reload()
      })
      }
      else
        response.json().then((data) => {
          alert(data.error_msg)
        })
    });
  }
  ngOnInit(): void
  {
    fetch('http://localhost:3000/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accesstoken': new LocalStorageService().getItem('token')
      }
    }).then(response => {
      if (response.status === 200)
      {
        this.router.navigate(['/'])
      }
    })
  }
}
