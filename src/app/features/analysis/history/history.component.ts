import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { historic } from './../../../core/interfaces/historic';
import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [MatButtonToggleModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  historic: historic[] = [
    { 
      title: 'Novo comentário', 
      message: 'Você recebeu um novo comentário em seu post.', 
      date: '2024-11-24 10:30', 
      viewed: false 
    },
    { 
      title: 'Atualização do sistema', 
      message: 'Uma nova versão do sistema está disponível.', 
      date: '2024-11-23 14:15', 
      viewed: true,
    },
  ]
  ngOnInit(): void {}
}
