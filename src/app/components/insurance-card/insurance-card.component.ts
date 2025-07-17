import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-insurance-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './insurance-card.component.html',
  styleUrl: './insurance-card.component.scss'
})
export class InsuranceCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() icon!: string;
}
