import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  Create = false;
  Read = false;
  Update = false;
  Delete = false;

  openModalCreate() {
    this.Create = true;

  }
  
  openModalDelete() {
  
    this.Delete = true;

  }
  openModalUpdate() {
    
     this.Update = true;

  }
  openModalRead() {
    this.Read = true;
  }


  closeModal() {
    this.Create = false;
    this.Read = false;
    this.Delete = false;
    this.Update = false;
  }
}
