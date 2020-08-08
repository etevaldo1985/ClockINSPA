import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class MainService extends BaseService {

  user: User;

  constructor(private http: HttpClient) { super(); }

  getUserById(id: number): Observable<User> {
    return this.http
    .get<User>(this.UrlService + 'user/' + id)
    .pipe(catchError(this.serviceError));

  }
}
