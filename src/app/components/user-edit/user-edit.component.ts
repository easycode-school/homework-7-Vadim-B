import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from './../../interfaces/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  public user: User;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private messageService: MessageService
  ) { }

    /**
     * ngOnInit
     * 1. получаем значение свойства id текущей страницы
     * 2. получаем данные одного user
     * 3. записываем данные одного user в переменную this.user
     */
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.usersService.getUser(id).subscribe((user: User) => {
      this.user = user;
    });
  }

  /**
   * navigateExmpl - редирект на страницу users
   */
  navigateExmpl() {
    this.router.navigate(['/users']);
  }

  /**
   * submitEdit
   * 1. передает измененную информацию о юзере в сервис для ее отправки запроса на сервер
   * 2. в случае успешного ответа выводится сообщение об успешном редактировании
   * 3. и происходит редирект на страницу users
   */
  public submitEdit() {
    if (this._checkValidation()) {// если нет пустых полей
      this.usersService.editUser(this.user).subscribe(
        (user) => console.log(user),
        (err) => console.log(err),
        () => {
          this.messageService.add({
            severity : 'success',
            summary : 'Service Message',
            detail : 'Информация успешно изменена'});

          this.navigateExmpl();
        }
      );
    }
  }

  private _checkValidation(): boolean {
    if (!this.user.name || !this.user.username || !this.user.phone || !this.user.email) {
      console.log('Заполните все поля');
      return false;
    } else {
      return true;
    }
  }
}
