import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterOutlet,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {



  token:any = "";

  isCollapsed1: boolean = true;
cambiarLogoBool:boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.checkScreenWidth();

    this.token = sessionStorage.getItem("token");
    console.log("token-> " + this.token)

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenWidth();
  }

  private checkScreenWidth(): void {
    if(window.innerWidth > 768){
      this.isCollapsed1 = true;

    }
    
  }

  toggleCollapse1(): void {
    this.isCollapsed1 = !this.isCollapsed1;
  }

  cambiarlogo(){
   return  this.cambiarLogoBool = false;
  }
  cambiarlogot(){
   return this.cambiarLogoBool = true;
  }



}
