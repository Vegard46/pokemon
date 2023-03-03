import { Component, Input, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { Pokemon } from 'src/app/models/pokemon.model';
import { User } from 'src/app/models/user.model';
import { TrainerCollectionService } from 'src/app/services/trainer-collection.service';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {

  get collection(): Pokemon[] {
    return this.trainerCollectionService.collection;
  }

  get loading(): boolean {
    return this.trainerCollectionService.loading;
  }

  constructor(
    private readonly trainerCollectionService: TrainerCollectionService
  ) { }

  ngOnInit(): void {
    // On initialization, we populate the component with the user's
    // collection of pokemon
    this.trainerCollectionService.findAllPokemon();
  }

  /**
   * On submit of the remove-button of a specific pokemon,
   * we remove it from the user's collection
   * @param pokemon 
   */
  public removePokemonSubmit(pokemon: Pokemon): void {
    this.trainerCollectionService.removePokemon(pokemon)
      .subscribe({
        next: (user: User) => {
          // We make sure the current session storage of the user is up to date
          StorageUtil.save(StorageKeys.User, user);
          // We retrieve the pokemon again to ensure that the component updates
          this.trainerCollectionService.findAllPokemon();
        },
        error: () => {
        }
      })
  }

}
