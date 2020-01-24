import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingTypeService {
  constructor(private http: HttpClient) { }

  getBookingTypes() {
    // return this.http.get('/api/bookingTypes/');

    return of([
      {
        name: 'Erlöse'
      },
      {
        name: 'Betriebseinnahmen - Förderungen'
      },
      {
        name: 'Afa - Investitionen'
      },
      {
        name: 'GWG (unter €400)'
      },
      {
        name: 'Kilometergelder à € 0,42'
      },
      {
        name: 'Kommunikationsaufwand (Internet, Telefon)'
      },
      {
        name: 'Sozialversicherung'
      },
      {
        name: 'Postgebühren, Büromaterial'
      },
      {
        name: 'Kfz-Kosten'
      },
      {
        name: 'Personalaufwand'
      }
    ]);
  }
  /*
  createBookingType(bookingType) {
    return this.http.post('/api/bookingTypes/', bookingType);
  }

  updateBookingType(bookingType) {
    return this.http.put('/api/bookingTypes/' + bookingType.id + '/', bookingType);
  }

  deleteBookingType(bookingType) {
    return this.http.delete('/api/bookingTypes/' + bookingType.id + '/', bookingType);
  }
  */
}
