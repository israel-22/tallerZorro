import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { Observable } from 'rxjs';


export interface Productos {
  id: string;
  image: string;
  name: string;
  categoria: string;
  descripcion: string;
  precio: string;
  tipo: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  push(response: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private firestore: Firestore,  private storage: Storage) { }
//leer los porductos (traer)
  getProductos(): Observable<Productos[]> {

    const productsRef = collection(this.firestore, 'products');

    return collectionData(productsRef, { idField: 'id' }) as Observable<Productos[]>
      }
//Crear un nuevo producto
addProduct(product: Productos): Promise<any> {
  const productsRef = collection(this.firestore, 'products'); // 'products' es la colección en Firestore
  return addDoc(productsRef, product); // Devuelve una promesa
}
//Actualizar
updateProduct({ id,image, name, categoria, descripcion, precio,tipo}:Productos): Promise<any> {
  const productsRef = doc(this.firestore, `products/${id}`);
  return updateDoc(productsRef, {image, name, categoria, descripcion, precio,tipo});
}
//Borrar
deleteProduct(id: string): Promise<any> {
  const  productsRef = doc(this.firestore, `products/${id}`);
  return deleteDoc(productsRef);
}

//subir imagen
uploadImage(file:File): Promise<string> {
   const storageRef=ref(this.storage, `images/${file.name}`);

  return uploadBytes(storageRef,file)
  .then((snapshot)=>getDownloadURL(snapshot.ref))
  .catch((error)=>{
    console.log('Error al subir la imagen', error);
    throw error;
  });
}

}
