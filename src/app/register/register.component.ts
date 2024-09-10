import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private router: Router) { }
  public register()
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
      if (label === 'First name')
        body.firstName = input.value;
      if (label === 'Last name')
        body.lastName = input.value;
      if (label === 'Email Address')
        body.email = input.value;
      if (label === 'Password')
        body.password = input.value;
      })
    if (flag)
      return
    fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (response.status === 201)
        {
          alert('User registered successfully, please log in')
          this.router.navigate(['/login']);
        }
      else
        response.json().then((data) => {
          alert(data.error_msg)
        })
    });
  }
}

