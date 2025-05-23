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

  constructor(private AuthService: AuthService) {}
 
  user: User = {
    id: 0,
    nome: '',
    cognome: '',
    CF: '',
    email: '',
    password: ''
  };

  onRegister() {
    this.AuthService.register(this.user);
  }


}
