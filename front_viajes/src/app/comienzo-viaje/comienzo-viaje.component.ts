import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { FormularioDatosComponent } from '../formulario-datos/formulario-datos.component';
import { HermanosCVFDService } from '../_servicio/hermanos-cv-fd.service';

@Component({
  selector: 'app-comienzo-viaje',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,FormularioDatosComponent],
  templateUrl: './comienzo-viaje.component.html',
  styleUrl: './comienzo-viaje.component.css'
})
export class ComienzoViajeComponent implements OnInit {

   destinoAleatorios:string = "";
   constructor(private route:Router,private hermanos:HermanosCVFDService) { }
  
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

  seleccionAleatior(){

    let arrayDestinos:string[] = [];
    for(let i  = 0; i<this.continents.length;i++){
      if(this.continents[i].colorear == true){

        arrayDestinos.push(this.continents[i].name);
      }
    }

    if(arrayDestinos.length == 0){
        alert("tienes que seleccionar al menos un contintente")
      
    }else{
      
        this.destinoAleatorios = arrayDestinos[Math.floor(Math.random() * arrayDestinos.length)];
        console.log(this.destinoAleatorios);
        this.hermanos.changeData(this.destinoAleatorios);
        this.route.navigate(['/datos']);


    }

  }



  cartaseleccionada(id:number){
   
   
       this.continents[id].colorear = true;
    
  }

  cartaseleccionadat(id:number){

   
       this.continents[id].colorear = false;
    
  }


  ngOnInit(): void {
  }
}
