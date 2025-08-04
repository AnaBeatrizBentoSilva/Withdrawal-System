import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-floating-input',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './floating-input.component.html',
  styleUrl: './floating-input.component.scss'
})
export class FloatingInputComponent {
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;

  // Máscara (opcional)
  @Input() mask: string = '';
  @Input() prefix: string = '';
  @Input() thousandSeparator: string = '.';
  @Input() decimalMarker: '.' | ',' | ['.', ','] = ',';
}
