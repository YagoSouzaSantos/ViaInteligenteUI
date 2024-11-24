import { historic } from './../../../core/interfaces/historic';
import { Component, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [MatButtonToggleModule, FormsModule, CommonModule, MatDatepickerModule, MatInputModule, MatFormFieldModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  selectedFilter: string = 'pendentes'; // Filtro inicial
  historic: historic[] = [
    //Dados Fictícios
    {
      title: 'Acidente 1',
      message: 'Carro capotado na rodovia Exemplo',
      date: '2024-11-24 10:30',
      status: 'pendentes',
    },
    {
      title: 'Acidente 2',
      message: 'Colisão de motocicleta com carro',
      date: '2024-11-23 14:15',
      status: 'visualizadas',
    },
    {
      title: 'Acidente 3',
      message: 'Carro em cima da árvore',
      date: '2024-11-22 09:00',
      status: 'encaminhadas',
    },
    {
      title: 'Acidente 4',
      message: 'Caminhão tombado na estrada próxima ao centro',
      date: '2024-11-21 16:45',
      status: 'pendentes',
    },
    {
      title: 'Acidente 5',
      message: 'Motociclista em queda após freada brusca',
      date: '2024-11-20 08:10',
      status: 'visualizadas',
    },
    {
      title: 'Acidente 6',
      message: 'Carro colidiu contra o muro de uma residência',
      date: '2024-11-19 19:30',
      status: 'encaminhadas',
    },
    {
      title: 'Acidente 7',
      message: 'Bateu contra poste em avenida principal',
      date: '2024-11-18 23:00',
      status: 'pendentes',
    },
    {
      title: 'Acidente 8',
      message: 'Atropelamento na faixa de pedestre',
      date: '2024-11-17 07:25',
      status: 'visualizadas',
    },
    {
      title: 'Acidente 9',
      message: 'Colisão entre dois veículos na curva',
      date: '2024-11-16 13:00',
      status: 'encaminhadas',
    },
    {
      title: 'Acidente 10',
      message: 'Capotamento de carro em pista molhada',
      date: '2024-11-15 11:15',
      status: 'pendentes',
    }
  ];

  // Array onde os dados filtrados serão armazenados
  filteredHistoric: historic[] = [];

  // Método executado ao inicializar o componente
  ngOnInit(): void {
    // Chama o método de filtragem quando o componente for inicializado
    this.filterHistoric();
  }

  // Método que filtra os acidentes com base no filtro selecionado
  filterHistoric(): void {
    //Filtra os acidentes de acordo com o status (pendentes, visualizadas, encaminhadas)
    this.filteredHistoric = this.historic.filter(
      (historic) => historic.status === this.selectedFilter
    );
    // Se nenhum item for encontrado após o filtro, exibe um aviso no console
    if (this.filteredHistoric.length === 0) {
      console.warn('Nenhum item encontrado para o filtro:', this.selectedFilter);
    }
  }
}
