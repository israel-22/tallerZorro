import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Register, RegistersService } from '../../services/registers/registers.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  users:Register[] = [];


  constructor(private registersComponent: RegistersService) {}

  ngOnInit() {
this.getUsers();
  }

  getUsers(): void {
    this.registersComponent.getRegisters().subscribe((user) => this.users = user);
  }
}
