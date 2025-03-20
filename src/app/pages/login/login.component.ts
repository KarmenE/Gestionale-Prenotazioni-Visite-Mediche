import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private AuthService: AuthService) { }

  onSubmit() {
    this.AuthService.login(this.email, this.password).subscribe(response => {
      if (response) {

        //alert('Login effettuato con successo');
      } else {

        this.email = '';
        this.password = '';
      }
    });
  }

}
