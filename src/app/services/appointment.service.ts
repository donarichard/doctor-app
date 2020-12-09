import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable, of, pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class AppointmentService {
  private user$ = new BehaviorSubject<null>(null);
  constructor(private http: HttpClient) { }
  bookAppointment(booking) {
    return this.http.post('/appointment', booking).pipe(catchError(err => {
      return throwError(err);
    }))
  }
  getAppointment() {
    return this.http.get('/appointment').pipe(catchError(err => {
      return throwError(err);
    }))
  }
  
}
