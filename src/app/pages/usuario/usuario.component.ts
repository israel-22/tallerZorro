import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios$: Observable<any[]> | undefined;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const usuariosCollection = collection(this.firestore, 'usuarios');
    this.usuarios$ = collectionData(usuariosCollection, { idField: 'id' });
  }
}
