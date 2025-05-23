import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Visita, VisitaDescrizione } from '../../models/visita.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visit-description',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './visit-description.component.html',
  styleUrl: './visit-description.component.css'
})
export class VisitDescriptionComponent implements OnInit {

  visita!: VisitaDescrizione;
  visiteDescrizione: VisitaDescrizione[] = [
    {
      id: 1,
      tipoVisita: 'Visita Cardiologica',
      descrizione: 'Visita per problemi cardiaci',
      medico: 'Dr. Rossi',
      durata: '30 minuti',
      prezzo: 50,
      prestazioni: [
        'Visita specialistica',
        'Elettrocardiogramma',
        'Ecografia cardiaca',
        'Ecocolordoppler cardiaco',
        'Elettrocardiografia dinamica Holter',
        'Test da sforzo con cicloergometro'
      ],
      medici: ['Dr. Rossi Aldo', 'Dr. Stelo Mauro', 'Dr. Stella Anna'],
      telefono: '01 2345678',
      orariSportello: [
        'Lunedì - Venerdì: 08.00 - 19.00',
        'Sabato: 08.00 - 15.00'
      ]
    },
    {
      id: 2,
      tipoVisita: 'Visita Dermatologica',
      descrizione: 'Visita per problemi della pelle',
      medico: 'Dr. Bianchi',
      durata: '20 minuti',
      prezzo: 40,
      prestazioni: ['Visita specialistica', 'Esame dermatoscopico', 'Biopsia cutanea'],
      medici: ['Dr. Bianchi Luca', 'Dr. Verdi Carlo'],
      telefono: '02 3456789',
      orariSportello: [
        'Lunedì - Venerdì: 08.00 - 19.00',
        'Sabato: 08.00 - 15.00'
      ]
    },
    {
      id: 3,
      tipoVisita: 'Visita Oculistica',
      descrizione: 'Visita per problemi alla vista',
      medico: 'Dr. Neri',
      durata: '25 minuti',
      prezzo: 45,
      prestazioni: ['Visita specialistica', 'Esame della vista', 'Tonometria', 'OCT'],
      medici: ['Dr. Neri Antonio', 'Dr. Moretti Lucia'],
      telefono: '01 2345678',
      orariSportello: [
        'Lunedì - Venerdì: 08.00 - 19.00',
        'Sabato: 08.00 - 15.00'
      ]
    },
    {
      id: 4,
      tipoVisita: 'Visita Ortopedica',
      descrizione: 'Valutazione problemi osteo-articolari',
      medico: 'Dr. Ferri',
      durata: '30 minuti',
      prezzo: 55,
      prestazioni: ['Visita specialistica', 'Radiografia', 'Risonanza magnetica'],
      medici: ['Dr. Ferri Paolo', 'Dr. Gentili Roberto'],
      telefono: '01 2345678',
      orariSportello: [
        'Lunedì - Venerdì: 08.00 - 19.00',
        'Sabato: 08.00 - 15.00'
      ]
    },
    {
      id: 5,
      tipoVisita: 'Visita Ginecologica',
      descrizione: 'Controllo ginecologico e prevenzione',
      medico: 'Dr.ssa Martini',
      durata: '40 minuti',
      prezzo: 60,
      prestazioni: ['Visita specialistica', 'Pap test', 'Ecografia pelvica', 'Monitoraggio gravidanza'],
      medici: ['Dr.ssa Martini Elisa', 'Dr.ssa Romano Sara'],
      telefono: '01 2345678',
      orariSportello: [
        'Lunedì - Venerdì: 08.00 - 19.00',
        'Sabato: 08.00 - 15.00'
      ]
    },
    {
      id: 6,
      tipoVisita: 'Visita Otorinolaringoiatrica',
      descrizione: 'Controllo naso, gola e orecchie',
      medico: 'Dr. Russo',
      durata: '25 minuti',
      prezzo: 50,
      prestazioni: ['Visita specialistica', 'Esame audiometrico', 'Esame endoscopico'],
      medici: ['Dr. Russo Andrea', 'Dr. Conti Filippo'],
      telefono: '01 2345678',
      orariSportello: [
        'Lunedì - Venerdì: 08.00 - 19.00',
        'Sabato: 08.00 - 15.00'
      ]
    },
    {
      id: 7,
      tipoVisita: 'Visita Endocrinologica',
      descrizione: 'Valutazione disturbi ormonali',
      medico: 'Dr. Colombo',
      durata: '35 minuti',
      prezzo: 65,
      prestazioni: ['Visita specialistica', 'Ecografia tiroidea', 'Esami ormonali'],
      medici: ['Dr. Colombo Marco', 'Dr. Galli Francesca'],
      telefono: '01 2345678',
      orariSportello: [
        'Lunedì - Venerdì: 08.00 - 19.00',
        'Sabato: 08.00 - 15.00'
      ]
    },
    {
      id: 8,
      tipoVisita: 'Visita Neurologica',
      descrizione: 'Esame neurologico per disturbi del sistema nervoso',
      medico: 'Dr. Fabbri',
      durata: '45 minuti',
      prezzo: 70,
      prestazioni: ['Visita specialistica', 'Elettroencefalogramma', 'Risonanza magnetica cerebrale'],
      medici: ['Dr. Fabbri Luca', 'Dr. De Angelis Michele'],
      telefono: '01 2345678',
      orariSportello: [
        'Lunedì - Venerdì: 08.00 - 19.00',
        'Sabato: 08.00 - 15.00'
      ]
    },
    {
      id: 9,
      tipoVisita: 'Visita Gastroenterologica',
      descrizione: 'Controllo disturbi digestivi e intestinali',
      medico: 'Dr. Lombardi',
      durata: '40 minuti',
      prezzo: 60,
      prestazioni: ['Visita specialistica', 'Gastroscopia', 'Colonscopia', 'Ecografia addominale'],
      medici: ['Dr. Lombardi Federico', 'Dr. Rinaldi Davide'],
      telefono: '01 2345678',
      orariSportello: [
        'Lunedì - Venerdì: 08.00 - 19.00',
        'Sabato: 08.00 - 15.00'
      ]
    },
    {
      id: 10,
      tipoVisita: 'Visita Pneumologica',
      descrizione: 'Valutazione e diagnosi delle malattie respiratorie',
      medico: 'Dr. Pini',
      durata: '35 minuti',
      prezzo: 55,
      prestazioni: ['Visita specialistica', 'Spirometria', 'Tac toracica', 'Test allergologici'],
      medici: ['Dr. Pini Alessandro', 'Dr. Sanna Giorgio'],
      telefono: '01 2345678',
      orariSportello: [
        'Lunedì - Venerdì: 08.00 - 19.00',
        'Sabato: 08.00 - 15.00'
      ]
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    const tipoVisita = this.route.snapshot.paramMap.get('tipoVisita');

    if (tipoVisita) {
      this.visita = this.visiteDescrizione.find(v => v.tipoVisita === tipoVisita) as VisitaDescrizione;
    }
  }

  prenota(): void {
    // navigare alla pagina di prenotazione con il tipoVisita come parametro
    this.router.navigate(['/availability-calendar', this.visita.tipoVisita]);
  }
  

}
