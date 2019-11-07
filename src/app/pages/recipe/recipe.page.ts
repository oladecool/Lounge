import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
  recipe: Recipe[];
 
  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.recipe = this.recipesService.getAllRecipes();
    console.log(this.recipe);
  }

}
