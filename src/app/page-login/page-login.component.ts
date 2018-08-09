import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {
  inputName: string;
  inputPwd: string;
  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit() {}

  login() {
    const o = this.sessionService.login(this.inputName, this.inputPwd);
    o.pipe(take(1)).subscribe(() => {
      return this.router.navigateByUrl('/write');
    });
  }
}
