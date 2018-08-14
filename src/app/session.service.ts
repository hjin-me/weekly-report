import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
export class SessionService implements Credit {
  id: string;
  mail: string;
  team: string;
  token: string;
  name: string;
  expire: number;
  session$: BehaviorSubject<Credit | false> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    if (!this.parseJWT()) {
      this.session$.next(false);
    }
  }
  parseJWT() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return false;
    }
    let info;
    try {
      info = JSON.parse(decodeURIComponent(escape(atob( (jwt + '').split('.')[1] ))));
    } catch {
      info = null;
    }
    if (!info) {
      return false;
    }
    const expire = info.exp - Math.round(Date.now() / 1000);
    if (expire <= 0) {
      return false;
    }
    this.name = info.dsp;
    this.token = jwt;
    this.mail = info.eml;
    this.id = info.uid;
    this.team = info.tem;
    this.expire = expire;
    this.obsEmit();
    return true;
  }

  obsEmit() {
    this.session$.next({
      id: this.id,
      mail: this.mail,
      name: this.name,
      team: this.team,
      token: this.token,
      expire: this.expire
    });
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
          this.expire = auth.expire;
          localStorage.setItem('jwt', this.token);
          this.obsEmit();
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
