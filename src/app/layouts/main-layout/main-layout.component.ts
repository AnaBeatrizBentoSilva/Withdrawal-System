import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../../components/template/nav/nav.component';
import { FooterComponent } from '../../components/template/footer/footer.component';
import { UserSummaryComponent } from '../../components/user-summary/user-summary.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, NavComponent, FooterComponent, UserSummaryComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
