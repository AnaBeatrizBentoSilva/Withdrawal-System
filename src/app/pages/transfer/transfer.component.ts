import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [FormsModule, NgxMaskDirective],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss'
})
export class TransferComponent {
  transfer = {
    value: '',
    beneficiary: '',
    cpfCnpj: '',
    bank: ''
  };

  submitTransfer() {
    console.log('Transferência enviada: ', this.transfer);
  }
}
