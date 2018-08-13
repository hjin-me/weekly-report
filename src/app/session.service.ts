import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Credit {
  id: string;
  mail: string;
  name: string;
  team: string;
  token: string;
  expire: number;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  id: string;
  mail: string;
  team: string;
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
          this.nameObs.next(`${this.name} (${this.team})`);
          this.token = jwt;
          this.mail = info.eml;
          this.id = info.uid;
          this.team = info.tem;
          this.expire = expire;
        }
      }
    }
  }

  login(name: string, pwd: string): Observable<Credit> {
    return this.http
      .post<{ data: { authentication: Credit } }>('/x/graph', {
        query: `query Login($name: String!, $pwd: String!){
	      authentication(name:$name, pwd:$pwd) {
	        id, mail, name, team, token, expire
	      }
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
          this.id = auth.id;
          this.mail = auth.mail;
          this.name = auth.name;
          this.team = auth.team || 'unknown';
          this.nameObs.next(`${this.name} (${this.team})`);
          this.expire = auth.expire;
          localStorage.setItem('jwt', this.token);
          return auth;
        })
      );
  }
  fillTeamInfo(team: string) {
    return this.http
      .post<{ data: { modifyTeam: string } }>('/x/graph', {
        query: `mutation ModifyTeam($team: String!) {
          modifyTeam(team: $team)
        }`,
        variables: {
          team
        }
      })
      .pipe(
        map(resp => {
          this.team = resp.data.modifyTeam;
          return this.team;
        })
      );
  }
}
