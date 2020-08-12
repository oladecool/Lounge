import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'places', pathMatch: 'full' },
  { path: 'auth', loadChildren: './pages/auth/auth.module#AuthPageModule' },
  { path: 'places', loadChildren: './pages/places/places.module#PlacesPageModule', canLoad: [AuthGuard] },
  { path: 'bookings', loadChildren: './pages/bookings/bookings.module#BookingsPageModule', canLoad: [AuthGuard] },
  { path: 'notes', loadChildren: './pages/note/note.module#NotePageModule' },
  { path: 'notes/:id', loadChildren: './pages/detail/detail.module#DetailPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
