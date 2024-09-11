import { ProductosService, Productos } from './../../services/productos/productos.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  Products: Productos[] = [];
  form: FormGroup;
  editForm: FormGroup;
  selectProduct: Productos | null = null;
  selectedProductId: string | null = null;
  selectedFile: File | null = null;

  constructor(private productosService: ProductosService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      categoria: ["", Validators.required],
      descripcion: ["", Validators.required],
      precio: ["", Validators.required],
      tipo: ["", Validators.required],
      image: [null], // Este campo será el URL de la imagen
    });

    this.editForm = this.formBuilder.group({
      name: ["", Validators.required],
      categoria: ["", Validators.required],
      descripcion: ["", Validators.required],
      precio: ["", Validators.required],
      tipo: ["", Validators.required],
      image: [],
    });
  }



  //traer los productos
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(): void {
    this.productosService.getProductos().subscribe((products) => this.Products = products);
  }
  //Guardar
  addProducts(): void {
    if (this.form.invalid || !this.selectedFile) return;

    // Subir imagen a Firebase Storage
    this.productosService.uploadImage(this.selectedFile)
      .then((imageUrl) => {
        const producto = { ...this.form.value, image: imageUrl }; // Asignar URL de la imagen
        this.productosService.addProduct(producto)
          .then((response) => {
            this.Products.push(response);
            this.form.reset();
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log('Error al subir la imagen:', error));
  }

  //Seleccion de archivos
  SubirArchivo(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.selectedFile = fileInput.files[0];
    }

  }

  ///Editar
  updateProduct(): void {
    if (this.editForm.invalid || !this.selectProduct) return;

    if (this.selectedFile) {
      this.productosService.uploadImage(this.selectedFile)
        .then((imageUrl) => {
          const updatedProduct = { ...this.selectProduct, ...this.editForm.value, image: imageUrl };
          this.productosService.updateProduct(updatedProduct).then(()=>{this.getProducts(); this.Update = false;});
        })
        .catch((error) => {
          console.log('Error al subir la imagen:', error);
        });

    } else {
      const updatedProduct = { ...this.selectProduct, ...this.editForm.value, image: this.selectProduct.image };
      this.productosService.updateProduct(updatedProduct);
    }



    // const updatedProduct = { ...this.selectProduct, ...this.editForm.value };
    // this.productosService.updateProduct(updatedProduct)
    //   .then(() => {
    //     this.getProducts(); // Recargar productos después de actualizar

    //     this.Update = false;// Limpiar el producto seleccionado

    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });


  }

  saveUpdatedProduct(updatedProduct: Productos): void {
    this.productosService.updateProduct(updatedProduct)
    .then(() => {
      this.getProducts(); // Recargar productos después de actualizar
      this.Update = false; // Cerrar el modal de edición
    })
    .catch((error) => {
      console.log('Error al actualizar el producto:', error);
    });
  }

  //Eliminar
  deleteProduct(id: string): void {
    this.productosService.deleteProduct(id)
      .then(() => {
        this.Products = this.Products.filter(product => product.id !== id);
      })
      .catch((error) => console.log(error));
  }







  ///Abrir opciones
  Create = false;
  Read = false;
  Update = false;
  Delete = false;
  openModalCreate() {
    this.Create = true;

  }

  openModalDelete(productId: string) {
    this.selectedProductId = productId;
    this.Delete = true;

  }

  confirmDelete() {
    if (this.selectedProductId) {
      this.deleteProduct(this.selectedProductId);
    }
    this.closeModal();
  }
  openModalUpdate(product: Productos): void {
    this.selectProduct = product;

    this.editForm.patchValue({
      name: product.name,
      categoria: product.categoria,
      descripcion: product.descripcion,
      precio: product.precio,
      tipo: product.tipo,
      image: product.image
    });

    if (this.Read == true) {
      this.Read = false;
    }

    this.Update = true;

  }
  openModalRead(product: Productos): void {
    this.selectProduct = product;

    this.editForm.patchValue({
      name: product.name,
      categoria: product.categoria,
      descripcion: product.descripcion,
      precio: product.precio,
      tipo: product.tipo,
      image: product.image
    });

    if (this.Update == true) {
      this.Update = false;
    }
    this.Read = true;
  }


  closeModal() {


    this.Create = false;
    this.Read = false;
    this.Delete = false;
    this.Update = false;
  }



}
