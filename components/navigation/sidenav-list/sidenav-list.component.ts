import { Auth } from './../../models/auth-data';
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sideToggle = new EventEmitter();
  isauthee!: boolean;
  authSubscribtion!: Subscription;
  constructor(private authService: AuthService) {}
  logOut() {
    this.authService.logout();
  }
  ngOnInit() {
    this.authSubscribtion = this.authService.authChange.subscribe((isauthe) => {
      this.isauthee = isauthe;
    });
  }

  ngOnDestroy() {
    this.authSubscribtion.unsubscribe();
  }
}
