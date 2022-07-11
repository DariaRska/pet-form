import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange: Subject<boolean> = new Subject();
  private user:any;

  constructor(
    private router: Router, 
    private http: HttpClient) { }

  login(authData: any) {
    
    this.user = {
      username: authData.username,
      userId: '1'
    }
    this.authChange.next(true);
    this.router.navigate(['/form']);

    return this.http.post("http://localhost:8080/login", authData);
    // return this.http.get("http://localhost:8080/login", {headers: authData});
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.user != null;
  }

  getLoggedUser() {
    if(this.user) {
      return this.user.username;
    }
  }
}
