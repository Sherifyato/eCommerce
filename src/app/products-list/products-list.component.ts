import { Component, OnInit, ViewChild, ViewContainerRef, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { JsonReaderService } from '../services/json-reader.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CardComponent, PaginationComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
  @Input() page !: number
  constructor(private jsonReader: JsonReaderService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 1
    })
  }
  @ViewChild("dynamicContainer", { read: ViewContainerRef }) container!: ViewContainerRef;
  @ViewChild(PaginationComponent) paginationComponent !: PaginationComponent
  ngOnInit(): void {
    fetch(`http://localhost:3000/product?page=${this.page}`, {})
    .then(response => response.json())
    .then(data => {
      const pages = (data.total + 7) / 8;
      data = data.data;
      const cur = this.page;
      const url = '/products';
      this.paginationComponent.container.element.nativeElement.innerHTML = `<li class="page-item ${cur == 1 ? "disabled" : ""}"><a class="page-link" href="${url + "?page=" + (cur - 1)}">Previous</a></li>`
      for (let i = 1; i <= pages; i++) {
        if (i == cur)
          this.paginationComponent.container.element.nativeElement.innerHTML += `<li class="page-item active"><span class="page-link">${i}</span></li>`
        else
          this.paginationComponent.container.element.nativeElement.innerHTML += `<li class="page-item"><a class="page-link" href="${url + "?page=" + i}">${i}</a></li>`
      }
      this.paginationComponent.container.element.nativeElement.innerHTML += `<li class="page-ite ${cur == pages ? "disabled" : ""}"><a class="page-link" href="${url + "?page=" + (cur + 1)}">Next</a></li>`
      if (data.length)
        this.container.element.nativeElement.innerHTML = '';
      data.forEach((element : any) => {
        const newCard = this.container.createComponent(CardComponent);

        newCard.instance.title = element.title;
        newCard.instance.stockStatus = element.stock > 0 ? "In Stock" : "Out of Stock";
        newCard.instance.price = element.price;
        newCard.instance.details = element.description;
        newCard.instance.image = element.images[0];
        newCard.instance.Id = element._id;
        newCard.instance.reviews = element.rate;
        const cardElement = newCard.location.nativeElement;
        cardElement.classList.add('col-lg-3');
        cardElement.classList.add('col-md-4');
        cardElement.classList.add('col-sm-6');
        cardElement.classList.add('col-12');
        cardElement.classList.add('mt-4');
        cardElement.classList.add('d-flex');
        cardElement.classList.add('align-items-stretch');


      })
    })
  }
}
