import { Component } from '@angular/core';
import { Register, RegistersService } from '../../services/registers/registers.service';
import { EmailService } from '../../services/email/email.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-control-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-users.component.html',
  styleUrl: './control-users.component.css'
})
export class ControlUsersComponent {
  users: Register[] = [];

  constructor(private registersService: RegistersService,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.getRegisters();
  }

  getRegisters(): void {
    this.registersService.getRegisters()
      .subscribe(registers => this.users = registers);
  }

  onSendEmail(register: Register): void {
    this.emailService.sendEmail({
      name: register.nickname,
      email: register.email,
      htmlContent: `<h1>Hola ${register.nickname}</h1>`
    }).subscribe(response => console.log(response));
  }

}
