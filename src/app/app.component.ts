import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationsComponent } from './features/analysis/notifications/notifications.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NotificationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
