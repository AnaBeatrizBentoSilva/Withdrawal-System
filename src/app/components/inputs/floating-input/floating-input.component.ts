import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-floating-input',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './floating-input.component.html',
  styleUrl: './floating-input.component.scss',
})
export class FloatingInputComponent {
  private _required = false;

  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input()
  set required(value: boolean | '') {
    this._required = value === '' || value === true;
  }

  get required(): boolean {
    return this._required;
  }
  @Input() disabled: boolean = false;

  // Máscara (opcional)
  @Input() mask: string = '';
  @Input() prefix: string = '';
  @Input() thousandSeparator: string = '.';
  @Input() decimalMarker: '.' | ',' | ['.', ','] = ',';
}
