import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Credit {
  name: string;
  token: string;
  expire: number;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  token: string;
  name: string;
  expire: number;
  nameObs = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      let info;
      try {
        info = JSON.parse(btoa((jwt + '').split('.')[1]));
      } catch {
        info = null;
      }
      if (info) {
        const expire = info.exp - Math.round(Date.now() / 1000);
        if (expire > 0) {
          this.name = info.dsp;
          this.nameObs.next(this.name);
          this.token = jwt;
          this.expire = expire;
        }
      }
    }
  }

  login(name: string, pwd: string): Observable<Credit> {
    return this.http
      .post<{ data: { authentication: Credit } }>('/x/graph', {
        query: `query Login($name: String!, $pwd: String!){
	      authentication(name:$name, pwd:$pwd) {name, token, expire}
      }`,
        variables: {
          name,
          pwd
        }
      })
      .pipe(
        map(resp => {
          const auth = resp.data.authentication;
          this.token = auth.token;
          this.name = auth.name;
          this.nameObs.next(this.name);
          this.expire = auth.expire;
          localStorage.setItem('jwt', this.token);
          return auth;
        })
      );
  }
}
