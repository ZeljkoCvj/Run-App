import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../components/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RunGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if ((this.auth.isAuthitication = true)) {
      return true;
    } else {
      this.router.navigate(['./running']);
      return false;
    }
  }
}
