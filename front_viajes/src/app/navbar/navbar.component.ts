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


  isCollapsed1: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.checkScreenWidth();
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



}
