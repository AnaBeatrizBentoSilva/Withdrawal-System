import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [FormsModule, NgxMaskDirective, CommonModule],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.scss'
})
export class DepositComponent {
  deposit = {
    value: '',
    description: '',
  };

  submitTransfer() {
    console.log('Depósito realizado: ', this.deposit);
  }
}
