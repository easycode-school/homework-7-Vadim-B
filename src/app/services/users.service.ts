import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { User } from './../../app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

    /**
     * getUsers - делаем запрос к API на получение данных о users
     */
  getUsers(): Observable<Array<Object>> {
    return this.http.get<Array<Object>>(`${this.apiUrl}/users`);
  }

  /**
   * getUser - делаем запрос к API на получение данных об одном user
   * @param id: string
   */
  getUser(id: string): Observable<Object> {
    return this.http.get<Object>(`${this.apiUrl}/users/${id}`);
  }

  /**
   * editUser - делаем запрос к API на редактирования одного user
   * @param user : User - обновленные данные user
   */
  editUser(user: User): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this.http.put(`${this.apiUrl}/users/${user.id}`, user, httpOptions);
  }
}
