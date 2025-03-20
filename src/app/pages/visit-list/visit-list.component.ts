import { Component } from '@angular/core';
import { Visita } from '../../models/visita.type';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visit-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visit-list.component.html',
  styleUrl: './visit-list.component.css'
})
export class VisitListComponent {


  visite: Visita[] = [

    {
      id: 1,
      tipoVisita: 'Visita Cardiologica',
      descrizione: 'Visita per problemi cardiaci',
      medico: 'Dr. Rossi',
      prezzo: 50,
      durata: '30 minuti'
    },
    {
      id: 2,
      tipoVisita: 'Visita Dermatologica',
      descrizione: 'Visita per problemi dermatologici',
      medico: 'Dr. Bianchi',
      prezzo: 40,
      durata: '20 minuti'
    },
    {
      id: 3,
      tipoVisita: 'Visita Oculistica',
      descrizione: 'Visita per problemi oculistici',
      medico: 'Dr. Verdi',
      prezzo: 60,
      durata: '40 minuti' 
    },
    {
      id: 4,
      tipoVisita: 'Visita Ortopedica',
      descrizione: 'Visita per problemi ortopedici',
      medico: 'Dr. Giallo',
      prezzo: 70,
      durata: '50 minuti'
    }, 
    {
      id: 5,
      tipoVisita: 'Visita Ginecologica',
      descrizione: 'Visita per problemi ginecologici',
      medico: 'Dr. Azzurro',
      prezzo: 80,
      durata: '60 minuti'
    },
    {
      id: 6,
      tipoVisita: 'Visita Otorinolaringoiatrica',
      descrizione: 'Visita per problemi ORL',
      medico: 'Dr. Neri',
      prezzo: 90,
      durata: '70 minuti'
    },
    {
      id: 7,
      tipoVisita: 'Visita Endocrinologica',
      descrizione: 'Visita per problemi endocrinologici',
      medico: 'Dr. Viola',
      prezzo: 100,
      durata: '80 minuti'
    },
    {
      id: 8,
      tipoVisita: 'Visita Neurologica',
      descrizione: 'Visita per problemi neurologici',
      medico: 'Dr. Rosa',
      prezzo: 110,
      durata: '90 minuti'
    },
    {
      id: 9,
      tipoVisita: 'Visita Gastroenterologica',
      descrizione: 'Visita per problemi gatroenterologici',
      medico: 'Dr. Verde',
      prezzo: 120,
      durata: '100 minuti'
    },
    {
      id: 10,
      tipoVisita: 'Visita Pneumologica',
      descrizione: 'Visita per problemi penumologici',
      medico: 'Dr. Blu',
      prezzo: 130,
      durata: '110 minuti'
    },

  ];

  constructor(private router: Router) { }

  ngOnInit(): void {}

  prenota(visita: Visita): void {
    // Naviga verso il calendario passando il tipoVisita come parametro
    this.router.navigate(['/availability-calendar', visita.tipoVisita]);
  }


  vaiAllaDescrizione(visita: Visita): void {
    this.router.navigate(['/visit-description', visita.tipoVisita]); 
  }
  


}
