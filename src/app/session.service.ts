import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  constructor(private http: HttpClient) {}

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
          this.expire = auth.expire;
          return auth;
        })
      );
  }
}
