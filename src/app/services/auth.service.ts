import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**
   * isAuth - проверяет есть ли данные в localStorage
   */
  isAuth(): boolean {
    return localStorage.getItem('login') && localStorage.getItem('password') ? true : false;
  }
}
