import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange: Subject<boolean> = new Subject();
  private user:any;

  constructor(private router: Router) { }

  login(authData: any) {
    this.user = {
      email: authData.email,
      userId: '1'
    }
    this.authChange.next(true);
    this.router.navigate(['/form']);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.user != null;
  }
}
