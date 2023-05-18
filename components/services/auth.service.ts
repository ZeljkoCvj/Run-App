import { Auth } from './../models/auth-data';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private user!: User | null;
  public authChange = new Subject<boolean>();
  isAuthitication!: boolean;
  constructor(private router: Router, private authFire: AngularFireAuth) {}

  async login(Auth: Auth) {
    try {
      const resolve = await this.authFire.signInWithEmailAndPassword(
        Auth.email,
        Auth.password
      );
      this.authSuccesufulity();

      localStorage.setItem('runnrtAccount', resolve.user?.uid as string);
    } catch (err) {}

    // this.user = {
    //   userId: Math.round(Math.random() * 1000).toString(),
    //   email: Auth.email,
    // };

    // this.authSuccesufulity();
  }

  async register(Auth: Auth) {
    try {
      const resolve = await this.authFire.createUserWithEmailAndPassword(
        Auth.email,
        Auth.password
      );
      this.authSuccesufulity();

      localStorage.setItem('runnrtAccount', resolve.user?.uid as string);
    } catch (err) {}
    // this.user = {
    //   userId: Math.round(Math.random() * 1000).toString(),
    //   email: Auth.email,
    // };
    // this.authSuccesufulity();
  }
  isloginlogout() {
    this.authFire.authState.subscribe((result) => {
      if (result) {
        this.isAuthitication = true;
        this.authChange.next(true);

        this.router.navigate(['/running']);
      } else {
        this.isAuthitication = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }
  authSuccesufulity() {
    this.isAuthitication = true;
    this.authChange.next(true);
    this.router.navigate(['/running']);
  }

  isAuth(): boolean {
    return this.isAuthitication;
    // return this.user != null;
  }

  logout() {
    this.authFire.signOut();
    localStorage.removeItem('runnrtAccount');
    // this.user = null;
    this.isAuthitication = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
  getUser() {
    return {};
    // return { ...this.user };
  }
}
