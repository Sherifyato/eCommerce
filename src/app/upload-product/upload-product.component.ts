import { Component, OnInit } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './upload-product.component.html',
  styleUrl: './upload-product.component.css'
})
export class ProductUploadComponent implements OnInit {
  product = {
    title: '',
    description: '',
    price: '',
    stock: '',
    category: ''
  };
  selectedFiles: File[] = [];

  constructor(private http: HttpClient, private localStorage: LocalStorageService,
    private router:Router) {}

  onFilesSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSubmit() {
    const formData = new FormData();

    // Append product fields
    formData.append('title', this.product.title);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price);
    formData.append('stock', this.product.stock);
    formData.append('category', this.product.category);

    // Append files
    for (const file of this.selectedFiles) {
      formData.append('images', file);
    }

    // Send POST request
    fetch('http://localhost:3000/product', {
      method: 'POST',
      headers: {
        accesstoken: this.localStorage.getItem('token')
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success)
        this.router.navigate(['/'])
      else
        alert(data.message)
    })

  }

  ngOnInit(): void {
    fetch('http://localhost:3000/user', {
      headers: {
        accesstoken: this.localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success != true || data.data.role != 'admin') {
        this.router.navigate(['/404']);
      }
    })
  }
}
