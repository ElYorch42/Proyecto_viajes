import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { FormularioDatosComponent } from '../formulario-datos/formulario-datos.component';
import { HermanosCVFDService } from '../_servicio/hermanos-cv-fd.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-comienzo-viaje',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,FormularioDatosComponent,ReactiveFormsModule],
  templateUrl: './comienzo-viaje.component.html',
  styleUrl: './comienzo-viaje.component.css'
})
export class ComienzoViajeComponent implements OnInit {

  formulario: FormGroup;
   destinoAleatorios:string = "";
   constructor(private route:Router,private hermanos:HermanosCVFDService,private fb: FormBuilder) {
    this.formulario = this.fb.group({
      aeSalida:['',Validators.required]      
    })
    }
    continents = [
      {
        colorear:false,
        name: 'Asia',
        description: 'Se extiende sobre la mitad oriental del hemisferio norte, desde el océano Glacial Ártico, al norte, hasta el océano Índico, al sur.',
        imageUrl: '../../assets/asia.png'
      },
      {
        colorear:false,
        name: 'América del Norte',
        description: 'Se extiende en el Hemisferio Occidental desde el Océano Glacial Ártico por el norte, hasta la frontera con Centroamérica por el sur',
        imageUrl: '../../assets/americaN.png'
      },
      {
        colorear:false,
        name: 'América del Sur',
        description: 'Se encuentra al sur de América Central, y está rodeada por el océano Pacífico en el oeste y el océano Atlántico en el este',
        imageUrl: '../../assets/americaS.png'
      },
      {
        colorear:false,
        name: 'África',
        description: 'Se encuentra entre el mar Mediterráneo lo separa al norte y la Antártida al sur',
        imageUrl: '../../assets/africa.png'
      },
      {
        colorear:false,
        name: 'Europa',
        description: 'Se encuentra entre el mar Mediterráneo lo separa al sur y el océano Ártico al norte',
        imageUrl: '../../assets/europa.png'
      },
      {
        colorear:false,
        name: 'Oceanía',
        description: 'Cubre una región macro-geográfica situada entre Asia y América',
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
        this.hermanos.changeData(this.destinoAleatorios);
        this.hermanos.changeDataAe(this.formulario.controls["aeSalida"].value)
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
