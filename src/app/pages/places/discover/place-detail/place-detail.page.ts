import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Place } from 'src/app/models/place.model';
import { PlacesService } from 'src/app/services/places.service';
import { CreateBookingComponent } from 'src/app/pages/bookings/create-booking/create-booking.component';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})

export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  bookable = false;
  private placeSub: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/dicover');
        return;
      }
      this.placeSub = this.placesService
     .getPlace(paramMap.get('placeId'))
     .subscribe(place => {
        this.place = place;
        this.bookable = place.userId !== this.authService.userId
      });
    });
  }

  onBookPlace() {
      // this.router.navigateByUrl('/places/tabs/discover');
      // this.navCtrl.navigateBack('/places/tabs/discover');
      this.actionSheetCtrl.create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            icon: 'clock',
            handler: () => {
              this.openBookingModal('select');
            }
          },
          {
            text: 'Random Date',
            icon: 'stopwatch',
            handler: () => {
              this.openBookingModal('random');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            icon: 'trash'
          }
        ]
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });
  }

    openBookingModal(mode: 'select' | 'random' ) {
      console.log(mode);
      this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.place, selectedMode: mode }
      }).then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
       
        if(resultData.role === 'confirm') {
          this.loadingCtrl.create({ message: 'Booking place...' }).then(loadingEl => {
            loadingEl.present();
            const data = resultData.data.bookingData;
            this.bookingService.addBooking(
              this.place.id,
              this.place.imageUrl,
              this.place.title,
              data.firstName,
              data.lastName,
              data.guestNumber,
              data.startDate,
              data.endDate
            ).subscribe(() => {
              loadingEl.dismiss();
            });
          });
        }
      });
    }

    ngOnDestroy() {
      if (this.placeSub) {
        this.placeSub.unsubscribe();
      }
    }
}
