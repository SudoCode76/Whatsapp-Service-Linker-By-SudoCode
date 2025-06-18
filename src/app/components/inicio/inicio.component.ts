import { Component } from '@angular/core';
import {NabvarComponent} from '../nabvar/nabvar.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-inicio',
  imports: [
    NabvarComponent,
    FormsModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  numeroWhatsap: string = '';
  servicioSeleccionado: string = 'ChatGPT Plus';

  serviciosMensajes: { [key: string]: string } = {
    'ChatGPT Plus': 'Hola, va renovar su suscripción a ChatGPT Plus.',
    'Netflix': 'Hola, va renovar su suscripción a Netflix.',
    'Spotify': 'Hola, va renovar su suscripción a Spotify.'
  }; // Agregué punto y coma aquí

  // Este método estaba faltando
  enviarMensaje(): void {
    const mensaje = this.serviciosMensajes[this.servicioSeleccionado];

    const formatearNumero = `591${this.numeroWhatsap.replace(/\D/g, '')}`;

    const whatsappURL = `https://wa.me/${formatearNumero}?text=${encodeURIComponent(mensaje)}`;

    window.open(whatsappURL, '_blank');
  }


}
