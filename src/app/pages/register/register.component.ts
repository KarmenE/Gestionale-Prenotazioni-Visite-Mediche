import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.type';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  id: number = 0;
  nome: string = '';
  cognome: string = '';
  cf: string = '';
  email: string = '';
  password: string = '';

  constructor(private AuthService: AuthService) {}

  onRegister(user: User) {
    this.AuthService.register(this.id, this.nome, this.cognome, this.cf, this.email, this.password, user);


  }


}
