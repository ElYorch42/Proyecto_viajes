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
      colorear:false,
      name: 'Asia',
      description: 'Description of your first project',
      imageUrl: '../../assets/asia.png'
    },
    {
      colorear:false,
      name: 'América del Norte',
      description: 'Description of your fourth endeavor',
      imageUrl: '../../assets/americaN.png'
    },
    {
      colorear:false,
      name: 'América del Sur',
      description: 'Description of your second work',
      imageUrl: '../../assets/americaS.png'
    },
    {
      colorear:false,
      name: 'África',
      description: 'Description of your second work',
      imageUrl: '../../assets/africa.png'
    },
    {
      colorear:false,
      name: 'Europa',
      description: 'Description of your third creation',
      imageUrl: '../../assets/europa.png'
    },
    {
      colorear:false,
      name: 'Oceanía',
      description: 'Description of your third creation',
      imageUrl: '../../assets/australia.png'
    }
  ];


  cartaseleccionada(id:number){
    console.log(this.continents[id].colorear)
   
       this.continents[id].colorear = true;
    
  }


  cartaseleccionadat(id:number){
    console.log(this.continents[id].colorear)
   
       this.continents[id].colorear = false;
    
  }
  constructor() { }

  ngOnInit(): void {
  }
}
