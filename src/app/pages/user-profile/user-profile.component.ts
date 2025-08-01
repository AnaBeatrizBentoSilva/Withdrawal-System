import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, NgxMaskDirective, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  userProfile = {
    nameUser: 'Ana Silva',
    email: 'ana.silva@gmail.com',
    phone: '11989945262',
    cpfCnpj: '49853256902',
    address: 'Rua das Flores, 25 - Jardim Esmeralda - São Caetano'
  };

  submitTransfer() {
    console.log('Informação atualizada: ', this.userProfile);
  }
}
