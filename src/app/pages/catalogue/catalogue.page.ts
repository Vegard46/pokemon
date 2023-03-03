import { Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { Pokemon } from 'src/app/models/pokemon.model';
import { User } from 'src/app/models/user.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { PokemonUtil } from 'src/app/utils/pokemon.util';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css']
})
export class CataloguePage implements OnInit {

  _pokemonUtil: PokemonUtil;

  get catalogue(): Pokemon[] {
    return this.pokemonCatalogueService.catalogue;
  }

  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  get pokemonUtil(): PokemonUtil {
    return this.pokemonUtil;
  }

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService
  ) { 
    this._pokemonUtil = new PokemonUtil();
  }

  ngOnInit(): void {
    this.pokemonCatalogueService.findAllPokemon();
  }

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

}
