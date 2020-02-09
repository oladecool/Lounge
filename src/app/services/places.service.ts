import { Injectable } from '@angular/core';
import { Place } from '../models/place.model';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap  } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Newyork',
      'In the heart of America',
      'https://www.visitberlin.de/system/files/styles/visitberlin_teaser_single_visitberlin_mobile_1x/private/image/Fernsehturm_iStock_c_bluejayphoto_DL_PPT_0.jpg?h=cbc5e7bf&itok=MfN7PE-c',
      140.99,
      new Date('2019-01-01'),
      new Date('2019-12-01'),
      'abc'
    ),
    new Place(
      'p2',
      'Berlin',
      'In the heart of Europe',
      'https://www.visitberlin.de/system/files/styles/visitberlin_teaser_single_visitberlin_mobile_1x/private/image/Fernsehturm_iStock_c_bluejayphoto_DL_PPT_0.jpg?h=cbc5e7bf&itok=MfN7PE-c',
      170.99,
      new Date('2019-01-01'),
      new Date('2019-12-01'),
      'abc'
    ),
    new Place(
      'p3',
      'The Foggy palace',
      'Not your average city in Europe',
      'https://www.visitberlin.de/system/files/styles/visitberlin_teaser_single_visitberlin_mobile_1x/private/image/Fernsehturm_iStock_c_bluejayphoto_DL_PPT_0.jpg?h=cbc5e7bf&itok=MfN7PE-c',
      190.99,
      new Date('2019-01-01'),
      new Date('2019-12-01'),
      'abc'
    )
  ]);

  get destinations() {
    return this.places.asObservable();
  }
  constructor(private authService: AuthService, private http: HttpClient) { }

  fetchPlaces() {
    return this.http.get('https://hotel-dd2fe.firebaseio.com/offered-places.json').pipe(tap(resData => {
      console.log(resData);
    }));
  }

  
  getPlace(id: string) {
    return this.places.pipe(take(1), map(places => {
      return {...places.find(p => p.id === id)};
    }));
  }
  
  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    let genId: string;
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );

    return this.http
      .post<{name: string}>('https://hotel-dd2fe.firebaseio.com/offered-places.json',{
       ...newPlace, 
       id: null
      }).pipe(
        switchMap(resData => {
          genId = resData.name;
          return this.places;
        }),
        take(1),
        tap(places => {
          newPlace.id = genId;
          this.places.next(places.concat(newPlace));
      })
    );

  //   return this.places.pipe(
  //     take(1),
  //     delay(1000),
  //     tap(places => {
  //       this.places.next(places.concat(newPlace));
  //   })
  // );
 } 

  updatePlaces(placeId: string, title: string, description: string) {
    return this.places.pipe(take(1), delay(1000),tap(places => {
      const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
      const updatedPlaces = [...places];
      const oldPlace = updatedPlaces[updatedPlaceIndex];
      updatedPlaces[updatedPlaceIndex] = new Place(
        oldPlace.id, 
        title, 
        description, 
        oldPlace.imageUrl, 
        oldPlace.price,
        oldPlace.availableFrom,
        oldPlace.availableTo,
        oldPlace.userId
        );
        this.places.next(updatedPlaces);
    })
  );
 }
}
