import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, NgxMaskDirective, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  userProfile = {
    id: '',
    fullName: '',
    username: '',
    email: '',
    phoneNumber: '',
    cpf: '',
    address: ''
  };

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    if (!username) return;

    this.apiService.getUserInfo(username).subscribe({
      next: (data) => {
        console.log('Dados do usuário:', data);
        this.userProfile.id = data.id;
        this.userProfile.fullName = data.fullName;
        this.userProfile.cpf = data.cpf;
        this.userProfile.username = data.username;
        this.userProfile.email = data.email;
        this.userProfile.phoneNumber = data.phoneNumber;
        this.userProfile.address = data.address;
      },
      error: (err) => console.error('Erro ao carregar perfil:', err)
    });
  }

  submitTransfer() {
    if (!this.userProfile.id) {
      console.error('ID do usuário não definido!');
      return;
    }

    const usernameChanged = this.userProfile.username !== localStorage.getItem('username');

    this.apiService.updateUserProfile(this.userProfile.id, {
      username: this.userProfile.username,
      email: this.userProfile.email,
      phoneNumber: this.userProfile.phoneNumber,
      address: this.userProfile.address
    }).subscribe({
      next: (res) => {
         console.log('Perfil atualizado com sucesso!', res);
         if (usernameChanged) {
          alert('Perfil atualizado com sucesso!');
           localStorage.removeItem('token');
           localStorage.removeItem('username');
           this.router.navigate(['/login']);
         } else {
           alert('Perfil atualizado com sucesso!');
         }
      },
      error: (err) => console.error('Erro ao atualizar perfil:', err)
    });
  }
}
