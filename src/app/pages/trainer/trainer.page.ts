import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { TrainerCollectionService } from 'src/app/services/trainer-collection.service';

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
}
