import { Component } from '@angular/core';
import { NavComponent } from './components/template/nav/nav.component';
import { FooterComponent } from "./components/template/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'withdrawal-system-front';
}
