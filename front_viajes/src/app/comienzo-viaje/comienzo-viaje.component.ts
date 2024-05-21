import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-comienzo-viaje',
  standalone: true,
  imports: [NavbarComponent,FooterComponent],
  templateUrl: './comienzo-viaje.component.html',
  styleUrl: './comienzo-viaje.component.css'
})
export class ComienzoViajeComponent implements OnInit {
  continents = [
    {
      name: 'Asia',
      description: 'Description of your first project',
      imageUrl: '../../assets/asia.png'
    },
    {
      name: 'América del Norte',
      description: 'Description of your fourth endeavor',
      imageUrl: '../../assets/americaN.png'
    },
    {
      name: 'América del Sur',
      description: 'Description of your second work',
      imageUrl: '../../assets/americaS.png'
    },
    {
      name: 'África',
      description: 'Description of your second work',
      imageUrl: '../../assets/africa.png'
    },
    {
      name: 'Europa',
      description: 'Description of your third creation',
      imageUrl: '../../assets/europa.png'
    },
    {
      name: 'Oceanía',
      description: 'Description of your third creation',
      imageUrl: '../../assets/australia.png'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
