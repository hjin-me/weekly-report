import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {
  inputName: string;
  inputPwd: string;
  constructor(private sessionService: SessionService) {}

  ngOnInit() {}

  login() {
    const o = this.sessionService.login(this.inputName, this.inputPwd);
    console.log(o);
    o.subscribe(data => console.log(data));
  }
}
