import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/models/booking.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})

export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  private bookingSub: Subscription;

  constructor (private bookingService: BookingService, private loadCtrl: LoadingController) { }

  ngOnInit() {
     this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadCtrl.create({ message: 'Deleting...'}).then(loadingEl => {
      loadingEl.present();
      this.bookingService.cancelBooking(bookingId).subscribe( () => {
        loadingEl.dismiss();
      });
    });
    //cancel booking with offerId
  }

  ngOnDestroy(): void {
    if(this.bookingSub){
     this.bookingSub.unsubscribe();
    }
  }
}
