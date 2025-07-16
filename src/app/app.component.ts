import { Component } from '@angular/core';
import { NavComponent } from './components/template/nav/nav.component';
import { FooterComponent } from "./components/template/footer/footer.component";
import { UserSummaryComponent } from "./components/user-summary/user-summary.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, FooterComponent, UserSummaryComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'withdrawal-system-front';
}
