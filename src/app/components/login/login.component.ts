import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginData = {
    login: '',
    password: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.auth.isAuth()) {
      this.router.navigate(['/users']);
    }
  }

  /**
   * метод для авторизации пользователя
   * @param form - объект с состоянием формы
   */
  public submitLoginForm(form: NgForm) {
    if (this._checkValidation()) {
      localStorage.setItem('login', this.loginData.login);
      localStorage.setItem('password', this.loginData.password);
      // чистим форму
      form.resetForm();
      // редиректим на страницу со всеми юзерами
      this.router.navigate(['/users']);
    }
  }

  /**
   * метод для проверки валидации полей формы
   */
  private _checkValidation(): boolean {
    if (!this.loginData.login || !this.loginData.password) {
      console.log('Заполните все поля');
      return false;
    } else {
      return true;
    }
  }
}
