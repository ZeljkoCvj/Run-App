import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  hide = true;

  constructor(private authService: AuthService) {}
  onSubmitLogin(form: NgForm) {
    const { email, password } = form.value;
    this.authService.login({
      email,
      password,
    });
  }
}
