import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  name: Observable<string>;

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.name = this.sessionService.session$.pipe(
      map(s => {
        if (s === false) {
          return '';
        }
        if (typeof s !== 'boolean') {
          if (s.team) {
            return `${s.name} (${s.team})`;
          }
          return s.name;
        }
        return '';
      })
    );
  }
}
