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
    this.trainerCollectionService.findAllPokemon();
  }

  public removePokemonSubmit(pokemon: Pokemon): void {
    this.trainerCollectionService.removePokemon(pokemon)
      .subscribe({
        next: (user: User) => {
          StorageUtil.save(StorageKeys.User, user);
          this.trainerCollectionService.findAllPokemon();
        },
        error: () => {
        }
      })
  }

}
