import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
})
export class SingupComponent implements OnInit {
  constructor(private authService: AuthService) {}
  maxDate: any;
  hide = true;
  onSubmitSignup(form: NgForm) {
    const { email, password } = form.value;
    this.authService.register({
      email,
      password,
    });
  }

  ngOnInit() {
    const today = new Date();
    this.maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDay()
    );
  }
}
