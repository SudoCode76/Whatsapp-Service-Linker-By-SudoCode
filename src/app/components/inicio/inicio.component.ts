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
    'ChatGPT Plus': 'Hola, va renovar su suscripción a ChatGPT Plus?',
    'Netflix': 'Hola, va renovar su suscripción a Netflix?',
    'Spotify': 'Hola, va renovar su suscripción a Spotify?'
  };

  // Método para enviar mensaje de WhatsApp
  enviarMensaje(): void {
    if (!this.numeroWhatsap || this.numeroWhatsap.trim() === '') {
      alert('Por favor ingrese un número de teléfono');
      return;
    }

    const mensaje = this.serviciosMensajes[this.servicioSeleccionado];

    // Limpiar el número de teléfono (quitar +591 si está presente y otros caracteres)
    let numeroLimpio = this.numeroWhatsap.replace(/\D/g, '');

    // Si el número ya tiene el código de país 591 al principio, quitarlo
    if (numeroLimpio.startsWith('591')) {
      numeroLimpio = numeroLimpio.substring(3);
    }

    const formatearNumero = `591${numeroLimpio}`;

    const whatsappURL = `https://wa.me/${formatearNumero}?text=${encodeURIComponent(mensaje)}`;

    window.open(whatsappURL, '_blank');
  }

  // Nuevo método para pegar desde el portapapeles
  async pegarNumero(): Promise<void> {
    try {
      // Intentar acceder al portapapeles
      const texto = await navigator.clipboard.readText();

      // Limpiar el texto pegado para mantener solo números
      let numeroLimpio = texto.replace(/\D/g, '');

      // Si el número tiene el código de país (591 o +591), quitarlo
      if (numeroLimpio.startsWith('591')) {
        numeroLimpio = numeroLimpio.substring(3);
      }

      // Asignar el número limpio
      this.numeroWhatsap = numeroLimpio;
    } catch (error) {
      console.error('Error al acceder al portapapeles:', error);
      alert('No se pudo acceder al portapapeles. Por favor verifica los permisos del navegador.');
    }
  }


}
