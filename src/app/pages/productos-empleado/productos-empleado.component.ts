import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Productos, ProductosService } from '../../services/productos/productos.service';

@Component({
  selector: 'app-productos-empleado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos-empleado.component.html',
  styleUrl: './productos-empleado.component.css'
})
export class ProductosEmpleadoComponent {
  Products: Productos[] = [];
  constructor(private productService: ProductosService) { }
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(): void {
    this.productService.getProductos().subscribe((products) => this.Products = products);
  }


}
