import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingTypeService {

  constructor(
      private http: HttpClient
  ) { }

  getBookingTypes() {
    return this.http.get('/api/bookingTypes/');
  }

  createBookingType(bookingType) {
    return this.http.post('/api/bookingTypes/', bookingType);
  }

  updateBookingType(bookingType) {
    return this.http.put('/api/bookingTypes/' + bookingType.id + '/', bookingType);
  }

  deleteBookingType(bookingType) {
    return this.http.delete('/api/bookingTypes/' + bookingType.id + '/', bookingType);
  }
}
