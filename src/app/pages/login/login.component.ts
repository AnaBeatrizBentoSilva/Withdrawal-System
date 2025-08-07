import { Component } from '@angular/core';
import { FloatingInputComponent } from "../../components/inputs/floating-input/floating-input.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FloatingInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router) {}

  email: string = '';
  password: string = '';

  login() {
    if (this.email === 'teste@email.com' && this.password === '1234') {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Usuário ou senha inválidos!');
    }
  }
}
