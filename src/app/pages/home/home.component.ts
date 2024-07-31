import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/template/header/header.component";
import { NavComponent } from "../../components/template/nav/nav.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, NavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
