import { Component, OnInit } from '@angular/core';
import { AuthService } from './components/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'run-app';
  constructor(private auths: AuthService) {}

  ngOnInit() {
    this.auths.isloginlogout();
  }
}
