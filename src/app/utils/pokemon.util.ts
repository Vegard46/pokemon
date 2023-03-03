import { StorageKeys } from "../enums/storage-keys.enum";
import { Pokemon } from "../models/pokemon.model";
import { User } from "../models/user.model";
import { StorageUtil } from "./storage.util";

/*
Utility class for checking if a pokemon is already collected
*/
export class PokemonUtil {
    public isAlreadyCollected(pokemon: Pokemon): boolean {
        let user: User | undefined = StorageUtil.read(StorageKeys.User);
        let pokemons = user!.pokemon;
        // For the pokemon in question, we check if it is already present in the user's pokemon collection
        for(let pkmon of pokemons){
            if (pkmon.name === pokemon.name){
                return true;
            }
        }
        return false;
    }
}