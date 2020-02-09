import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from 'src/app/services/places.service';
import { Place } from 'src/app/models/place.model';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit, OnDestroy {
  offers: Place[];
  private placeSub: Subscription;
  
  constructor(private placesService: PlacesService, private router: Router) { }

  ngOnInit() {
   this.placeSub = this.placesService.destinations.subscribe(places => {
      this.offers = places;
    });
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
    console.log('Editing item', offerId);
  }

  ngOnDestroy(): void {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }    
  }

}
