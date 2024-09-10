import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {
  product = {
    title: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    _id: ''
  };
  selectedFiles: File[] = [];

  constructor(
    private localStorage: LocalStorageService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {this.product._id= params['id']});
    this.loadProduct(this.product._id);
  }

  // Load product data
  loadProduct(productId: string | null): void {
    fetch(`http://localhost:3000/product/${productId}`)
    .then(response => response.json())
    .then(data => {
      this.product = data.data;
    })
    .catch(error => {
      console.error('Error loading product', error);
    })
  }

  // Handle file selection
  onFilesSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  // Submit updated product data
  onSubmit(): void {
    const formData = new FormData();

    // Append product fields
    if (this.product.title !== '')
      formData.append('title', this.product.title);
    if (this.product.description !== '')
      formData.append('description', this.product.description);
    if (this.product.price)
      formData.append('price', this.product.price.toString());
    if (this.product.stock)
      formData.append('stock', this.product.stock.toString());
    if (this.product.category !== '')
      formData.append('category', this.product.category);

    // Append files
    for (const file of this.selectedFiles) {
      formData.append('images', file);
    }

    // Send PUT request to update product
    fetch(`http://localhost:3000/product/${this.product._id}`, {
      method: 'PUT',
      headers: {
        accesstoken: this.localStorage.getItem('token')
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success)
        this.router.navigate(['/products']);
      else
        alert(data.message);
    })
  }

  // Delete the product
  onDelete(): void {
    if (confirm('Are you sure you want to delete this product?')) {
      fetch(`http://localhost:3000/product/${this.product._id}`, {
        method: 'DELETE',
        headers: {
          accesstoken: this.localStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success)
          this.router.navigate(['/products']);
        else
          alert(data.message);
      })
    }
  }
}
