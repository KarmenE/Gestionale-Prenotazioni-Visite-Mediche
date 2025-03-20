import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})


export class ContattiComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  map!: L.Map;

  // Inserisci qui le coordinate della tua sede
  destinationCoords: [number, number] = [38.057024174574124, 15.304052017358806];

  ngAfterViewInit(): void {
    // Inizializza la mappa centrata sulla destinazione
    this.map = L.map(this.mapContainer.nativeElement).setView(this.destinationCoords, 12);

    // Aggiungi le tile di OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Aggiungi un marker per la destinazione
    const destinationMarker = L.marker(this.destinationCoords)
      .addTo(this.map)
      .bindPopup('La nostra sede')
      .openPopup();

    // Ottieni la posizione corrente dell'utente
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords: L.LatLngExpression = [
            position.coords.latitude,
            position.coords.longitude
          ];

          // Aggiungi un marker per la posizione dell'utente
          L.marker(userCoords)
            .addTo(this.map)
            .bindPopup('Tu sei qui')
            .openPopup();

          // Aggiungi il controllo di routing: da userCoords a destinationCoords
          L.Routing.control({
            waypoints: [
              L.latLng(userCoords[0] as number, userCoords[1] as number),
              L.latLng(this.destinationCoords[0] as number, this.destinationCoords[1] as number)
            ],
            router: L.Routing.osrmv1({
              // Servizio OSRM gratuito
              serviceUrl: 'https://router.project-osrm.org/route/v1'
            }),
            routeWhileDragging: true,
            showAlternatives: false
          }).addTo(this.map);
        },
        (error) => {
          console.error('Impossibile ottenere la posizione dell\'utente', error);
        }
      );
    } else {
      console.error('Geolocalizzazione non supportata dal browser.');
    }
  }
}