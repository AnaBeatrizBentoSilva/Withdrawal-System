import { Component, Input } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-summary-product-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './summary-product-card.component.html',
  styleUrl: './summary-product-card.component.scss'
})
export class SummaryProductCardComponent {
  @Input() title!: string;
  @Input() value!: string;
  @Input() icon!: string;
}
