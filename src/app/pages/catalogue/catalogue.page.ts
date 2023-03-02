import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { PokemonUtil } from 'src/app/utils/pokemon.util';

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

}
