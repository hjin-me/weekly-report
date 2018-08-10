import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  name: Observable<string>;

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.name = this.sessionService.nameObs;
  }
}
