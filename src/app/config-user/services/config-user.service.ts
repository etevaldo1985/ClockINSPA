import { Group } from './../models/group';
import { Position } from './../models/position';
import { catchError, map } from 'rxjs/operators';
import { Type } from './../models/type';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';


@Injectable()
export class ConfigUserService extends BaseService {

type: Type;
position: Position;
group: Group;

  constructor(private http: HttpClient) { super(); }

  // Type Methods

  public getTypes(): Observable<Type> {
    return this.http
    .get<Type>(this.UrlService + 'type')
    .pipe(catchError(this.serviceError));
  }

  public getTypeById(id: number): Observable<Type> {
    return this.http
    .get<Type>(this.UrlService + 'type/' + id)
    .pipe(catchError(this.serviceError));
  }

    public saveType(type: Type): Observable<Type> {
    const response = this.http
    .post(this.UrlService + 'type', type)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError));

    return response;
  }

  public updateType(type: Type): Observable<Type> {
    return this.http
    .put(this.UrlService + 'type/' + type.id, type)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError));

  }

  public deleteType(type: Type): Observable<Type> {
    return this.http
    .delete(this.UrlService + 'type/' + type.id)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError));

  }

  // Position Methods

  public getPosition(): Observable<Position> {
    return this.http
    .get<Position>(this.UrlService + 'position')
    .pipe(catchError(this.serviceError));
  }

  public getPositionById(id: number): Observable<Position> {
    return this.http
    .get<Position>(this.UrlService + 'position/' + id)
    .pipe(catchError(this.serviceError));
  }

    public savePosition(position: Position): Observable<Position> {
    const response = this.http
    .post(this.UrlService + 'position', position)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError));

    return response;
  }

  public updatePosition(position: Position): Observable<Position> {
    return this.http
    .put(this.UrlService + 'position/' + position.id, position)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError));

  }

  public deletePosition(position: Position): Observable<Position> {
    return this.http
    .delete(this.UrlService + 'position/' + position.id)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError));

  }

  // Group Methods

  public getGroup(): Observable<Group> {
    return this.http
    .get<Group>(this.UrlService + 'group')
    .pipe(catchError(this.serviceError));
  }


  public getGroupById(id: number): Observable<Group> {
    return this.http
    .get<Group>(this.UrlService + 'group/' + id)
    .pipe(catchError(this.serviceError));
  }

    public saveGroup(group: Group): Observable<Group> {
    const response = this.http
    .post(this.UrlService + 'group', group)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError));

    return response;
  }

  public updateGroup(group: Group): Observable<Group> {
    return this.http
    .put(this.UrlService + 'group/' + group.id, group)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError));

  }

  public deleteGroup(group: Group): Observable<Group> {
    return this.http
    .delete(this.UrlService + 'group/' + group.id)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError));

  }
}
