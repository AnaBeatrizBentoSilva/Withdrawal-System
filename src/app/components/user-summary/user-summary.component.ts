import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CapitalizeAllPipe } from "../../pipes/CapitalizeAllPipe.pipe";

@Component({
  selector: 'app-user-summary',
  standalone: true,
  imports: [CommonModule, CapitalizeAllPipe],
  templateUrl: './user-summary.component.html',
  styleUrl: './user-summary.component.scss'
})
export class UserSummaryComponent implements OnInit{
  fullName: string = '';
  balance: number = 0;
  showSaldo: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const username = localStorage.getItem('username');

    if (!username) {
      console.warn('Username não encontrado no localStorage!');
      return;
    }

    this.apiService.getUserInfo(username).subscribe({
      next: (data) => {
        this.fullName = data.fullName;
        this.balance = data.balance;
      },
      error: (err) => {
        console.error('Erro ao carregar informações do usuário:', err);
      }
    });
  }


  toggleSaldo(): void {
    this.showSaldo = !this.showSaldo;
  }
}
