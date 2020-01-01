import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BookingService {

    constructor(private http: HttpClient) {
    }

    getBookings() {
        return this.http.get('/api/bookings/');
    }

    createBooking(booking) {
        return this.http.post('/api/bookings/', booking);
    }

    updateBooking(booking) {
        return this.http.put('/api/bookings/' + booking.id, booking);
    }

    deleteBooking(booking) {
        return this.http.delete('/api/bookings/' + booking.id, booking);
    }
}
