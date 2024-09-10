import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../local-storage.service';
import { FormsModule } from '@angular/forms';
import { BoundElementProperty } from '@angular/compiler';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  };
  deleting = false
  updatingEmail = false
  updatingPassword = false
  isEditing = false;
  newEmail : string = ''
  newPassword : string = ''
  currentPassword : string = ''
  constructor(private localStorage: LocalStorageService, private router: Router) {}
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
  toggleDeletion(){
    this.deleting = !this.deleting;
    this.currentPassword = ''
  }
  toggleEditEmail() {
    this.updatingEmail = !this.updatingEmail;
    this.currentPassword = ''
    this.newEmail = ''
  }
  toggleEditPassword() {
    this.updatingPassword = !this.updatingPassword;
    this.currentPassword = ''
    this.newPassword = ''
  }
  saveChanges() {
    fetch('http://localhost:3000/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'accesstoken': this.localStorage.getItem('token')
      },
      body: JSON.stringify({
        firstName: this.user.firstName,
        lastName: this.user.lastName
      })
    }).then(response => {
      if (response.status === 200)
      {
        this.isEditing = false;
        alert('Profile updated successfully')
      }
      else
      response.json().then((data) => {
        alert(data.error_msg)
      })
    })
  }
  saveEmail(){
    fetch('http://localhost:3000/user/email', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'accesstoken': this.localStorage.getItem('token')
      },
      body: JSON.stringify({
        email: this.newEmail,
        password: this.currentPassword
      })
    }).then(response => {
      if (response.status === 200)
      {
        this.user.email = this.newEmail
        alert('Email updated successfully')
        this.updatingEmail = false;
      }
      else
        response.json().then((data) => {
          alert(data.error_msg)
        })
    })
  }
  savePassword(){
    fetch('http://localhost:3000/user/password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'accesstoken': this.localStorage.getItem('token')
      },
      body: JSON.stringify({
        oldPassword: this.currentPassword,
        password: this.newPassword
      })
    }).then(response => {
      if (response.status === 200)
      {
        alert('Password updated successfully')
        this.updatingPassword = false;
      }
      else
        response.json().then((data) => {
          alert(data.error_msg)
        })
    })
  }
  delete(){
    fetch('http://localhost:3000/user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'accesstoken': this.localStorage.getItem('token')
      },
      body:JSON.stringify({
        password: this.currentPassword
      })
    }).then(response => {
      if (response.status === 200)
      {
        alert('Account deleted successfully')
        this.localStorage.clear()
        this.router.navigate(['/home']);
        location.reload()
      }
      else
        response.json().then((data) => {
          alert(data.error_msg)
        })
    })
  }
  ngOnInit(): void {
    if (!this.localStorage.getItem('token'))
    {
      alert("Please login to view this page")
      this.router.navigate(['/login']);
    }
    fetch('http://localhost:3000/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accesstoken': this.localStorage.getItem('token')
    }}).then(response => response.json().then((data) => {
      this.user = data.data
    }))
  }
}
