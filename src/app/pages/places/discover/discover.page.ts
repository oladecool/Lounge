import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from 'src/app/services/places.service';
import { Place } from 'src/app/models/place.model';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces : Place[];
  listedLoadedPlaces: Place[];
  relevantPlaces: Place[];
  private placesSub: Subscription;

  constructor(
      private placesService: PlacesService, 
      private menuCtrl: MenuController,
      private authService: AuthService
      ) { }

  ngOnInit() {
    this.placesService.destinations.subscribe(destinations => {
      this.loadedPlaces = destinations;
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.loadedPlaces.slice(1);
    })
  }

  onOpen() {
    this.menuCtrl.toggle();
  }

  onUpdate(event: CustomEvent <SegmentChangeEventDetail>) {
    if (event.detail.value === 'all') {
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    } else {
      this.relevantPlaces = this.loadedPlaces.filter(
        place => place.userId !== this.authService.userId
      );
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

}
