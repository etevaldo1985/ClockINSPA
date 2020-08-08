import { Injectable, Type } from '@angular/core';
import { User } from './../../main/models/user';
import { BaseService } from 'src/app/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable()
export class UserService extends BaseService {

user: User;


  constructor(private http: HttpClient) { super(); }

  // Type Methods

  public getUsers(): Observable<User> {
    return this.http
    .get<User>(this.UrlService + 'user')
    .pipe(catchError(this.serviceError));
  }

  public getUserById(id: number): Observable<User> {
    return this.http
    .get<User>(this.UrlService + 'user/' + id)
    .pipe(catchError(this.serviceError));
  }

    public saveUser(user: User): Observable<User> {
    const response = this.http
    .post(this.UrlService + 'user', user)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError));

    return response;
  }

  public updateUser(user: User): Observable<User> {
    return this.http
    .put(this.UrlService + 'user/' + user.id, user)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError));

  }

  public deleteUser(user: User): Observable<User> {
    return this.http
    .delete(this.UrlService + 'user/' + user.id)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError));

  }
}
