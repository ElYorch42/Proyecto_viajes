import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-sobre-nostros',
  standalone: true,
  imports: [NavbarComponent,FooterComponent],
  templateUrl: './sobre-nostros.component.html',
  styleUrl: './sobre-nostros.component.css'
})
export class SobreNostrosComponent {

}
