import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from 'src/app/models/place.model';
import { NavController } from '@ionic/angular';
import { PlacesService } from 'src/app/services/places.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  place: Place;
  private PlaceSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offer');
        return;
      }
      this.PlaceSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
        this.place = place;
      });
    });
  }

  ngOnDestroy(): void {
    if(this.PlaceSub){
      this.PlaceSub.unsubscribe();
    }
  }
  
 }

