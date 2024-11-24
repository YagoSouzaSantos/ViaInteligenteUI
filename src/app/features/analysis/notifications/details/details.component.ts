import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  notificationId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
  
    this.notificationId = this.route.snapshot.paramMap.get('id');
  }


}
