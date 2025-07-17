import { Component } from '@angular/core';
import { InsuranceCardComponent } from '../../components/insurance-card/insurance-card.component';

@Component({
  selector: 'app-insurance',
  standalone: true,
  imports: [InsuranceCardComponent],
  templateUrl: './insurance.component.html',
  styleUrl: './insurance.component.scss'
})
export class InsuranceComponent {

}
