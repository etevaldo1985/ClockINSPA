import { User } from './../../../main/models/user';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class HomeService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  public getUsers(): Observable<User[]>  {
    return this.http
    .get<User[]>(this.UrlService + 'user')
    .pipe(catchError(super.serviceError));
  }

}

