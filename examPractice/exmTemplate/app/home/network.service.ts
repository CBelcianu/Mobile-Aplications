import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Entity } from './enitity';


@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  sampleUrl = 'http://192.168.1.8:2028/sample';

  constructor(
    private http: HttpClient,
    private toast: ToastController
  ) { }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.toast.create({
      message: 'Server down' + errorMessage,
      duration: 2000,
      buttons: [
        {
          text: 'Got it',
          role: 'cancel'
        }
      ]
    }).then(t => { t.present(); });
    return throwError(errorMessage);
  }

  async getEntities() {
    const response = await this.http.get(this.sampleUrl).toPromise() as [];
    const entities = [];
    response.forEach( r => {
      entities.push(r as Entity);
    });
    return entities;
  }

  public getEntity(id: number) {
    return this.http.get(this.sampleUrl + '/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError))
    .toPromise();
  }

  public postEntity(entity: Entity) {
    return this.http.post(this.sampleUrl, JSON.stringify(entity), { headers: { 'Content-Type': 'application/json' } })
    .pipe(
      retry(1),
      catchError(this.handleError))
    .toPromise();
  }

  public putEntity(id: number, entity: Entity) {
    return this.http.put(this.sampleUrl + '/' + id, JSON.stringify(entity), { headers: { 'Content-Type': 'application/json' } })
    .pipe(
      retry(1),
      catchError(this.handleError))
    .toPromise();
  }

  public deleteEntity(id: number) {
    return this.http.delete(this.sampleUrl + '/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError))
    .toPromise();
  }
}
