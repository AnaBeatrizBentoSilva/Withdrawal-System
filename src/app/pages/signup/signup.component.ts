import { Component } from '@angular/core';
import { FloatingInputComponent } from '../../components/inputs/floating-input/floating-input.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FloatingInputComponent, FormsModule, RouterModule, CommonModule],
  providers: [provideNgxMask()],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  fullName = '';
  dateOfBirth = '';
  cpf = '';
  email = '';
  phoneNumber = '';
  address = '';
  username = '';
  password = '';
  isLoading = false;

  dateError = '';
  cpfError = '';
  emailError = '';
  usernameError = '';

  constructor(private router: Router, private apiService: ApiService) {}

  get allFieldsFilled(): boolean {
    return (
      this.fullName.trim() !== '' &&
      this.username.trim() !== '' &&
      this.dateOfBirth.trim() !== '' &&
      this.cpf.trim() !== '' &&
      this.phoneNumber.trim() !== '' &&
      this.address.trim() !== '' &&
      this.email.trim() !== '' &&
      this.password.trim() !== ''
    );
  }

  register() {
    if (!this.allFieldsFilled) return;

    this.isLoading = true;

    const inputDate = this.dateOfBirth.trim();

    if (!this.isValidDate(inputDate)) {
      this.dateError = `Data de nascimento inválida`;
      this.isLoading = false;
      return;
    }

    if (!this.isAdult(inputDate)) {
      this.dateError = 'Você deve ter pelo menos 18 anos para se cadastrar.';
      this.isLoading = false;
      return;
    }

    this.dateError = '';

    // Validação de CPF
    if (!this.isValidCPF(this.cpf)) {
      this.cpfError = 'CPF inválido';
      this.isLoading = false;
      return;
    }

    this.cpfError = '';

    let formattedDate = '';
    if (inputDate.includes('/')) {
      const [day, month, year] = inputDate.split('/');
      formattedDate = `${year}-${month}-${day}`;
    } else {
      const cleaned = inputDate.replace(/\D/g, '');
      const day = cleaned.slice(0, 2);
      const month = cleaned.slice(2, 4);
      const year = cleaned.slice(4, 8);
      formattedDate = `${year}-${month}-${day}`;
    }

    const newUser = {
      fullName: this.fullName,
      dateOfBirth: formattedDate,
      cpf: this.cpf,
      email: this.email,
      phoneNumber: this.phoneNumber,
      address: this.address,
      username: this.username,
      password: this.password,
    };

    console.log('📦 Dados enviados para signup:', newUser);

    this.apiService.signup(newUser).subscribe({
      next: () => {
        // Depois de cadastrar, faz login automático
        this.apiService.login(this.username, this.password).subscribe({
          next: (res) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('username', this.username);
            this.isLoading = false;
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.error('Erro ao fazer login automático:', err);
            this.isLoading = false;
            alert(
              'Cadastro realizado, mas houve erro ao logar automaticamente.'
            );
          },
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erro ao cadastrar usuário:', err);

        const errorMessage = err.error?.message?.toLowerCase() || '';

        this.emailError = '';
        this.cpfError = '';
        this.usernameError = '';

        if (errorMessage.includes('username')) {
          this.usernameError = 'Já existe uma conta com este nome de usuário.';
        } else if (errorMessage.includes('cpf')) {
          this.cpfError = 'Já existe uma conta com este CPF.';
        } else if (errorMessage.includes('email')) {
          this.emailError = 'Já existe uma conta com este e-mail.';
        } else {
          this.usernameError = 'Erro ao cadastrar usuário. Tente novamente.';
        }
      },
    });
  }

  isValidDate(dateStr: string): boolean {
    const cleaned = dateStr.replace(/[^\d]/g, '');
    if (cleaned.length !== 8) return false;

    const day = Number(cleaned.slice(0, 2));
    const month = Number(cleaned.slice(2, 4));
    const year = Number(cleaned.slice(4, 8));

    if (month < 1 || month > 12) return false;

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) return false;

    return true;
  }

  isAdult(dateStr: string): boolean {
    const cleaned = dateStr.replace(/[^\d]/g, '');
    const day = Number(cleaned.slice(0, 2));
    const month = Number(cleaned.slice(2, 4)) - 1;
    const year = Number(cleaned.slice(4, 8));

    const birthDate = new Date(year, month, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18;
  }

  isValidCPF(cpf: string): boolean {
    const cleaned = cpf.replace(/\D/g, '');
    if (cleaned.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleaned)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += Number(cleaned[i]) * (10 - i);
    }
    let firstCheck = (sum * 10) % 11;
    if (firstCheck === 10) firstCheck = 0;
    if (firstCheck !== Number(cleaned[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += Number(cleaned[i]) * (11 - i);
    }
    let secondCheck = (sum * 10) % 11;
    if (secondCheck === 10) secondCheck = 0;
    if (secondCheck !== Number(cleaned[10])) return false;

    return true;
  }
}
