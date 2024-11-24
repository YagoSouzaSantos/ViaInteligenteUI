import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  notifications = [
    { id: '1', status: 'Ativo', endereco: 'Rodovia BR-101, km 200, Florianópolis - SC' },
    { id: '2', status: 'Resolvido', endereco: 'Rodovia Anhanguera, km 80, Campinas - SP' },
    { id: '3', status: 'Pendente', endereco: 'Rodovia dos Bandeirantes, km 50, São Paulo - SP' },
  ];

  constructor(private router: Router) {}

  goToDetails(id: string) {
    
    this.router.navigate(['/notification', id]);
  }
}
