import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipe: Recipe[] = [
    {
      id: 'r1',
      title: 'Schnitzel',
      imageUrl: 'https://www.thespruceeats.com/thmb/LeyN-7W9T0KB2nl6pcuDZckHnjc=/4288x2848/filters:fill(auto,1)/wiener-schnitzel-recipe-1447089-Hero-5b587d6c46e0fb0071b0059d.jpg',
      ingredients: ['French fries', 'Pork Meat', 'Salad']
    },
    {
      id: 'r2',
      title: 'Spaghetti',
      imageUrl: "assets/img/spag.jpeg",
      ingredients: ['Spaghetti', 'Pork Meat', 'Salad']
    },
    {
      id: 'r3',
      title: 'Frenchfries',
      imageUrl: 'https://cms.splendidtable.org/sites/default/files/styles/w2000/public/french-fries.jpg?itok=FS-YwUYH://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-1-1200.jpg',
      ingredients: ['Potato', 'Pasta', 'Pork Meat', 'Salad']
    }
];
  constructor() { }

  getAllRecipes() {
    return [...this.recipe];
  }

  getRecipe(recipeId: string){
    return {...this.recipe.find(recipe => recipe.id === recipeId)
  };
 }
}
