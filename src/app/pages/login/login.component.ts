import { Component } from '@angular/core';
import { FloatingInputComponent } from "../../components/inputs/floating-input/floating-input.component";
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FloatingInputComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router, private api: ApiService) {}

  login() {
    if (!this.username || !this.password) {
      alert('Preencha nome de usuário e senha');
      return;
    }

    this.isLoading = true;

    this.api.login(this.username, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);
        alert(err.message);
        this.isLoading = false;
      }
    });
  }
}