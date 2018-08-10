import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  name: string;

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.name = this.sessionService.name;
  }
}
