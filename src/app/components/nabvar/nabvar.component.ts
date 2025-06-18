import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgIf} from '@angular/common';

@Component({
  selector: 'app-nabvar',
  imports: [
    NgIf
  ],
  templateUrl: './nabvar.component.html',
  styleUrl: './nabvar.component.css'
})
export class NabvarComponent implements OnInit {
  isDarkTheme: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.loadTheme();
  }

  loadTheme(): void {
    // Verificar si estamos en el navegador antes de usar localStorage
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      this.isDarkTheme = savedTheme === 'dark';
    } else {
      // Valor por defecto para SSR
      this.isDarkTheme = false;
      // Solo en navegador podemos manipular el DOM
      // En SSR, no modificamos document
    }
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    const theme = this.isDarkTheme ? 'dark' : 'light';

    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
    // No intentamos modificar el DOM en el servidor
  }

}
