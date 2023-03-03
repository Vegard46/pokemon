import { Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { Pokemon } from 'src/app/models/pokemon.model';
import { User } from 'src/app/models/user.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { PokemonUtil } from 'src/app/utils/pokemon.util';
import { StorageUtil } from 'src/app/utils/storage.util';

// Total pokemon currently in the PokeAPI
const totalPokemon = 1279;
// Custom amount of objects to be displayed on a single page
const pageSize = 18;

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css']
})
export class CataloguePage implements OnInit {

  // Reference to the pokemon util class to make it accessible to
  // the template during runtime
  _pokemonUtil: PokemonUtil;

  // What page we are currently on, used to calculate the offset when requesting
  // new pokemon from the PokeAPI
  _pageNumber: number;

  get catalogue(): Pokemon[] {
    return this.pokemonCatalogueService.catalogue;
  }

  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  get pokemonUtil(): PokemonUtil {
    return this.pokemonUtil;
  }

  get pageNumber(): number {
    return this._pageNumber;
  }

  set pageNumber(num: number) {
    this._pageNumber = num;
  }

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService
  ) { 
    this._pokemonUtil = new PokemonUtil();
    this._pageNumber = 1;
  }

  ngOnInit(): void {
    // On initialization, we fetch the pokemon based on the current page
    this.pokemonCatalogueService.findAllPokemon(pageSize, this._pageNumber-1);
  }

  /**
   * On submit of the add-pokemon button, we add the pokemon
   * to the user's collection and save the user to update the session storage
   * @param pokemon 
   */
  public addPokemonSubmit(pokemon: Pokemon): void {
    this.pokemonCatalogueService.addPokemon(pokemon)
      .subscribe({
        next: (user: User) => {
          StorageUtil.save(StorageKeys.User, user);
        },
        error: () => {
        }
      })
  }

  /**
   * When pressing either browse button (left or right), the pagenumber
   * is reduced or increased by 1 to move through the pages and load new
   * pokemon accordingly
   * @param direction Either 1 or -1 based on what browse button (left or right) was clicked
   * @returns Nothing
   */
  public browsePage(direction: number){
    if((this._pageNumber + direction) < 1 || (this._pageNumber + direction) > Math.ceil(totalPokemon/pageSize)){
      return;
    }
    this._pageNumber += direction;
    this.pokemonCatalogueService.findAllPokemon(pageSize, this._pageNumber-1);
  }

}
