import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  product: Product = {} as Product

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    id && this.productService.readById(id).subscribe(product => {
      this.product = product
    })
  }

  delete():void {
    this.productService.delete(String(this.product.id)).subscribe({
      next: () => {
      this.productService.showMessage('Produto deletado com sucesso')
      this.router.navigate(['/products'])

      },
      error: error => {
        console.log('Error')
      }
   })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}
