import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'recipe', pathMatch: 'full' },
  { 
    path: 'recipe', 

    children: [
      { 
        path: '',
        loadChildren: './pages/recipe/recipe.module#RecipePageModule',
      },
      { 
        path: ':recipeId',
        loadChildren: './pages/recipe-details/recipe-details.module#RecipeDetailsPageModule' 
      }
    ]
   },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
