import { Injectable } from "@angular/core";
import { Booking } from '../models/booking.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { take, tap, delay } from 'rxjs/operators';


@Injectable({ providedIn: 'root'})

export class BookingService {
    private booked =  new BehaviorSubject<Booking[]>([]);
        
    get bookings() {
        return this.booked.asObservable();
    }

    constructor(private authService: AuthService) {}

    addBooking(
        placeId: string, 
        placeTitle: string, 
        placeImage: string, 
        firstName: string, 
        lastName: string, 
        guestNumber: number, 
        dateFrom: Date, 
        dateTo: Date
        ) {
            const newBooking = new Booking(
            Math.random().toString(), 
            placeId, 
            this.authService.userId, 
            placeTitle, 
            placeImage,
            firstName,
            lastName,
            guestNumber,
            dateFrom,
            dateTo
            );
            return this.bookings.pipe(
            take(1), 
            delay(1000),
            tap(bookings => {
                this.booked.next(bookings.concat(newBooking));
            }));
    }

    cancelBooking(bookingId: string) {
        return this.bookings.pipe(
            take(1),
            delay(1000),
            tap(bookings => {
                this.booked.next(bookings.filter(b => b.id !== bookingId));
            }));
    }
}